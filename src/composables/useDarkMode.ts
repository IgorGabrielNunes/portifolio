// src/composables/useDarkMode.ts
import { ref, onMounted, watch } from 'vue'

const isDark = ref(false)

export function useDarkMode() {
  const applyTheme = () => {
    const html = document.documentElement
    html.classList.toggle('dark', isDark.value)
  }

  onMounted(() => {
    // sync inicial (localStorage ou estado atual do HTML)
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
// }
// import { ref } from 'vue'

// const isDark = ref(document.documentElement.classList.contains('dark'))

// export function useDarkMode() {
//   const toggleDark = () => {
//     isDark.value = !isDark.value

//     document.documentElement.classList.toggle('dark', isDark.value)
//     localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
//   }

//   return { isDark, toggleDark }
// }
