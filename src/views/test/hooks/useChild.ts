import { ref, watch } from 'vue'

interface MethodsType {
  open: () => void
  close: () => void
  stepProps?: (data: any) => void
}

type ReturnInfo = [register: (methods: MethodsType) => void, methods: MethodsType]

export const useChild = (data?: any): ReturnInfo => {
  const instanceMethods = ref()
  /**
   * 注册表单
   */
  const register = (methods: MethodsType) => {
    instanceMethods.value = methods
    console.log('注册子组件', instanceMethods.value)

    watch(
      () => data,
      () => {
        console.log('呵呵', data, instanceMethods.value)
        if (instanceMethods.value.setProps) {
          instanceMethods.value.setProps(data)
        }
      },
      {
        immediate: true,
        deep: true
      }
    )
  }

  watch(
    () => instanceMethods,
    () => {
      console.log('测试')
    }
  )

  const methods: MethodsType = {
    open: () => {
      instanceMethods.value?.open()
    },
    close: () => {
      instanceMethods.value?.close()
    }
  }

  return [register, methods]
}
