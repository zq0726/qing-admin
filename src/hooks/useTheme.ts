import { useDark, useToggle } from '@vueuse/core'
import { useDesignSettingStore } from '@/stores/modules/designSetting'
import { storeToRefs } from 'pinia'
import designSetting from '@/settings/designSetting'

const { themeConfig, themeColor } = storeToRefs(useDesignSettingStore())

/**
 * 切换主题
 */
export const useTheme = () => {
  const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: ''
  })
  const toggleDark = () => {
    themeConfig.value.isDark = isDark as unknown as boolean
    useToggle(isDark)
  }

  // 灰色和弱色切换
  const changeGreyOrWeak = (value: boolean, type: string) => {
    const body = document.body as HTMLElement
    if (!value) return body.setAttribute('style', '')
    if (type === 'grey') body.setAttribute('style', 'filter: grayscale(1)')
    if (type === 'weak') body.setAttribute('style', 'filter: invert(80%)')
    const propName = type == 'grey' ? 'isWeak' : 'isGrey'

    themeConfig.value[propName] = false
  }

  // 修改主题颜色
  const changePrimary = (val: string) => {
    if (!val) {
      val = '#409EFF'
      ElMessage({ type: 'success', message: '主题颜色已重置为 #409EFF' })
    }
    // globalStore.setThemeConfig({ ...themeConfig.value, primary: val })
    document.documentElement.style.setProperty('--el-color-primary', val)
  }

  const changeHeaderColor = (val: string) => {
    if (!val) {
      val = designSetting.themeColor.headerColor
    } else {
      themeColor.value.headerColor = val
    }
  }

  return { changePrimary, toggleDark, changeGreyOrWeak, changeHeaderColor, isDark }
}
