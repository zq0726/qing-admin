import type { AxiosRequestConfig } from 'axios'

/**
 * axios 默认配置
 * 包含基础 URL、超时时间、请求头和跨域设置
 */
export const defaultConfig: AxiosRequestConfig = {
  baseURL: '/api', // API 基础地址
  timeout: 10000, // 请求超时时间（10秒）
  headers: {
    'Content-Type': 'application/json;charset=UTF-8', // 默认请求头
  },
  withCredentials: true, // 跨域时携带 cookies
}

/**
 * 请求安全配置
 * 用于 CSRF 防护和跨域设置
 */
export const requestConfig = {
  withCredentials: true, // 跨域时携带 cookies
  xsrfCookieName: 'XSRF-TOKEN', // CSRF token 的 cookie 名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // 发送 CSRF token 的请求头名称
}

/**
 * HTTP 状态码对应的错误消息映射
 * 用于统一错误提示
 */
export const statusCodeMessages: Record<number, string> = {
  400: '请求参数错误',
  401: '未登录或登录已过期，请重新登录',
  403: '无权限访问',
  404: '资源未找到',
  405: '请求方法不允许',
  408: '请求超时',
  500: '服务器内部错误',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
}

/**
 * 默认请求选项配置
 * 这些配置可以在单个请求中被覆盖
 */
export const defaultRequestOptions = {
  showLoading: false, // 默认不显示加载动画
  showError: true, // 默认显示错误提示
  showSuccess: false, // 默认不显示成功消息
  successMessage: '', // 默认成功消息为空
  addTimestamp: true, // 默认添加时间戳
  serializeParams: false, // 默认不过滤空参数
  retry: 0, // 默认不重试
  retryDelay: 1000, // 默认重试间隔 1 秒
  cache: false, // 默认不启用缓存
  cacheTime: 5000, // 默认缓存时间 5 秒
}
