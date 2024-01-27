import type { Router } from 'vue-router'

//路由守卫
export const createRouterGuards = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    next()
  })
}
