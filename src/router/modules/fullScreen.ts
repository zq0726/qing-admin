import { PageEnum } from '@/enums/pageEnum'
import type { RouteRecordRaw } from 'vue-router'

const fullScreenRouter: RouteRecordRaw[] = [
  {
    path: PageEnum.BASE_LOGIN,
    name: PageEnum.BASE_LOGIN_NAME,
    component: () => import('@/views/system/Login/index.vue')
  }
]

export default fullScreenRouter
