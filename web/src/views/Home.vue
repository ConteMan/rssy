<script setup>
import { ref, onMounted } from 'vue'
import FeedInput from '../components/FeedInput.vue'
import FeedResult from '../components/FeedResult.vue'
import ValidationPanel from '../components/ValidationPanel.vue'
import { useI18n } from '../i18n.js'

const { t } = useI18n()

const feedData = ref(null)
const loading = ref(false)
const error = ref(null)
const activeTab = ref('overview')
const initialUrl = ref('')

async function parseFeed(url) {
  loading.value = true
  error.value = null
  feedData.value = null
  activeTab.value = 'overview'

  const newUrl = new URL(window.location.href)
  newUrl.searchParams.set('url', url)
  window.history.pushState({}, '', newUrl)

  try {
    const res = await fetch(`/api/parse?url=${encodeURIComponent(url)}`)
    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || 'Failed to parse feed')
    }

    feedData.value = data
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const url = params.get('url')
  if (url) {
    initialUrl.value = url
    parseFeed(url)
  }
})
</script>

<template>
  <div>
    <FeedInput @submit="parseFeed" :loading="loading" :initialUrl="initialUrl" />

    <div v-if="error" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-red-700">{{ error }}</p>
    </div>

    <template v-if="feedData">
      <div class="mt-8 border-b border-sand-200">
        <nav class="flex gap-6">
          <button
            @click="activeTab = 'overview'"
            :class="[
              'pb-3 text-sm font-medium border-b-2 transition-colors',
              activeTab === 'overview'
                ? 'border-ink-900 text-ink-900'
                : 'border-transparent text-ink-500 hover:text-ink-700'
            ]"
          >
            {{ t('tabs.overview') }}
          </button>
          <button
            @click="activeTab = 'items'"
            :class="[
              'pb-3 text-sm font-medium border-b-2 transition-colors',
              activeTab === 'items'
                ? 'border-ink-900 text-ink-900'
                : 'border-transparent text-ink-500 hover:text-ink-700'
            ]"
          >
            {{ t('feed.itemsCount', { count: feedData.itemCount }) }}
          </button>
        </nav>
      </div>

      <div class="mt-6">
        <div v-show="activeTab === 'overview'">
          <FeedResult :feed="feedData" :showItems="false" />
          <ValidationPanel :validation="feedData.validation" class="mt-6" />
        </div>
        <div v-show="activeTab === 'items'">
          <FeedResult :feed="feedData" :showItems="true" :showMeta="false" />
        </div>
      </div>
    </template>
  </div>
</template>
