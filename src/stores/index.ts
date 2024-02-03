import type { App } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const store = createPinia()
store.use(persist)

export function setupStore(app: App<Element>) {
  app.use(store)
}

export { store }
