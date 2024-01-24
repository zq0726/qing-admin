import { createApp } from 'vue'
import { setupRouter } from './router'
import { setupStore } from './stores'

import App from './App.vue'

async function bootstrap() {
  const app = createApp(App)

  //全局状态管理
  setupStore(app)

  //路由管理
  setupRouter(app)

  app.mount('#app')
}

void bootstrap()
