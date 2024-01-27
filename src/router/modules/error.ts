import type { RouteRecordRaw } from 'vue-router'

const errorRouter: RouteRecordRaw[] = [
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue')
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/error/403.vue')
  }
]

export default errorRouter
