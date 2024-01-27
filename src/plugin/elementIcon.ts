import * as Icons from '@element-plus/icons-vue'
import type { App } from 'vue'

export const setupElementIcon = (app: App) => {
  // 注册element Icons组件
  Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key as keyof typeof Icons])
  })
}
