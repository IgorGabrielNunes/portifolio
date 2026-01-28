import { ref, onMounted, watch } from 'vue'

const isDark = ref(false)

export function useDarkMode() {
  const applyTheme = () => {
    const html = document.documentElement
    html.classList.toggle('dark', isDark.value)
  }

  onMounted(() => {
    const saved = localStorage.getItem('theme')
    isDark.value =
      saved === 'dark' ||
      (!saved && document.documentElement.classList.contains('dark'))

    applyTheme()
  })

  watch(isDark, () => {
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    applyTheme()
  })

  const toggleDark = () => {
    isDark.value = !isDark.value
  }

  return { isDark, toggleDark }
}