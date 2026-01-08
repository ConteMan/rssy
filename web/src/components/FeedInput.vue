<script setup>
import { ref, watch } from 'vue'
import { useI18n } from '../i18n.js'

const { t } = useI18n()
const emit = defineEmits(['submit'])
const props = defineProps({
  loading: Boolean,
  initialUrl: String
})

const url = ref('')

watch(() => props.initialUrl, (newVal) => {
  if (newVal) url.value = newVal
}, { immediate: true })

function handleSubmit() {
  if (url.value.trim()) {
    emit('submit', url.value.trim())
  }
}
</script>

<template>
  <div class="bg-white rounded-xl border border-sand-200 p-6 shadow-sm">
    <form @submit.prevent="handleSubmit" class="flex gap-3">
      <input
        v-model="url"
        type="url"
        :placeholder="t('input.placeholder')"
        class="flex-1 px-4 py-3 border border-sand-300 rounded-lg
               focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent
               text-ink-800 placeholder-ink-400"
        :disabled="loading"
      />
      <button
        type="submit"
        :disabled="loading || !url.trim()"
        class="px-6 py-3 bg-ink-900 text-white rounded-lg font-medium
               hover:bg-ink-800 disabled:opacity-50 disabled:cursor-not-allowed
               transition-colors"
      >
        <span v-if="loading">{{ t('input.parsing') }}</span>
        <span v-else>{{ t('input.parse') }}</span>
      </button>
    </form>
  </div>
</template>
