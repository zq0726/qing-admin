import type { RouteRecordRaw } from 'vue-router'
import { Layout } from '../constant'
import { PageEnum } from '@/enums/pageEnum'

const layoutRouter: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: PageEnum.BASE_HOME,
        name: '首页',
        component: () => import('@/views/dashboard/Dashboard.vue')
      }
    ]
  }
]

export default layoutRouter
