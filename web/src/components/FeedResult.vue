<script setup>
import FeedItem from './FeedItem.vue'
import { useI18n } from '../i18n.js'

const { t, locale } = useI18n()
defineProps({
  feed: Object,
  showItems: { type: Boolean, default: true },
  showMeta: { type: Boolean, default: true }
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  const loc = locale.value === 'zh' ? 'zh-CN' : 'en-US'
  return new Date(dateStr).toLocaleDateString(loc, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Feed Info -->
    <div v-if="showMeta" class="bg-white rounded-xl border border-sand-200 p-6 shadow-sm">
      <div class="flex items-start gap-4">
        <img
          v-if="feed.image?.url"
          :src="feed.image.url"
          :alt="feed.image.title || feed.title"
          class="w-16 h-16 rounded-lg object-cover bg-sand-100"
        />
        <div class="flex-1 min-w-0">
          <h2 class="text-xl font-semibold text-ink-900">{{ feed.title }}</h2>
          <p v-if="feed.description" class="text-ink-600 mt-1 line-clamp-2">
            {{ feed.description }}
          </p>
          <div class="flex flex-wrap gap-4 mt-3 text-sm text-ink-500">
            <a
              v-if="feed.link"
              :href="feed.link"
              target="_blank"
              class="hover:text-accent-600"
            >
              {{ feed.link }}
            </a>
          </div>
        </div>
      </div>

      <!-- Meta Info -->
      <div class="mt-6 pt-4 border-t border-sand-200 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <span class="text-xs text-ink-400 uppercase tracking-wide">{{ t('feed.type') }}</span>
          <p class="text-ink-700 font-medium">{{ feed.feedType }} {{ feed.feedVersion }}</p>
        </div>
        <div v-if="feed.language">
          <span class="text-xs text-ink-400 uppercase tracking-wide">{{ t('feed.language') }}</span>
          <p class="text-ink-700 font-medium">{{ feed.language }}</p>
        </div>
        <div v-if="feed.generator">
          <span class="text-xs text-ink-400 uppercase tracking-wide">{{ t('feed.generator') }}</span>
          <p class="text-ink-700 font-medium truncate">{{ feed.generator }}</p>
        </div>
        <div>
          <span class="text-xs text-ink-400 uppercase tracking-wide">{{ t('feed.items') }}</span>
          <p class="text-ink-700 font-medium">{{ feed.itemCount }}</p>
        </div>
      </div>
    </div>

    <!-- Items -->
    <div v-if="showItems" class="space-y-4">
      <FeedItem v-for="(item, idx) in feed.items" :key="idx" :item="item" />
    </div>
  </div>
</template>
