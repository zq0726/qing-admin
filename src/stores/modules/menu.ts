import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import type { MenuStoreType } from '../types'

export const useMenuStore = defineStore(
  'menu',
  () => {
    const state = reactive<MenuStoreType>({
      menuList: [
        {
          title: '首頁',
          path: '/',
          icon: 'House'
        },
        {
          title: '系統管理',
          icon: 'Setting',
          path: '/system',
          children: [
            {
              title: '用户',
              path: '/system/user',
              icon: 'Edit'
            },
            {
              title: '角色',
              path: '/system/role',
              icon: 'Edit'
            }
          ]
        }
      ],
      breadcrumbList: [],
      defalutActive: '/',
      defaultOpeneds: ['/']
    })

    return {
      ...toRefs(state)
    }
  },
  {
    persist: true
  }
)
