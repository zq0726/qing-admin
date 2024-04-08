import { reactive, toRefs } from 'vue'
import type { LoadingOptions } from 'element-plus'

export const useLoading = (loadingOption?: LoadingOptions) => {
  const state = reactive<any>({
    loadingInstance: null,
    lock: true,
    text: '加载中',
    background: 'rgba(0, 0, 0, 0.7)',
    ...loadingOption
  })

  const openLoading = () => {
    state.loadingInstance = ElLoading.service({
      lock: state.lock,
      background: state.background,
      text: state.text
    })
  }

  const closeLoading = () => {
    state.loadingInstance.close()
  }

  return {
    ...toRefs(state),
    openLoading,
    closeLoading
  }
}
