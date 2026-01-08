<script setup>
import { ref } from 'vue'
import { useI18n } from './i18n.js'
import LanguageSelector from './components/LanguageSelector.vue'

const { t } = useI18n()
const mobileMenuOpen = ref(false)
</script>

<template>
  <div class="min-h-screen bg-sand-50">
    <header class="border-b border-sand-200 bg-white">
      <div class="max-w-5xl mx-auto px-4 py-4">
        <!-- Top row: Logo + Language -->
        <div class="flex items-center justify-between">
          <router-link to="/" class="block">
            <h1 class="text-2xl font-semibold text-ink-900 tracking-tight">{{ t('app.title') }}</h1>
            <p class="text-ink-500 text-sm mt-0.5">{{ t('app.subtitle') }}</p>
          </router-link>
          <div class="flex items-center gap-3">
            <LanguageSelector />
            <!-- Mobile menu button -->
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="sm:hidden p-2 text-ink-600 hover:text-ink-900"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        <!-- Desktop nav -->
        <nav class="hidden sm:flex items-center gap-6 mt-4 pt-4 border-t border-sand-100">
          <router-link
            to="/"
            class="text-sm text-ink-600 hover:text-ink-900 transition-colors"
            exact-active-class="text-accent-600 font-medium"
          >
            {{ t('nav.home') }}
          </router-link>
          <router-link
            to="/about"
            class="text-sm text-ink-600 hover:text-ink-900 transition-colors"
            active-class="text-accent-600 font-medium"
          >
            {{ t('nav.about') }}
          </router-link>
        </nav>
      </div>
      <!-- Mobile nav -->
      <nav v-show="mobileMenuOpen" class="sm:hidden border-t border-sand-100 px-4 py-3 space-y-2">
        <router-link
          to="/"
          @click="mobileMenuOpen = false"
          class="block py-2 text-ink-600 hover:text-ink-900"
          exact-active-class="text-accent-600 font-medium"
        >
          {{ t('nav.home') }}
        </router-link>
        <router-link
          to="/about"
          @click="mobileMenuOpen = false"
          class="block py-2 text-ink-600 hover:text-ink-900"
          active-class="text-accent-600 font-medium"
        >
          {{ t('nav.about') }}
        </router-link>
      </nav>
    </header>

    <main class="max-w-5xl mx-auto px-4 py-8">
      <router-view />
    </main>

    <footer class="border-t border-sand-200 mt-16">
      <div class="max-w-5xl mx-auto px-4 py-6 text-center text-ink-400 text-sm">
        {{ t('app.footer') }}
      </div>
    </footer>
  </div>
</template>
