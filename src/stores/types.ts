import type { SizeEnum, LanguageEnum } from '@/enums/config'
import type Color from 'element-plus/lib/components/color-picker/src/utils/color.js'

export interface DesignSettingStoreType {
  language: LanguageEnum
  comSize: SizeEnum
  themeConfig: {
    isGrey: boolean
    isWeak: boolean
    showBreadcrumb: boolean
    showTabs: boolean
    showFooter: boolean
    isCollapse: boolean
  }
  themeColor: {
    asideColor: string
    headerColor: string
  }
}
