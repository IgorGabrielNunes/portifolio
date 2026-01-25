<!-- src/components/Navbar.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted, watchEffect, reactive } from 'vue'
import { useDarkMode } from '../composables/useDarkMode'
import { useI18n } from 'vue-i18n'
import { hoverModeDark, hoverModeLight } from '../helpers/constants'

const { isDark, toggleDark } = useDarkMode()
const { t, locale } = useI18n()
const isScrolled = ref(false)
const isOpen = ref(false)
const isSettingsOpen = ref(false)
const classStringDev = ref('')
const colorBtnFunctions = ref('')
const colorTextFunctions = ref('')
const classFunctions = ref('')
const classBtnFunctions = ref('')
const classBtnFunctions2 = ref('')
const classBtnFunctionsMobile = ref('')
const colorTextNav = ref('')
const buttonsLangs = reactive([
  {
    lang: 'pt',
    label: '🇧🇷 Português',
    class: `w-full text-left px-3 py-2 rounded-lg ${isDark.value ? hoverModeDark : hoverModeLight} text-sm`,
  },
   {
    lang: 'en',
    label: '🇺🇸 English',
    class: `w-full text-left px-3 py-2 rounded-lg ${isDark.value ? hoverModeDark : hoverModeLight} text-sm`,
  }
])

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

function getTextColorNav() {
  if (isDark.value) {
    return 'text-white'
  }
  if (isScrolled.value) {
    return 'text-white'
  }
  return 'text-black'
}

const navs = reactive([
  {
    href: '#home',
    label: t('nav.home'),
    class: `nav-link ${colorTextNav.value}`,
  },
  {
    href: '#skills',
    label: t('nav.skills'),
    class: `nav-link`,
  },
    {
    href: '#experience',
    label: t('nav.experience'),
    class: `nav-link`,
  },
    {
    href: '#projects',
    label: t('nav.projects'),
    class: `nav-link`,
  },
    {
    href: '#skills',
    label: t('nav.skills'),
    class: `nav-link`,
  },
])

const changeLang = (lang: 'pt' | 'en') => {
  locale.value = lang
  localStorage.setItem('lang', lang)
  isSettingsOpen.value = false
}

watchEffect(() => {
  if (isScrolled.value) {
  classStringDev.value = 'text-white'
  }

  if (!isScrolled.value && isDark.value) {
  classStringDev.value = 'text-white'
  }

  if (!isScrolled.value && !isDark.value) {
  classStringDev.value = !isDark ? 'text-white' : 'text-black '
  }

  colorTextNav.value = getTextColorNav()

  if (isDark.value) {
  colorBtnFunctions.value = 'white'
  colorTextFunctions.value = 'white'
  classFunctions.value = 'bg-zinc-900 absolute right-0 mt-3 w-56  border border-zinc-800 rounded-xl shadow-xl p-4 space-y-4'
  classBtnFunctions.value = `p-2 rounded-full ${hoverModeDark} transition text-zinc-200`
  classBtnFunctions2.value = `w-full flex justify-between items-center px-3 py-2 rounded-lg ${hoverModeDark} text-sm`
  classBtnFunctionsMobile.value = `md:hidden bg-zinc-950 border-t border-zinc-800`
}

  if (!isDark.value) {
  colorBtnFunctions.value = 'black'
  colorTextFunctions.value = 'black'
  classFunctions.value = 'bg-zinc-200  zinc-500 absolute right-0 mt-3 w-56  border border-zinc-800 rounded-xl shadow-xl p-4 space-y-4'
  classBtnFunctions.value = `p-2 rounded-full ${hoverModeLight} transition text-zinc-200`
  classBtnFunctions2.value = `w-full flex justify-between items-center px-3 py-2 rounded-lg ${hoverModeLight} text-sm`
   classBtnFunctionsMobile.value = `md:hidden bg-zinc-450 border-t border-zinc-400`
}
})

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

</script>

<template>
  <header
    class="fixed top-0 w-full z-50 transition-all duration-300"
    :class="isScrolled
      ? 'bg-zinc-950/80 backdrop-blur border-b border-zinc-800'
      : 'bg-transparent'"
  >
    <nav class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- LOGO -->
      <a href="#home" class="text-xl font-bold text-green-400 tracking-wide">
        Igor<span :class="classStringDev">.dev</span>
      </a>

      <!-- DESKTOP MENU -->
      <ul class="hidden md:flex items-center gap-8 text-sm">
        <li v-for="nav in navs" :key="nav.href"><a :href="nav.href" :class="nav.class">{{ nav.label }}</a></li>
      </ul>

      <!-- RIGHT SIDE -->
      <div class="flex items-center gap-4">
        <!-- CTA -->
        <a
          href="#contact"
          class="hidden md:inline-block px-5 py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition"
        >
          {{ t('nav.cta') }}
        </a>

        <!-- SETTINGS -->
        <div class="relative">
          <button
            :class=" classBtnFunctions"
            @click="isSettingsOpen = !isSettingsOpen"
          >
            ⋮
          </button>

          <!-- DROPDOWN -->
          <div
            v-if="isSettingsOpen"
            :class="classFunctions"
          >
            <div class="space-y-2">
              <p class="text-xs uppercase text-zinc-500">
                {{ t('nav.theme') }}
              </p>
              <button
                :class="classBtnFunctions2"
                @click="toggleDark"
              >
                <span :class="colorTextFunctions">{{ isDark ? t('nav.dark') : t('nav.light') }}</span>
                <span>{{ isDark ? '🌙' : '☀️' }}</span>
              </button>
            </div>

            <p class="text-xs uppercase text-zinc-500">
                {{ t('nav.language') }}
              </p>
            <div v-for="lang in buttonsLangs" :key="lang.lang" class="space-y-2">
              <button
                :class="lang.class"
                @click="changeLang(lang.lang)"
              >
                {{ lang.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- MOBILE MENU BUTTON -->
        <button
          class="md:hidden text-zinc-200"
          @click="isOpen = !isOpen"
        >
          <span v-if="!isOpen">☰</span>
          <span v-else>✕</span>
        </button>
      </div>
    </nav>

    <!-- MOBILE MENU -->
    <div v-if="isOpen" :class="classBtnFunctionsMobile">
        <ul class="flex flex-col px-6 py-6 gap-6 text-sm">
        <li v-for="nav in navs" :key="nav.href"><a :href="nav.href" :class="nav.class" @click="isOpen = false">{{ nav.label }}</a></li>
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
