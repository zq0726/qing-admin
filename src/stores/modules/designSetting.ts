import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import designSetting from '@/settings/designSetting'
import type { DesignSettingStoreType } from '../types'
import { LanguageEnum, SizeEnum } from '@/enums/config'

const { language, comSize, themeConfig, themeColor } = designSetting

export const useDesignSettingStore = defineStore(
  'designSetting',
  () => {
    const state = reactive<DesignSettingStoreType>({
      language,
      comSize,
      themeConfig,
      themeColor
    })

    //切换语言
    const setLanguage = (type: LanguageEnum) => {
      console.log('type', type)
      state.language = type
    }

    //改变组件大小
    const setSize = (type: SizeEnum) => {
      state.comSize = type
    }

    // 改变Collapse
    const changeCollapse = () => {
      state.themeConfig.isCollapse = !state.themeConfig.isCollapse
    }

    // 改变面包屑显示情况
    const changeShowBreadcrumb = () => {
      state.themeConfig.showBreadcrumb = !state.themeConfig.showBreadcrumb
    }
    // 改变footer 的显示情况
    const changeShowFooter = () => {
      state.themeConfig.showFooter = !state.themeConfig.showFooter
    }

    //改变主题颜色
    const changePrimaryColor = (value: string) => {
      state.themeColor.primaryColor = value
    }

    return {
      ...toRefs(state),
      setLanguage,
      setSize,
      changeCollapse,
      changeShowBreadcrumb,
      changeShowFooter,
      changePrimaryColor
    }
  },
  {
    persist: true
  }
)
