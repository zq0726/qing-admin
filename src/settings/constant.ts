import { LanguageEnum } from '@/enums/config'

/**
 * 语言类型
 */
export const languageConfig: Universal<LanguageEnum>[] = [
  {
    type: '中文',
    value: LanguageEnum.ZH
  },
  {
    type: 'English',
    value: LanguageEnum.EN
  }
]

/**
 * 组件大小
 */
export const comSizeConfig: Universal[] = [
  {
    type: '大',
    value: 'large'
  },
  {
    type: '默认',
    value: 'default'
  },
  {
    type: '小',
    value: 'small'
  }
]

//主题配置
export const uiConfig = {
  menuCollapseWidth: '60px',
  headerHeight: '45px',
  footerHeight: '40px',
  title: 'Qing Admin',
  collapseTitle: 'Qing'
}

export const homePath = '/'

// 主题颜色列表
export const themeColorList = [
  '#409EFF',
  '#DAA96E',
  '#0C819F',
  '#009688',
  '#27ae60',
  '#ff5c93',
  '#e74c3c',
  '#fd726d',
  '#f39c12',
  '#9b59b6'
]

// 顶栏颜色列表
export const headerColorList = [
  '#ffffff',
  '#0C819F',
  '#009688',
  '#27ae60',
  '#ff5c93',
  '#e74c3c',
  '#fd726d',
  '#f39c12',
  '#9b59b6'
]
