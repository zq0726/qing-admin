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
  },
  {
    path: '/system',
    name: '系統管理',
    component: Layout,
    children: [
      {
        path: '/system/user',
        name: '用户',
        component: () => import('@/views/system/user/index.vue')
      },
      {
        path: '/system/role',
        name: '角色',
        component: () => import('@/views/system/role/index.vue')
      },
      {
        path: '/system/department',
        name: '部门',
        component: () => import('@/views/system/department/index.vue')
      },
      {
        path: '/system/menu',
        name: '菜单',
        component: () => import('@/views/system/menu/index.vue')
      }
    ]
  }
]

export default layoutRouter
