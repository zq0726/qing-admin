import { getCurrentInstance, nextTick, ref, unref, watchEffect } from 'vue'
import type { UseDrawerReturnType, ReturnMethods, useDrawerInnerReturnType } from '../typing'

type Fn = (data: any) => void

const openData = ref<any>({})

export const useDrawer = (): UseDrawerReturnType => {
  const drawer = ref()
  const register = (drawerInstance: ReturnMethods) => {
    drawer.value = drawerInstance
  }

  const getInstance = () => {
    const instance = unref(drawer)
    if (!instance) {
      ElMessage.error('useDrawer instance is undefined!')
    }
    return instance
  }

  const methods: ReturnMethods = {
    openDrawer: (data: any) => {
      openData.value = data
      getInstance().openDrawer(data)
    },
    closeDrawer: () => {
      getInstance().closeDrawer()
    }
  }

  return [register, methods]
}

export const useDrawerInner = (callbackFn?: Fn): useDrawerInnerReturnType => {
  const currentInstance = getCurrentInstance()
  const drawerInner = ref()

  const register = (methods: ReturnMethods) => {
    drawerInner.value = methods
    currentInstance?.emit('register', methods)
  }

  const methods: ReturnMethods = {
    closeDrawer: () => {
      drawerInner.value.closeDrawer()
    },
    openDrawer: () => {
      drawerInner.value.closeDrawer()
    }
  }

  watchEffect(() => {
    const data = unref(openData)
    if (!callbackFn || data === undefined) return
    nextTick(() => {
      callbackFn(data)
    })
  })

  return [register, methods]
}
