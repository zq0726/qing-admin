import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading.mjs'

/** @name 记录loading单实例 */
const loadingInstance: {
  _target: LoadingInstance | null
  _count: number
} = {
  _target: null,
  _count: 0
}

/**
 * 打开loading
 * @param loadingOption
 */
export const openLoading = (loadingOption?: any) => {
  loadingInstance._count++

  if (loadingInstance._count === 1) {
    loadingInstance._target = ElLoading.service(loadingOption)
  }
}

/**
 * 关闭 loading
 * @param _options
 */
export const closeLoading = (_options?: any) => {
  if (_options.loading && loadingInstance._count > 0) loadingInstance._count--
  console.log(3333, loadingInstance)
  if (loadingInstance._count === 0 && loadingInstance._target) {
    loadingInstance._target.close()
    loadingInstance._target = null
  }
}

/**
 * 开启loading
 */
