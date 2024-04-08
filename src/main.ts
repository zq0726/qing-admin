import { createApp } from 'vue'
import { setupRouter } from './router'
import { setupStore } from './stores'
import { setupElementIcon } from './plugin/elementIcon'
import { setupLanguage } from './language/index'

import './assets/reset.css'
import 'dayjs/locale/zh-cn'
import 'virtual:windi.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/display.css'
import './styles/element/reset.scss'
import 'animate.css'

import App from './App.vue'
import registerDirective from './directive'
import { registerPlugin } from './myPlugin'

function bootstrap() {
  const app = createApp(App)

  //全局状态管理
  setupStore(app)

  setupElementIcon(app)

  //路由管理
  setupRouter(app)

  //国际化
  setupLanguage(app)

  //全局指令
  registerDirective(app)

  //注冊插件
  registerPlugin(app)

  app.mount('#app')
}

void bootstrap()
