import type { CacheItem } from './types'

/**
 * 内存缓存映射表
 * 使用 Map 存储缓存数据，key 为缓存键，value 为缓存项
 */
const cacheMap = new Map<string, CacheItem<unknown>>()

/**
 * 获取缓存数据
 * @template T - 缓存数据类型
 * @param key - 缓存键
 * @param cacheTime - 缓存有效期（毫秒），超过此时间则返回 null
 * @returns 缓存数据，如果不存在或已过期则返回 null
 */
export const getCache = <T = unknown>(key: string, cacheTime?: number): T | null => {
  // 从缓存映射表中获取缓存项
  const cached = cacheMap.get(key)

  // 如果缓存不存在，返回 null
  if (!cached) return null

  // 如果设置了缓存时间且已过期，删除缓存并返回 null
  if (cacheTime && Date.now() - cached.timestamp > cacheTime) {
    cacheMap.delete(key)
    return null
  }

  // 返回缓存数据
  return cached.data as T
}

/**
 * 设置缓存数据
 * @template T - 缓存数据类型
 * @param key - 缓存键
 * @param data - 要缓存的数据
 */
export const setCache = <T = unknown>(key: string, data: T): void => {
  // 将数据存入缓存映射表，同时记录当前时间戳
  cacheMap.set(key, { data, timestamp: Date.now() })
}

/**
 * 清除缓存
 * @param key - 可选，要清除的缓存键。如果不传则清除所有缓存
 */
export const clearCache = (key?: string): void => {
  if (key) {
    // 如果指定了键，只清除该键对应的缓存
    cacheMap.delete(key)
  } else {
    // 如果未指定键，清除所有缓存
    cacheMap.clear()
  }
}

/**
 * 检查缓存是否存在
 * @param key - 缓存键
 * @returns 如果缓存存在返回 true，否则返回 false
 */
export const hasCache = (key: string): boolean => {
  return cacheMap.has(key)
}
