import axios from 'axios'
import type { CancelToken, CancelTokenSource } from 'axios'
import { logCancel } from './logger'

/**
 * 取消令牌源映射表
 * 使用 Map 存储取消令牌源，key 为 "method-url" 格式，value 为 CancelTokenSource
 */
const cancelTokenSources = new Map<string, CancelTokenSource>()

/**
 * 生成缓存键
 * @param url - 请求 URL
 * @param method - 请求方法
 * @returns 格式化后的键字符串
 */
const generateKey = (url: string, method: string): string => {
  return `${method}-${url}`
}

/**
 * 创建取消令牌
 * 如果存在相同的未完成请求，会先取消该请求，然后创建新的取消令牌
 * @param url - 请求 URL
 * @param method - 请求方法
 * @returns 取消令牌
 */
export const createCancelToken = (url: string, method: string): CancelToken => {
  // 生成缓存键
  const key = generateKey(url, method)

  // 检查是否存在相同的未完成请求
  const existingSource = cancelTokenSources.get(key)
  if (existingSource) {
    // 如果存在，取消该请求
    existingSource.cancel('重复请求已取消')
    // 记录取消日志
    logCancel(url, method)
  }

  // 创建新的取消令牌源
  const source = axios.CancelToken.source()
  // 将取消令牌源存入映射表
  cancelTokenSources.set(key, source)

  // 返回取消令牌
  return source.token
}

/**
 * 取消特定请求
 * @param url - 请求 URL
 * @param method - 请求方法
 */
export const cancelRequest = (url: string, method: string): void => {
  // 生成缓存键
  const key = generateKey(url, method)
  // 获取取消令牌源
  const source = cancelTokenSources.get(key)
  if (source) {
    // 如果存在，取消请求
    source.cancel('请求已取消')
    // 从映射表中删除该取消令牌源
    cancelTokenSources.delete(key)
    // 记录取消日志
    logCancel(url, method)
  }
}

/**
 * 取消所有请求
 * 用于页面卸载或用户登出时取消所有未完成的请求
 */
export const cancelAllRequests = (): void => {
  // 遍历所有取消令牌源
  cancelTokenSources.forEach((source, key) => {
    // 取消请求
    source.cancel('所有请求已取消')
    // 解析请求方法和 URL
    const parts = key.split('-')
    const method = parts[0] || ''
    const url = parts.slice(1).join('-') || ''
    // 如果 URL 存在，记录取消日志
    if (url) {
      logCancel(url, method)
    }
  })
  // 清空映射表
  cancelTokenSources.clear()
}

/**
 * 移除取消令牌
 * 请求完成后调用，清理取消令牌源
 * @param url - 请求 URL
 * @param method - 请求方法
 */
export const removeCancelToken = (url: string, method: string): void => {
  // 生成缓存键并从映射表中删除
  const key = generateKey(url, method)
  cancelTokenSources.delete(key)
}
