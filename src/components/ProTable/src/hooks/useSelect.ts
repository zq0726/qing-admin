import { computed, getCurrentInstance, reactive, toRefs } from 'vue'

export const useSelect = (key: string) => {
  const state = reactive({
    selectionRow: []
  })

  const instance = getCurrentInstance()

  /**
   * 选中行的key
   */
  const selectionKeys = computed(() => {
    const selectRowKey = new Set()
    for (const item of state.selectionRow) {
      selectRowKey.add(item[key])
    }

    return Array.from(selectRowKey)
  })

  /**
   * 设置选中的值
   * @param val
   */
  const selectionChange = (val: any) => {
    state.selectionRow = val
  }

  /**
   * 清除选中的值
   */
  const clearSelection = () => {
    //@ts-ignore
    instance?.refs?.tableRef?.clearSelection()
  }

  return {
    ...toRefs(state),
    selectionKeys,
    selectionChange,
    clearSelection
  }
}
