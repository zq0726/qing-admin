import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import type { Plugin, PluginOption } from 'vite'
import { configHtmlPlugin } from './html'
import { createElementPlus } from './element-plus'

export const createVitePlugins = (viteEnv: ViteEnv, isBuild: boolean, prodMock: boolean) => {
  // const { VITE_USE_MOCK, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv
  console.log(prodMock)
  let vitePlugins: (Plugin | Plugin[] | PluginOption[])[] = [
    // have to
    vue(),
    // have to
    vueJsx()
  ]

  vitePlugins = [...vitePlugins, configHtmlPlugin(viteEnv, isBuild), ...createElementPlus()]

  // // vite-plugin-mock
  // VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild, prodMock))

  // if (isBuild) {
  //   // rollup-plugin-gzip
  //   vitePlugins.push(
  //     configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
  //   )
  // }

  return vitePlugins
}
