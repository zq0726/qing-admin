import axios from 'axios'
import type { InternalAxiosRequestConfig, Canceler } from 'axios'

const pendingMap: Map<string, Canceler> = new Map()

/** @name 记录接口 */
export const addPending = (config: InternalAxiosRequestConfig) => {
  const pendingKey = getPendingkey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel)
      }
    })
}
/** @name 移除接口 */
export const removePending = (config: InternalAxiosRequestConfig) => {
  const pendingKey = getPendingkey(config)
  if (pendingMap.has(pendingKey)) {
    const cancel = pendingMap.get(pendingKey)
    cancel && cancel(pendingKey)
    pendingMap.delete(pendingKey)
  }
}

/** @name 通过接口请求信息生成唯一的key */
export const getPendingkey = (config: InternalAxiosRequestConfig<any>) => {
  let { data } = config
  const { url, method, params } = config
  if (typeof data === 'string') data = JSON.parse(data)
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}
