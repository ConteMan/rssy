<script setup>
import { ref } from 'vue'
import { useI18n } from '../i18n.js'

const { t, locale } = useI18n()
const props = defineProps({
  item: Object
})

const expanded = ref(false)

function formatDate(dateStr) {
  if (!dateStr) return ''
  const loc = locale.value === 'zh' ? 'zh-CN' : 'en-US'
  return new Date(dateStr).toLocaleDateString(loc, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function stripHtml(html) {
  if (!html) return ''
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}
</script>

<template>
  <article class="bg-white rounded-xl border border-sand-200 p-5 shadow-sm hover:shadow-md transition-shadow">
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1 min-w-0">
        <a
          :href="item.link"
          target="_blank"
          class="text-lg font-medium text-ink-900 hover:text-accent-600 line-clamp-2"
        >
          {{ item.title || t('item.noTitle') }}
        </a>
        <div class="flex flex-wrap items-center gap-3 mt-2 text-sm text-ink-500">
          <span v-if="item.pubDate">{{ formatDate(item.pubDate) }}</span>
          <span v-if="item.author" class="truncate max-w-[200px]">{{ item.author }}</span>
        </div>
      </div>
    </div>

    <p v-if="item.description" class="mt-3 text-ink-600 text-sm line-clamp-3">
      {{ stripHtml(item.description) }}
    </p>

    <!-- Categories -->
    <div v-if="item.categories?.length" class="mt-3 flex flex-wrap gap-2">
      <span
        v-for="cat in item.categories"
        :key="cat"
        class="px-2 py-0.5 bg-sand-100 text-ink-600 text-xs rounded"
      >
        {{ cat }}
      </span>
    </div>

    <!-- Expand/Collapse for details -->
    <button
      @click="expanded = !expanded"
      class="mt-3 text-sm text-accent-600 hover:text-accent-700"
    >
      {{ expanded ? t('item.hideDetails') : t('item.showDetails') }}
    </button>

    <div v-if="expanded" class="mt-4 pt-4 border-t border-sand-200 space-y-3 text-sm">
      <div v-if="item.guid">
        <span class="text-ink-400">{{ t('item.guid') }}:</span>
        <span class="text-ink-700 ml-2 break-all">{{ item.guid }}</span>
      </div>
      <div v-if="item.pubDateRaw">
        <span class="text-ink-400">{{ t('item.rawDate') }}:</span>
        <span class="text-ink-700 ml-2">{{ item.pubDateRaw }}</span>
      </div>
      <div v-if="item.enclosures?.length">
        <span class="text-ink-400">{{ t('item.enclosures') }}:</span>
        <div v-for="enc in item.enclosures" :key="enc.url" class="ml-4 mt-1">
          <a :href="enc.url" target="_blank" class="text-accent-600 hover:underline break-all">
            {{ enc.url }}
          </a>
          <span class="text-ink-400 ml-2">({{ enc.type }})</span>
        </div>
      </div>
      <div v-if="item.content">
        <span class="text-ink-400">{{ t('item.fullContent') }}:</span>
        <div class="mt-2 p-3 bg-sand-50 rounded text-ink-700 prose prose-sm max-w-none" v-html="item.content" />
      </div>
    </div>
  </article>
</template>
