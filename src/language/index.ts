import { createI18n } from 'vue-i18n'
import zh from './modules/zh'
import en from './modules/en'
import type { App } from 'vue'

const i18n = createI18n({
  locale: 'zh',
  legacy: false,
  messages: {
    zh,
    en
  }
})

export const setupLanguage = (app: App) => {
  app.use(i18n)
}
