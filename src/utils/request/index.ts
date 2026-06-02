import axios, { isCancel } from 'axios'
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { defaultConfig } from './config'
import {
  requestInterceptor,
  requestErrorInterceptor,
  responseInterceptor,
  responseErrorInterceptor,
  checkCache,
} from './interceptors'
import { createCancelToken, cancelRequest, cancelAllRequests, removeCancelToken } from './cancel'
import type { RequestConfig, ResponseData } from './types'

/**
 * 创建 axios 实例
 * @param customConfig - 自定义配置，会覆盖默认配置
 * @returns axios 实例
 */
const createAxiosInstance = (customConfig?: typeof defaultConfig): AxiosInstance => {
  // 创建 axios 实例，合并默认配置和自定义配置
  const instance = axios.create({ ...defaultConfig, ...customConfig })

  // 添加请求拦截器
  instance.interceptors.request.use(requestInterceptor, requestErrorInterceptor)
  // 添加响应拦截器
  instance.interceptors.response.use(responseInterceptor, responseErrorInterceptor)

  return instance
}

/**
 * 默认 axios 实例
 */
const request = createAxiosInstance()

/**
 * 创建请求
 * 通用请求函数，支持 GET、POST、PUT、DELETE、PATCH 方法
 * @template T - 响应数据类型
 * @param method - 请求方法
 * @param url - 请求 URL
 * @param data - 请求体数据
 * @param config - 请求配置
 * @returns Promise<响应数据>
 */
const createRequest = <T = unknown>(
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  url: string,
  data?: object | string | FormData | null,
  config?: RequestConfig,
): Promise<T> => {
  // 如果是 GET 请求，先检查缓存
  if (method === 'get') {
    const cached = checkCache({ ...config, method, url } as InternalAxiosRequestConfig)
    if (cached !== null) {
      // 如果有缓存，直接返回缓存数据
      return Promise.resolve(cached as T)
    }
  }

  // 创建取消令牌（防止重复请求）
  const cancelToken = createCancelToken(url, method)
  const finalConfig: RequestConfig = {
    ...config,
    cancelToken,
  }

  // 根据请求方法发送请求
  let promise: Promise<AxiosResponse<ResponseData>>

  switch (method) {
    case 'get':
      promise = request.get(url, finalConfig)
      break
    case 'post':
      promise = request.post(url, data, finalConfig)
      break
    case 'put':
      promise = request.put(url, data, finalConfig)
      break
    case 'delete':
      promise = request.delete(url, finalConfig)
      break
    case 'patch':
      promise = request.patch(url, data, finalConfig)
      break
    default:
      throw new Error(`Unsupported method: ${method}`)
  }

  // 返回处理后的响应数据
  return promise.then((response) => {
    // 请求完成后移除取消令牌
    removeCancelToken(url, method)
    return response.data as T
  })
}

/**
 * GET 请求
 * @template T - 响应数据类型
 * @param url - 请求 URL
 * @param configOrParams - 请求配置对象或直接的查询参数对象
 *   - 如果传入的是 { params: {...}, options: {...} } 格式，则作为完整配置处理
 *   - 如果传入的是普通对象（不含 params 属性），则直接作为查询参数处理
 * @returns Promise<响应数据>
 */
export const get = <T = unknown>(
  url: string,
  configOrParams?: RequestConfig | Record<string, unknown>,
): Promise<T> => {
  // 判断是否为完整配置对象（包含 params 或 options 属性）
  const isFullConfig = configOrParams && ('params' in configOrParams || 'options' in configOrParams)

  if (isFullConfig) {
    // 完整配置模式：直接传递给 createRequest
    return createRequest<T>('get', url, undefined, configOrParams as RequestConfig)
  } else if (configOrParams) {
    // 简化模式：将对象直接作为 params 传递
    return createRequest<T>('get', url, undefined, { params: configOrParams })
  }

  // 无参数模式
  return createRequest<T>('get', url, undefined, undefined)
}

/**
 * POST 请求
 * @template T - 响应数据类型
 * @param url - 请求 URL
 * @param data - 请求体数据
 * @param config - 请求配置
 * @returns Promise<响应数据>
 */
export const post = <T = unknown>(
  url: string,
  data?: object | string | FormData | null,
  config?: RequestConfig,
): Promise<T> => {
  return createRequest<T>('post', url, data, config)
}

/**
 * PUT 请求
 * @template T - 响应数据类型
 * @param url - 请求 URL
 * @param data - 请求体数据
 * @param config - 请求配置
 * @returns Promise<响应数据>
 */
export const put = <T = unknown>(
  url: string,
  data?: object | string | FormData | null,
  config?: RequestConfig,
): Promise<T> => {
  return createRequest<T>('put', url, data, config)
}

/**
 * DELETE 请求
 * @template T - 响应数据类型
 * @param url - 请求 URL
 * @param config - 请求配置
 * @returns Promise<响应数据>
 */
export const del = <T = unknown>(url: string, config?: RequestConfig): Promise<T> => {
  return createRequest<T>('delete', url, undefined, config)
}

/**
 * PATCH 请求
 * @template T - 响应数据类型
 * @param url - 请求 URL
 * @param data - 请求体数据
 * @param config - 请求配置
 * @returns Promise<响应数据>
 */
export const patch = <T = unknown>(
  url: string,
  data?: object | string | FormData | null,
  config?: RequestConfig,
): Promise<T> => {
  return createRequest<T>('patch', url, data, config)
}

/**
 * 文件上传请求
 * 自动设置 Content-Type 为 multipart/form-data
 * @template T - 响应数据类型
 * @param url - 请求 URL
 * @param formData - 表单数据
 * @param config - 请求配置（不包含 cancelToken）
 * @returns Promise<响应数据>
 */
export const upload = <T = unknown>(
  url: string,
  formData: FormData,
  config?: Omit<RequestConfig, 'cancelToken'>,
): Promise<T> => {
  return request
    .post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      return response.data as T
    })
}

// 导出取消请求相关函数
export { cancelRequest, cancelAllRequests, isCancel }

// 导出默认 axios 实例
export { request }

// 导出创建 axios 实例的函数
export { createAxiosInstance }

// 默认导出 request
export default request
