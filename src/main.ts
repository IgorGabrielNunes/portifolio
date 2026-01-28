
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { router } from './router'
import { i18n } from './i18n/Index'
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  once: true,
  offset: 80,
  duration: 700,
  easing: 'ease-out-cubic',
})

const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark')
}

createApp(App).use(router).use(i18n).mount('#app')
