<script setup>
import { ref } from 'vue'
import { useI18n } from '../i18n.js'

const { locale, setLocale } = useI18n()
const isOpen = ref(false)

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' }
]

function selectLanguage(code) {
  setLocale(code)
  isOpen.value = false
}

function handleClickOutside(e) {
  if (!e.target.closest('.lang-selector')) {
    isOpen.value = false
  }
}
</script>

<template>
  <div class="lang-selector relative" v-click-outside="() => isOpen = false">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center gap-2 px-3 py-1.5 text-sm border border-sand-300 rounded-lg
             hover:bg-sand-100 text-ink-600 transition-colors"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
      </svg>
      <span>{{ languages.find(l => l.code === locale)?.name }}</span>
      <svg class="w-3 h-3 transition-transform" :class="{ 'rotate-180': isOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>

    <div
      v-show="isOpen"
      class="absolute right-0 mt-2 w-36 bg-white border border-sand-200 rounded-lg shadow-lg py-1 z-50"
    >
      <button
        v-for="lang in languages"
        :key="lang.code"
        @click="selectLanguage(lang.code)"
        :class="[
          'w-full px-4 py-2 text-left text-sm hover:bg-sand-50',
          locale === lang.code ? 'text-accent-600 font-medium' : 'text-ink-700'
        ]"
      >
        {{ lang.name }}
      </button>
    </div>
  </div>
</template>
