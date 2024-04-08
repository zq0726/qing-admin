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
      userInfo: {
        name: '小王',
        avatar:
          'https://img1.baidu.com/it/u=3320246382,1478944219&fm=253&fmt=auto&app=138&f=JPEG?w=505&h=500'
      },
      lockPassword: '123456',
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

    // 设置theme 的属性
    const setThemeConfig = (type: any, val: any) => {
      //@ts-ignore
      state.themeConfig[type] = val
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
      changePrimaryColor,
      setThemeConfig
    }
  },
  {
    persist: true
  }
)
