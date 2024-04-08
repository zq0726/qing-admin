import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue'

export const useTableSetting = () => {
  const state = reactive({
    tableSize: 'default'
  })
  const instance = getCurrentInstance()

  const changeSize = (info: string) => {
    state.tableSize = info
  }

  onMounted(() => {
    console.log('instance', instance)
  })

  return {
    ...toRefs(state),
    changeSize
  }
}
