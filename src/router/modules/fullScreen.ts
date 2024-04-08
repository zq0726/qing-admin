import { PageEnum } from '@/enums/pageEnum'
import type { RouteRecordRaw } from 'vue-router'

const fullScreenRouter: RouteRecordRaw[] = [
  {
    path: PageEnum.BASE_LOGIN,
    name: PageEnum.BASE_LOGIN_NAME,
    component: () => import('@/views/system/Login/index.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test/t1.vue')
  },
  {
    path: '/test1',
    name: 'test1',
    component: () => import('@/views/test/t2.vue')
  }
]

export default fullScreenRouter
