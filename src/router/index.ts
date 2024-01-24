import { PageEnum } from '@/enums/pageEnum'
import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: PageEnum.BASE_LOGIN,
    name: PageEnum.BASE_LOGIN_NAME,
    component: () => import('@/views/system/Login/index.vue')
  },
  {
    path: PageEnum.BASE_HOME,
    name: '首页',
    component: () => import('@/views/dashboard/Dashboard.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const setupRouter = (app: App) => {
  app.use(router)
}

export default router
