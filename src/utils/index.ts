import { unref } from 'vue'
import { isObject } from './is'
import { uiConfig } from '@/settings/constant'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

/**
 * 深层复制
 * @param src
 * @param target
 * @returns
 */
export const deepMerge = <T = any>(src: any = {}, target: any = {}): T => {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

// dynamic use hook props
export const getDynamicProps = <T extends {}, U>(props: T): Partial<U> => {
  const ret: Recordable = {}

  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key])
  })

  return ret as Partial<U>
}

/**
 * 设置缓存的名字
 */
export const getCancleName = (route: RouteLocationNormalizedLoaded): string => {
  let cancleName = uiConfig.title.replace(/\s+/, '_').toLocaleUpperCase()

  const routeList = route.fullPath.split('/')
  for (const item of routeList) {
    if (item) {
      cancleName += '_' + item.toLocaleUpperCase()
    }
  }
  return cancleName
}
