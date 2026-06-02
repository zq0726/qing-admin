import type { AxiosRequestConfig, AxiosResponse, AxiosError, CancelToken } from 'axios'

/**
 * 统一响应数据结构
 * @template T - 响应数据类型
 */
export interface ResponseData<T = unknown> {
  code: number // 业务状态码（200 表示成功）
  message: string // 响应消息
  data: T // 响应数据
}

/**
 * 请求配置选项
 * 用于控制请求的行为和表现
 */
export interface RequestOptions {
  showLoading?: boolean // 是否显示加载动画（默认 false）
  showError?: boolean // 是否显示错误提示（默认 true）
  showSuccess?: boolean // 是否显示成功消息（默认 false）
  successMessage?: string // 自定义成功消息
  addTimestamp?: boolean // 是否添加时间戳防止缓存（默认 true）
  serializeParams?: boolean // 是否过滤 undefined/null 参数（默认 false）
  retry?: number // 重试次数（默认 0，不重试）
  retryDelay?: number // 重试间隔时间（毫秒，默认 1000）
  cache?: boolean // 是否启用请求缓存（默认 false）
  cacheTime?: number // 缓存有效期（毫秒，默认 5000）
}

/**
 * 请求配置接口
 * 扩展 AxiosRequestConfig，添加自定义选项
 */
export interface RequestConfig extends AxiosRequestConfig {
  options?: RequestOptions // 自定义请求选项
  __retryCount?: number // 内部使用：已重试次数
}

/**
 * 请求方法类型
 */
export type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options'

/**
 * 取消令牌映射
 */
export interface CancelTokenMap {
  [key: string]: CancelToken
}

/**
 * 请求错误类型
 * 扩展 AxiosError，添加响应数据类型
 */
export interface RequestError extends AxiosError {
  response?: AxiosResponse<ResponseData>
}

/**
 * 请求结果类型
 * @template T - 数据类型
 */
export interface RequestResult<T = unknown> {
  success: boolean // 请求是否成功
  data?: T // 返回数据
  message?: string // 消息
  error?: RequestError // 错误信息
}

/**
 * 缓存项类型
 * @template T - 缓存数据类型
 */
export interface CacheItem<T = unknown> {
  data: T // 缓存数据
  timestamp: number // 缓存时间戳
}
