import type { App } from 'vue'
import MyLoading from './loading'

export const registerPlugin = (app: App) => {
  console.log('使用 loading')
  app.use(MyLoading)
}
