import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

/**
 * 记录请求日志
 * 仅在开发环境下输出，方便调试
 * @param config - 请求配置
 */
export const logRequest = (config: InternalAxiosRequestConfig): void => {
  // 如果不是开发环境，不输出日志
  if (import.meta.env.NODE_ENV !== 'development') return

  // 获取请求方法（转换为大写），默认为 'UNKNOWN'
  const method = config.method?.toUpperCase() || 'UNKNOWN'
  // 获取请求 URL
  const url = config.url || ''
  // 获取请求参数
  const params = config.params
  // 获取请求体数据
  const data = config.data

  // 使用 console.group 组织日志输出
  console.group(`%c[REQUEST] ${method} ${url}`, 'color: #4CAF50; font-weight: bold')
  // 如果有请求参数，输出参数
  if (params) {
    console.log('%cParams:', 'color: #607D8B', params)
  }
  // 如果有请求体，输出请求体
  if (data) {
    console.log('%cData:', 'color: #607D8B', data)
  }
  // 结束日志分组
  console.groupEnd()
}

/**
 * 记录响应日志
 * 仅在开发环境下输出，方便调试
 * @param response - 响应对象
 */
export const logResponse = (response: AxiosResponse): void => {
  // 如果不是开发环境，不输出日志
  if (import.meta.env.NODE_ENV !== 'development') return

  // 获取请求方法（转换为大写），默认为 'UNKNOWN'
  const method = response.config.method?.toUpperCase() || 'UNKNOWN'
  // 获取请求 URL
  const url = response.config.url || ''
  // 获取响应状态码
  const status = response.status
  // 获取响应数据
  const data = response.data

  // 使用 console.group 组织日志输出
  console.group(`%c[RESPONSE] ${method} ${url}`, 'color: #2196F3; font-weight: bold')
  // 输出响应状态码
  console.log('%cStatus:', 'color: #607D8B', status)
  // 输出响应数据
  console.log('%cData:', 'color: #607D8B', data)
  // 结束日志分组
  console.groupEnd()
}

/**
 * 记录错误日志
 * 在所有环境下都输出，方便排查问题
 * @param error - 错误对象
 */
export const logError = (error: AxiosError): void => {
  // 使用 console.group 组织日志输出
  console.group(`%c[ERROR]`, 'color: #f44336; font-weight: bold')

  // 如果有请求配置，输出请求方法和 URL
  if (error.config) {
    const method = error.config.method?.toUpperCase() || 'UNKNOWN'
    const url = error.config.url || ''
    console.log('%cURL:', 'color: #607D8B', `${method} ${url}`)
  }

  // 输出错误消息
  console.log('%cMessage:', 'color: #607D8B', error.message)

  // 如果有响应，输出响应状态码和响应数据
  if (error.response) {
    console.log('%cStatus:', 'color: #607D8B', error.response.status)
    console.log('%cResponse:', 'color: #607D8B', error.response.data)
  } else if (error.request) {
    // 如果有请求但没有响应，说明请求发送了但没有收到响应
    console.log('%cRequest:', 'color: #607D8B', 'No response received')
  }

  // 结束日志分组
  console.groupEnd()
}

/**
 * 记录请求取消日志
 * 仅在开发环境下输出，方便调试
 * @param url - 请求 URL
 * @param method - 请求方法
 */
export const logCancel = (url: string, method: string): void => {
  // 如果不是开发环境，不输出日志
  if (import.meta.env.NODE_ENV !== 'development') return

  // 输出取消日志
  console.log(`%c[CANCEL] ${method.toUpperCase()} ${url}`, 'color: #FF9800')
}
