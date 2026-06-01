import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useDark } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { defaultSettings, type UiSize } from '../settings'

export const useConfigStore = defineStore(
  'config',
  () => {
    const { locale: i18nLocale } = useI18n()
    const isDark = useDark()

    const size = ref<UiSize>(defaultSettings.size)
    const themeColor = ref<string>(defaultSettings.themeColor)
    const themeValue = ref<'auto' | 'light' | 'dark'>(defaultSettings.themeValue)
    const locale = ref<'zh-CN' | 'en-US'>(defaultSettings.locale)

    watch(
      locale,
      (val) => {
        i18nLocale.value = val
      },
      { immediate: true },
    )

    watch(
      themeValue,
      (val) => {
        if (val === 'auto') {
          isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
        } else if (val === 'light') {
          isDark.value = false
        } else if (val === 'dark') {
          isDark.value = true
        }
      },
      { immediate: true },
    )

    watch(
      themeColor,
      (val) => {
        document.documentElement.style.setProperty('--el-color-primary', val)
      },
      { immediate: true },
    )

    const resetConfig = () => {
      size.value = defaultSettings.size
      themeColor.value = defaultSettings.themeColor
      themeValue.value = defaultSettings.themeValue
      locale.value = defaultSettings.locale
    }

    return {
      size,
      themeColor,
      themeValue,
      locale,
      resetConfig,
    }
  },
  {
    persist: true,
  },
)
