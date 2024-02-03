import { createApp } from 'vue'
import { setupRouter } from './router'
import { setupStore } from './stores'
import { setupElementIcon } from './plugin/elementIcon'
import { setupLanguage } from './language/index'

import './assets/reset.css'
import 'dayjs/locale/zh-cn'
import 'virtual:windi.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/element/reset.scss'

import App from './App.vue'

async function bootstrap() {
  const app = createApp(App)

  //全局状态管理
  setupStore(app)

  setupElementIcon(app)

  //路由管理
  setupRouter(app)

  //国际化
  setupLanguage(app)

  app.mount('#app')
}

void bootstrap()
