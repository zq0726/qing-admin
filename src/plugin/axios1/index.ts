import axios from 'axios'
import { ElLoading } from 'element-plus'
import type { AxiosRequestConfig, AxiosResponse, Canceler, InternalAxiosRequestConfig } from 'axios'
import type { LoadingOptions } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading.mjs'

/**
 * @name 自定义配置
 */
interface CustomOptions {
  /** @name 是否开启loading层效果，默认为false */
  loading: boolean
  /** @name 是否开启取消重复请求，默认为 true */
  repeat_request_cancel: boolean
  /** @name 是否开启简洁的数据结构响应，默认为true **/
  reduct_data_format: boolean
  /** @name 是否开启接口错误信息展示，默认为true **/
  error_message_show: boolean
  /** @name 是否开启code不为0时的信息提示，默认为false **/
  code_message_show: boolean
}

const pendingMap: Map<string, Canceler> = new Map()

/** @name 记录loading单实例 */
const loadingInstance: {
  _target: LoadingInstance | null
  _count: number
} = {
  _target: null,
  _count: 0
}

const myAxios = (
  axiosConfig: AxiosRequestConfig,
  customOptions?: Partial<CustomOptions>,
  loadingOption?: LoadingOptions
) => {
  const service = axios.create({
    baseURL: '/api', //
    timeout: 1000 * 60 * 4
  })

  //自定义配置
  const custom_options: CustomOptions = Object.assign(
    {
      loading: false,
      repeat_request_cancel: true,
      reduct_data_format: true,
      error_message_show: true,
      code_message_show: false
    },
    customOptions
  )

  service.interceptors.request.use(
    (config) => {
      removePending(config)
      custom_options.repeat_request_cancel && addPending(config)
      if (custom_options.loading) {
        loadingInstance._count++
        if (loadingInstance._count === 1) {
          loadingInstance._target = ElLoading.service(loadingOption)
        }
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // 响应拦截
  service.interceptors.response.use(
    (response) => {
      removePending(response.config)
      custom_options.loading && closeLoading(custom_options)
      if (custom_options.code_message_show && response.data && response.data.code !== 0) {
        ElMessage({
          type: 'error',
          message: response.data.message
        })

        return Promise.reject(response.data)
      }
      return response
    },
    (error) => {
      error.config && removePending(error.config)
      httpErrorStatusHandle(error)

      return Promise.reject(error)
    }
  )

  return service(axiosConfig)
}

const closeLoading = (_options: CustomOptions) => {
  if (_options.loading && loadingInstance._count > 0) loadingInstance._count--
  if (loadingInstance._count === 0 && loadingInstance._target) {
    loadingInstance._target.close()
    loadingInstance._target = null
  }
}

/** @name 记录接口 */
const addPending = (config: InternalAxiosRequestConfig) => {
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
const removePending = (config: InternalAxiosRequestConfig) => {
  const pendingKey = getPendingkey(config)
  if (pendingMap.has(pendingKey)) {
    const cancel = pendingMap.get(pendingKey)
    cancel && cancel(pendingKey)
    pendingMap.delete(pendingKey)
  }
}

/** @name 通过接口请求信息生成唯一的key */
const getPendingkey = (config: InternalAxiosRequestConfig<any>) => {
  let { data } = config
  const { url, method, params } = config
  if (typeof data === 'string') data = JSON.parse(data)
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}

/**
 * @name 错误处理
 * @param error
 */
const httpErrorStatusHandle = (error: any) => {
  let messageString = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        messageString = '接口重定向了！'
        break
      case 400:
        messageString = '参数不正确!'
        break
      case 401:
        messageString = '您未登录，或者登录已超时！'
        break
      case 403:
        messageString = '您没有权限操作！'
        break
      case 404:
        messageString = `请求地址出错: ${error.response.config.url}`
        break
      case 408:
        messageString = '请求超时！'
        break
      case 409:
        messageString = '系统已存在相同数据！'
        break
      case 500:
        messageString = '服务器内部错误！'
        break
      case 501:
        messageString = '服务未实现！'
        break
      case 502:
        messageString = '网关错误！'
        break
      case 503:
        messageString = '服务不可用！'
        break
      case 504:
        messageString = '服务暂时无法访问，请稍后再试！'
        break
      case 505:
        messageString = 'HTTP版本不受支持！'
        break
      default:
        messageString = '异常问题，请联系管理员！'
        break
    }
  }

  if (error.message.includes('timeout')) messageString = '网络请求超时！'
  if (error.message.includes('Netword'))
    messageString = window.navigator.onLine ? '服务端异常！' : '您断网了！'

  ElMessage({
    type: 'error',
    message: messageString
  })
}

export default myAxios
