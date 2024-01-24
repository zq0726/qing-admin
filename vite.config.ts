import type { UserConfig, ConfigEnv } from 'vite'

import { loadEnv } from 'vite'
import { wrapperEnv } from './build/utils'
import { fileURLToPath } from 'node:url'
import { createProxy } from './build/vite/proxy'
import { OUTPUT_DIR } from './build/constant'
import pkg from './package.json'
import moment from 'moment'
import { createVitePlugins } from './build/vite/plugin'

const { dependencies, devDependencies, name, version } = pkg

const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: moment(new Date()).format('yyyy-MM-dd HH:mm:ss')
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)

  const { VITE_PUBLIC_PATH, VITE_PORT, VITE_GLOB_PROD_MOCK, VITE_PROXY } = viteEnv
  const prodMock = VITE_GLOB_PROD_MOCK
  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    plugins: createVitePlugins(viteEnv, isBuild, prodMock),
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000
    }
  }
}
