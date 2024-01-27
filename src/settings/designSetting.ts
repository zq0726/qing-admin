import { SizeEnum, LanguageEnum } from '@/enums/config'

const designSetting = {
  language: LanguageEnum.ZH,
  comSize: SizeEnum.DEFAULT,
  themeConfig: {
    // 灰色模式
    isGrey: false,
    // 色弱模式
    isWeak: false,
    // 面包屑导航
    showBreadcrumb: true,
    // 标签页
    showTabs: true,
    // 页脚
    showFooter: true,
    //是否展开导航栏
    isCollapse: false
  },
  themeColor: {
    asideColor: '#273352',
    headerColor: 'white'
  }
}

export default designSetting
