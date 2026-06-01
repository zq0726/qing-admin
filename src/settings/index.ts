export type UiSize = 'large' | 'default' | 'small'
export type ThemeValue = 'auto' | 'light' | 'dark'
export type Locale = 'zh-CN' | 'en-US'

export interface Settings {
  size: UiSize
  themeColor: string
  themeValue: ThemeValue
  locale: Locale
}

export const defaultSettings: Settings = {
  size: 'default',
  themeColor: '#000000',
  themeValue: 'auto',
  locale: 'zh-CN',
}
