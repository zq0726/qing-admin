import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { createRouterGuards } from './guards'
import type { IModuleType } from './types'

const modules = import.meta.glob<IModuleType>('./modules/**/*.ts', { eager: true })

const routeModuleList: RouteRecordRaw[] = Object.keys(modules).reduce((list, key) => {
  const mod = modules[key].default ?? {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  return [...list, ...modList]
}, [] as RouteRecordRaw[])

const routes: RouteRecordRaw[] = [
  ...routeModuleList,
  {
    // 找不到路由重定向到404页面
    path: '/:pathMatch(.*)',
    component: () => import('@/views/error/404.vue')
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
  createRouterGuards(router)
}

export default router
