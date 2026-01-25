import { createI18n } from 'vue-i18n'
import pt from './pt.json'
import en from './en.json'

const savedLang = localStorage.getItem('lang') || 'pt'

export const i18n = createI18n({
  legacy: false,
  locale: savedLang,
  messages: { pt, en }
})
