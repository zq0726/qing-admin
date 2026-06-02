import axios, { isCancel } from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
import { getStorage, removeStorage } from '../storage'
import type { ResponseData, RequestConfig, RequestOptions } from './types'
import { statusCodeMessages, defaultRequestOptions } from './config'
import { logRequest, logResponse, logError } from './logger'
import { getCache, setCache } from './cache'
import { removeCancelToken } from './cancel'

/**
 * Token 存储键名
 */
const TOKEN_KEY = 'qing-admin-token'

/**
 * 加载实例映射表
 * 使用 Map 存储正在显示的加载遮罩实例
 */
const loadingInstanceMap = new Map<string, ReturnType<typeof ElLoading.service>>()

/**
 * 合并默认选项和自定义选项
 * @param config - 请求配置
 * @returns 合并后的选项
 */
const mergeOptions = (config: RequestConfig): RequestOptions => {
  return { ...defaultRequestOptions, ...config.options }
}

/**
 * 请求拦截器
 * 在请求发送前执行，用于添加 Token、时间戳、参数序列化和加载状态
 * @param config - 请求配置
 * @returns 修改后的请求配置
 */
export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  // 记录请求日志
  logRequest(config)

  // 获取 Token 并添加到请求头
  const token = getStorage<string>(TOKEN_KEY)
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }

  // 获取合并后的请求选项
  const requestConfig = config as RequestConfig
  const options = mergeOptions(requestConfig)

  // 如果需要添加时间戳
  if (options.addTimestamp) {
    if (config.method === 'get') {
      // GET 请求添加到 params
      config.params = config.params || {}
      config.params._t = Date.now()
    } else if (config.data && typeof config.data === 'object') {
      // POST/PUT 等请求添加到 data
      config.data = { ...config.data, _t: Date.now() }
    }
  }

  // 如果需要序列化参数（过滤 undefined/null）
  if (options.serializeParams) {
    if (config.method === 'get' && config.params) {
      config.params = serializeParams(config.params)
    } else if (
      config.data &&
      typeof config.data === 'object' &&
      !(config.data instanceof FormData)
    ) {
      config.data = serializeParams(config.data)
    }
  }

  // 如果需要显示加载动画
  if (options.showLoading) {
    const loadingKey = JSON.stringify({ url: config.url, method: config.method })
    const loadingInstance = ElLoading.service({
      lock: true,
      text: '加载中...',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    loadingInstanceMap.set(loadingKey, loadingInstance)
  }

  return config
}

/**
 * 请求错误拦截器
 * 处理请求发送过程中的错误
 * @param error - 错误对象
 * @returns 拒绝的 Promise
 */
export const requestErrorInterceptor = (error: AxiosError) => {
  // 记录错误日志
  logError(error)
  return Promise.reject(error)
}

/**
 * 响应拦截器
 * 在响应返回后执行，用于处理响应数据、关闭加载状态和缓存
 * @param response - 响应对象
 * @returns 修改后的响应或拒绝的 Promise
 */
export const responseInterceptor = (response: AxiosResponse<ResponseData>) => {
  // 记录响应日志
  logResponse(response)

  // 关闭加载动画
  const loadingKey = JSON.stringify({ url: response.config.url, method: response.config.method })
  const loadingInstance = loadingInstanceMap.get(loadingKey)
  if (loadingInstance) {
    loadingInstance.close()
    loadingInstanceMap.delete(loadingKey)
  }

  // 获取合并后的请求选项
  const requestConfig = response.config as RequestConfig
  const options = mergeOptions(requestConfig)

  // 移除取消令牌（请求已完成）
  removeCancelToken(response.config.url || '', response.config.method || 'get')

  // 解析响应数据
  const { code, message, data } = response.data

  // 如果业务状态码为 200（成功）
  if (code === 200 || code === 0) {
    // 如果启用了缓存且是 GET 请求，缓存响应数据
    if (options.cache && response.config.method === 'get') {
      const cacheKey = `${response.config.method}-${response.config.url}`
      setCache(cacheKey, data)
    }

    // 如果需要显示成功消息
    if (options.showSuccess) {
      ElMessage.success(options.successMessage || message || '操作成功')
    }

    // 返回响应数据
    return { ...response, data } as AxiosResponse
  } else {
    // 如果业务状态码不是 200（失败）
    if (options.showError) {
      ElMessage.error(message || '请求失败')
    }
    return Promise.reject(new Error(message))
  }
}

/**
 * 响应错误拦截器
 * 处理响应错误，包括 HTTP 错误、网络错误和请求取消
 * @param error - 错误对象
 * @returns 拒绝的 Promise
 */
export const responseErrorInterceptor = (error: AxiosError<ResponseData>) => {
  // 记录错误日志
  logError(error)

  // 关闭加载动画
  const loadingKey = JSON.stringify({ url: error.config?.url, method: error.config?.method })
  const loadingInstance = loadingInstanceMap.get(loadingKey)
  if (loadingInstance) {
    loadingInstance.close()
    loadingInstanceMap.delete(loadingKey)
  }

  // 如果有请求配置，移除取消令牌
  if (error.config) {
    removeCancelToken(error.config.url || '', error.config.method || 'get')
  }

  // 获取合并后的请求选项
  const requestConfig = error.config as RequestConfig
  const options = mergeOptions(requestConfig)

  // 如果是请求被取消
  if (isCancel(error)) {
    return Promise.reject(error)
  }

  // 如果有响应（HTTP 错误）
  if (error.response) {
    const status = error.response.status
    const responseData = error.response.data

    // 获取错误消息
    const message = responseData?.message || statusCodeMessages[status] || error.response.statusText

    // 如果需要显示错误消息
    if (options.showError) {
      ElMessage.error(message)
    }

    // 如果是 401（未授权），清除 Token 并跳转到登录页
    if (status === 401) {
      removeStorage(TOKEN_KEY)
      window.location.href = '/login'
    }

    // 如果启用了重试且应该重试
    if (options.retry && shouldRetry(error)) {
      return retryRequest(requestConfig, options)
    }
  } else if (error.request) {
    // 如果有请求但没有响应（网络错误或超时）
    if (options.showError) {
      ElMessage.error('网络请求超时')
    }

    // 如果启用了重试
    if (options.retry) {
      return retryRequest(requestConfig, options)
    }
  } else {
    // 请求配置错误
    if (options.showError) {
      ElMessage.error('请求配置错误')
    }
  }

  return Promise.reject(error)
}

/**
 * 判断是否应该重试请求
 * @param error - 错误对象
 * @returns 是否应该重试
 */
const shouldRetry = (error: AxiosError): boolean => {
  if (error.response) {
    const status = error.response.status
    // 只对特定状态码重试：408（请求超时）、500（服务器错误）、502（网关错误）、503（服务不可用）、504（网关超时）
    return [408, 500, 502, 503, 504].includes(status)
  }
  // 网络错误时重试
  return true
}

/**
 * 重试请求
 * 使用指数退避策略（每次重试间隔翻倍）
 * @param config - 请求配置
 * @param options - 请求选项
 * @returns 新的请求 Promise
 */
const retryRequest = (config: RequestConfig, options: RequestOptions): Promise<AxiosResponse> => {
  const requestConfig = config as RequestConfig
  const currentCount = requestConfig.__retryCount || 0
  const maxRetry = options.retry || 3

  // 如果已达到最大重试次数，拒绝请求
  if (currentCount >= maxRetry) {
    return Promise.reject(new Error('重试次数已用尽'))
  }

  // 更新重试次数
  requestConfig.__retryCount = currentCount + 1

  // 计算重试延迟（指数退避）
  const delay = (options.retryDelay || 1000) * Math.pow(2, currentCount)

  // 延迟后重新发送请求
  return new Promise((resolve) => setTimeout(resolve, delay)).then(() => {
    return axios.request(requestConfig)
  })
}

/**
 * 序列化参数
 * 过滤掉 undefined 和 null 值
 * @param params - 原始参数对象
 * @returns 序列化后的参数对象
 */
const serializeParams = (params: Record<string, unknown>): Record<string, unknown> => {
  const result: Record<string, unknown> = {}
  for (const key in params) {
    if (params[key] !== undefined && params[key] !== null) {
      result[key] = params[key]
    }
  }
  return result
}

/**
 * 检查缓存
 * 如果缓存存在且未过期，返回缓存数据
 * @param config - 请求配置
 * @returns 缓存数据或 null
 */
export const checkCache = (config: InternalAxiosRequestConfig): unknown | null => {
  // 只对 GET 请求检查缓存
  if (config.method !== 'get') return null

  // 获取合并后的请求选项
  const requestConfig = config as RequestConfig
  const options = mergeOptions(requestConfig)

  // 如果未启用缓存，返回 null
  if (!options.cache) return null

  // 生成缓存键并获取缓存数据
  const cacheKey = `${config.method}-${config.url}`
  return getCache(cacheKey, options.cacheTime)
}
