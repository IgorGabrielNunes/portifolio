import { ref, onMounted, watch } from 'vue'

const isDark = ref(
  document.documentElement.classList.contains('dark')
)

export function useDarkMode() {
  const applyTheme = () => {
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  onMounted(() => {
    const saved = localStorage.getItem('theme')

    if (saved === 'dark') isDark.value = true
    else if (saved === 'light') isDark.value = false

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
