import type { SizeEnum, LanguageEnum } from '@/enums/config'

export interface MenuType {
  title: string
  icon?: string
  path: string
  children?: MenuType[]
}

export interface DesignSettingStoreType {
  language: LanguageEnum
  comSize: SizeEnum
  lockPassword: string
  userInfo: any
  themeConfig: {
    isGrey: boolean
    isWeak: boolean
    isLock: boolean
    isCollapse: boolean
    isDark: boolean
    showBreadcrumb: boolean
    showTabs: boolean
    showFooter: boolean
    menuWidth: number
  }
  themeColor: {
    primaryColor: string
    asideColor: string
    headerColor: string
  }
}

export interface MenuStoreType {
  menuList: MenuType[]
  breadcrumbList: any
  defalutActive: string
  defaultOpeneds: string[]
}

export interface TabStoreType {
  activeTab: string
  tabsMenuList: MenuType[]
}
