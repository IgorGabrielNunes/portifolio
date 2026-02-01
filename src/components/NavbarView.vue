<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDarkMode } from '../composables/useDarkMode'

const { t, locale, availableLocales } = useI18n()
const { isDark, toggleDark } = useDarkMode()

const isScrolled = ref(false)
const isOpen = ref(false)
const isLangOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const navs = computed(() => [
  { href: '#home', label: t('nav.home') },
  { href: '#skills', label: t('nav.skills') },
  { href: '#experience', label: t('nav.experience') },
  { href: '#projects', label: t('nav.projects') },
  { href: '#contact', label: t('nav.contact') },
])

const headerClass = computed(() =>
  isScrolled.value
    ? 'bg-zinc-950/80 backdrop-blur border-b border-zinc-800'
    : 'bg-transparent'
)

const brandDotClass = computed(() =>
  isScrolled.value || isDark.value ? 'text-white' : 'text-black'
)

const navLinkClass = computed(() =>
  isScrolled.value || isDark.value ? 'text-white' : 'text-black'
)

const languageMap: Record<string, { label: string; flag: string }> = {
  pt: { label: 'PT', flag: '🇧🇷' },
  en: { label: 'EN', flag: '🇺🇸' },
  es: { label: 'ES', flag: '🇪🇸' },
}

const languages = computed(() =>
  availableLocales.map(code => ({
    code,
    ...languageMap[code],
  }))
)

const currentLang = computed(
  () => languages.value.find(l => l.code === locale.value)!
)

const changeLang = (code: string) => {
  locale.value = code
  localStorage.setItem('lang', code)
  isLangOpen.value = false
}

const hasManyLanguages = computed(() => languages.value.length > 3)

const langButtonClass = computed(() =>
  isDark.value
    ? 'text-zinc-300 hover:text-white'
    : 'text-zinc-700 hover:text-black'
)

const langDropdownClass = computed(() =>
  isDark.value
    ? 'bg-zinc-900/95 border-zinc-800'
    : 'bg-white/95 border-zinc-200'
)

const langItemClass = computed(() =>
  isDark.value
    ? 'text-zinc-200 hover:bg-zinc-800'
    : 'text-zinc-800 hover:bg-zinc-100'
)

const themeIcon = computed(() => (isDark.value ? '☀️' : '🌙'))
const menuIcon = computed(() => (isOpen.value ? '✕' : '☰'))

const mobileMenuClass = computed(() =>
  isDark.value
    ? 'bg-zinc-950 border-zinc-800'
    : 'bg-white border-zinc-200'
)

const mobileLinkClass = computed(() =>
  isDark.value ? 'text-zinc-200' : 'text-zinc-800'
)

const mobileDividerClass = computed(() =>
  isDark.value ? 'border-zinc-800' : 'border-zinc-200'
)

const mobileLabelClass = computed(() =>
  isDark.value ? 'text-zinc-500' : 'text-zinc-600'
)

const getLangButtonClass = (code: string) => {
  if (code === locale.value) {
    return 'bg-green-500 text-black'
  }

  return isDark.value
    ? 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
    : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
}

const mobileSelectClass = computed(() =>
  isDark.value
    ? 'bg-zinc-900 text-zinc-200'
    : 'bg-zinc-100 text-zinc-800'
)

const mobileDropdownClass = computed(() =>
  isDark.value
    ? 'bg-zinc-950 border-zinc-800'
    : 'bg-white border-zinc-200'
)
</script>
<template>
  <header
    class="fixed top-0 w-full z-50 transition-all duration-300"
    :class="headerClass"
  >
    <nav class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <a href="#home" class="text-xl font-bold tracking-wide text-green-400">
        Igor<span :class="brandDotClass">.dev</span>
      </a>

      <ul class="hidden md:flex items-center gap-8 text-sm">
        <li v-for="nav in navs" :key="nav.href">
          <a :href="nav.href" class="nav-link" :class="navLinkClass">
            {{ nav.label }}
          </a>
        </li>
      </ul>

      <div class="flex items-center gap-5 relative">
        <a
          href="#contact"
          class="hidden md:inline-flex px-5 py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition"
        >
          {{ t('nav.cta') }}
        </a>

        <div class="relative hidden md:block">
          <button
            @click="isLangOpen = !isLangOpen"
            class="flex items-center gap-2 text-sm transition"
            :class="langButtonClass"
          >
            <span>{{ currentLang.flag }}</span>
            <span class="uppercase tracking-wide">{{ currentLang.label }}</span>
          </button>

          <div
            v-if="isLangOpen"
            class="absolute right-0 mt-3 w-32 rounded-xl shadow-xl overflow-hidden border backdrop-blur-sm"
            :class="langDropdownClass"
          >
            <button
              v-for="lang in languages"
              :key="lang.code"
              @click="changeLang(lang.code)"
              class="w-full px-4 py-2 text-left text-sm transition"
              :class="langItemClass"
            >
              {{ lang.flag }} {{ lang.label }}
            </button>
          </div>
        </div>

        <button
          @click="toggleDark"
          class="text-xl transition opacity-80 hover:opacity-100"
        >
          {{ themeIcon }}
        </button>

        <button
          class="md:hidden text-2xl"
          :class="mobileLinkClass"
          @click="isOpen = !isOpen"
        >
          {{ menuIcon }}
        </button>
      </div>
    </nav>

    <div v-if="isOpen" class="md:hidden border-t" :class="mobileMenuClass">
      <ul class="flex flex-col px-6 py-6 gap-6 text-sm">
        <li v-for="nav in navs" :key="nav.href">
          <a
            :href="nav.href"
            class="nav-link transition-colors"
            :class="mobileLinkClass"
            @click="isOpen = false"
          >
            {{ nav.label }}
          </a>
        </li>

        <div class="pt-6 border-t" :class="mobileDividerClass">
          <p class="text-xs uppercase tracking-wider mb-3" :class="mobileLabelClass">
            Language
          </p>

          <div v-if="!hasManyLanguages" class="flex flex-wrap gap-3">
            <button
              v-for="lang in languages"
              :key="lang.code"
              @click="changeLang(lang.code)"
              class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition"
              :class="getLangButtonClass(lang.code)"
            >
              {{ lang.flag }} {{ lang.label }}
            </button>
          </div>

          <div v-else class="relative">
            <button
              @click="isLangOpen = !isLangOpen"
              class="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition"
              :class="mobileSelectClass"
            >
              <span class="flex items-center gap-2">
                {{ currentLang.flag }} {{ currentLang.label }}
              </span>
              <span class="opacity-60">▾</span>
            </button>

            <div
              v-if="isLangOpen"
              class="absolute z-50 mt-2 w-full rounded-lg overflow-hidden shadow-xl border"
              :class="mobileDropdownClass"
            >
              <button
                v-for="lang in languages"
                :key="lang.code"
                @click="changeLang(lang.code)"
                class="w-full px-4 py-3 flex items-center gap-2 text-sm transition"
                :class="langItemClass"
              >
                {{ lang.flag }} {{ lang.label }}
              </button>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </header>
</template>
<style scoped>
.nav-link {
  position: relative;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #4ade80;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 0;
  height: 2px;
  background: #4ade80;
  transition: width 0.3s;
}

.nav-link:hover::after {
  width: 100%;
}
</style>