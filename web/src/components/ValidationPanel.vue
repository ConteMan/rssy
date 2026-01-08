<script setup>
import { useI18n } from '../i18n.js'

const { t } = useI18n()
defineProps({
  validation: Object
})

function getSeverityColor(severity) {
  switch (severity) {
    case 'error': return 'text-red-600 bg-red-50'
    case 'warning': return 'text-amber-600 bg-amber-50'
    case 'info': return 'text-sky-600 bg-sky-50'
    default: return 'text-ink-600 bg-ink-50'
  }
}

function getScoreColor(score, max) {
  const pct = (score / max) * 100
  if (pct >= 80) return 'text-emerald-600'
  if (pct >= 60) return 'text-amber-600'
  return 'text-red-600'
}
</script>

<template>
  <div class="bg-white rounded-xl border border-sand-200 p-6 shadow-sm">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-semibold text-ink-900">{{ t('validation.title') }}</h2>
      <div class="flex items-center gap-3">
        <span
          :class="[
            'px-3 py-1 rounded-full text-sm font-medium',
            validation.isValid ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
          ]"
        >
          {{ validation.isValid ? t('validation.valid') : t('validation.invalid') }}
        </span>
        <span :class="['font-semibold', getScoreColor(validation.score, validation.maxScore)]">
          {{ validation.score }}/{{ validation.maxScore }}
        </span>
      </div>
    </div>

    <div class="space-y-2">
      <div
        v-for="check in validation.checks"
        :key="check.name"
        class="flex items-center gap-3 py-2 px-3 rounded-lg"
        :class="check.passed ? 'bg-sand-50' : getSeverityColor(check.severity)"
      >
        <span class="text-lg">{{ check.passed ? '✓' : '✗' }}</span>
        <span class="font-medium text-ink-800 min-w-[140px]">{{ t('checks.' + check.name) }}</span>
        <span class="text-ink-600 text-sm">{{ check.message }}</span>
      </div>
    </div>
  </div>
</template>
