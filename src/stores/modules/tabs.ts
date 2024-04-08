import { defineStore } from 'pinia'
import { computed, reactive, toRefs } from 'vue'
import type { MenuType, TabStoreType } from '../types'
import router from '@/router'

export const useTabStore = defineStore(
  'tab',
  () => {
    const state = reactive<TabStoreType>({
      activeTab: '/',
      tabsMenuList: [{ title: '首页', path: '/', icon: 'home-filled' }]
    })

    /**
     * 是否可以关闭左侧tab
     * @returns
     */
    const canCloseLeft = computed<boolean>(() => {
      const activeIndex = activeTabIndex()
      if (activeIndex > 1) return true
      return false
    })
    /**
     * 是否可以关闭右侧tab
     * @returns
     */
    const canCloseRight = computed<boolean>(() => {
      const activeIndex = activeTabIndex()
      if (activeIndex < state.tabsMenuList.length - 1) return true
      return false
    })

    /**
     * 是否可以关闭其他tab
     */
    const canCloseOrther = computed<boolean>(() => {
      if (state.activeTab === state.tabsMenuList[0].path && state.tabsMenuList.length >= 2) {
        return true
      } else {
        if (state.tabsMenuList.length > 2) {
          return true
        }
      }

      return false
    })

    /**
     * 是否可以关闭所有tab
     */
    const canCloseAll = computed<boolean>(() => {
      if (state.tabsMenuList.length > 1) return true
      return false
    })

    /**
     * 添加tab
     */
    const addTab = (menu: MenuType) => {
      const tabExist = hasTab(menu)

      console.log('tabExist', tabExist)

      if (tabExist) return
      else state.tabsMenuList.push(menu)
    }

    /**
     * 获取当前 tab 的index
     * @returns
     */
    const activeTabIndex = (): number => {
      return state.tabsMenuList.findIndex((item) => item.path === state.activeTab)
    }

    /**
     * 移除某个tab
     * @param menuPath
     */
    const removeTab = (menuPath: string) => {
      const activeIndex = activeTabIndex()

      state.tabsMenuList = state.tabsMenuList.filter((item) => item.path != menuPath)
      if (menuPath == state.activeTab) {
        router.push({
          path: state.tabsMenuList[activeIndex - 1].path
        })
      }
    }

    /**
     * 关闭左侧的tab
     */
    const closeLeft = () => {
      const activeIndex = activeTabIndex()
      state.tabsMenuList.splice(1, activeIndex - 1)
    }

    /**
     * 关闭右侧 tab
     */
    const closeRight = () => {
      const activeIndex = activeTabIndex()
      state.tabsMenuList.splice(-(state.tabsMenuList.length - (activeIndex + 1)))
    }

    /**
     * 关闭其他 tab
     */
    const closeOrther = () => {
      state.tabsMenuList = state.tabsMenuList.filter(
        (item) => item.path === '/' || item.path === state.activeTab
      )
    }

    const closeAll = () => {
      state.tabsMenuList = state.tabsMenuList.filter((item) => item.path === '/')
      router.push('/')
    }

    const hasTab = (menu: MenuType) => {
      return state.tabsMenuList.some((item) => item.path == menu.path)
    }

    return {
      ...toRefs(state),
      canCloseLeft,
      canCloseRight,
      canCloseOrther,
      canCloseAll,
      addTab,
      removeTab,
      closeLeft,
      closeRight,
      closeOrther,
      closeAll
    }
  },
  {
    persist: true
  }
)
