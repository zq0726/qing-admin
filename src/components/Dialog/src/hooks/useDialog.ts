import { tryOnUnmounted } from '@vueuse/core'
import { getCurrentInstance, ref, unref, watch } from 'vue'

import type { DialogMethods, UseDialogReturnType } from '../type'
import { isProdMode } from '@/utils/env'
import { getDynamicProps } from '@/utils'

export const useDialog = (props?: any): UseDialogReturnType => {
  const dialogRef = ref<Nullable<DialogMethods>>(null)
  const currentInstance = getCurrentInstance()

  const getInstance = () => {
    const instance = unref(dialogRef.value)
    if (!instance) {
      console.error('useModal instance is undefined!')
    }
    return instance
  }

  /**
   * 注册
   * @param modalInstance
   */
  const register = (dialogInstance: DialogMethods) => {
    isProdMode() &&
      tryOnUnmounted(() => {
        dialogRef.value = null
      })
    dialogRef.value = dialogInstance
    currentInstance?.emit('register', dialogInstance)

    watch(
      () => props,
      () => {
        props && dialogInstance.setProps(getDynamicProps(props))
      },
      {
        immediate: true,
        deep: true
      }
    )
  }

  const methods: DialogMethods = {
    setProps: (props: any): void => {
      getInstance()?.setProps(props)
    },
    openDialog: () => {
      getInstance()?.openDialog()
    },
    closeDialog: () => {
      getInstance()?.closeDialog()
    }
  }

  return [register, methods]
}
