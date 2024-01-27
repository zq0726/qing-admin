import type { Router } from 'vue-router'
import NProgress from '@/plugin/nprogress'

//路由守卫
export const createRouterGuards = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    NProgress.start()
    next()
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
