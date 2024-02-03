import { SizeEnum, LanguageEnum } from '@/enums/config'
import { useDark } from '@vueuse/core'

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
    isCollapse: false,
    //是否黑夜模式
    isDark: useDark().value,
    //是否锁屏
    isLock: false,
    //menu 的宽度
    menuWidth: 200
  },
  themeColor: {
    primaryColor: '#409EFF',
    asideColor: '#273352',
    headerColor: '#ffffff'
  }
}

export default designSetting
