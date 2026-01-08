<script setup>
import { useI18n } from '../i18n.js'
const { t } = useI18n()
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <article class="bg-white rounded-xl border border-sand-200 p-8 shadow-sm prose prose-ink max-w-none">
      <h1 class="text-2xl font-bold text-ink-900 mb-6">{{ t('about.title') }}</h1>

      <section class="mb-8">
        <h2 class="text-xl font-semibold text-ink-800 mb-3">{{ t('about.whatIsRss') }}</h2>
        <p class="text-ink-600 leading-relaxed">{{ t('about.whatIsRssDesc') }}</p>
      </section>

      <section class="mb-8">
        <h2 class="text-xl font-semibold text-ink-800 mb-3">{{ t('about.history') }}</h2>
        <p class="text-ink-600 leading-relaxed">{{ t('about.historyDesc') }}</p>
      </section>

      <section class="mb-8">
        <h2 class="text-xl font-semibold text-ink-800 mb-3">{{ t('about.formats') }}</h2>
        <div class="space-y-4">
          <div class="p-4 bg-sand-50 rounded-lg">
            <h3 class="font-medium text-ink-800">RSS 2.0</h3>
            <p class="text-ink-600 text-sm mt-1">{{ t('about.rss2Desc') }}</p>
          </div>
          <div class="p-4 bg-sand-50 rounded-lg">
            <h3 class="font-medium text-ink-800">Atom 1.0</h3>
            <p class="text-ink-600 text-sm mt-1">{{ t('about.atomDesc') }}</p>
          </div>
          <div class="p-4 bg-sand-50 rounded-lg">
            <h3 class="font-medium text-ink-800">JSON Feed</h3>
            <p class="text-ink-600 text-sm mt-1">{{ t('about.jsonFeedDesc') }}</p>
          </div>
        </div>
      </section>

      <section class="mb-8">
        <h2 class="text-xl font-semibold text-ink-800 mb-3">{{ t('about.structure') }}</h2>
        <pre class="bg-ink-900 text-sand-100 p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;rss version="2.0"&gt;
  &lt;channel&gt;
    &lt;title&gt;Site Title&lt;/title&gt;
    &lt;link&gt;https://example.com&lt;/link&gt;
    &lt;description&gt;Site description&lt;/description&gt;
    &lt;item&gt;
      &lt;title&gt;Article Title&lt;/title&gt;
      &lt;link&gt;https://example.com/post&lt;/link&gt;
      &lt;pubDate&gt;Mon, 01 Jan 2024 00:00:00 GMT&lt;/pubDate&gt;
    &lt;/item&gt;
  &lt;/channel&gt;
&lt;/rss&gt;</code></pre>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-ink-800 mb-3">{{ t('about.benefits') }}</h2>
        <ul class="list-disc list-inside text-ink-600 space-y-2">
          <li>{{ t('about.benefit1') }}</li>
          <li>{{ t('about.benefit2') }}</li>
          <li>{{ t('about.benefit3') }}</li>
          <li>{{ t('about.benefit4') }}</li>
        </ul>
      </section>
    </article>
  </div>
</template>
