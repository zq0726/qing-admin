import { onMounted, reactive, toRefs } from 'vue'

interface TableOption {
  tableSearch?: { [key: string]: any } | {}
  api?: (...arg: any) => Promise<any>
  immediate?: boolean
  data?: any
}

export const useTable = (tableOption: TableOption) => {
  const state = reactive({
    tableSearch: {},
    radio: '',
    data: [],
    tableSize: 'default',
    loadingSetting: {},
    ...tableOption
  })

  /**
   * 表单排序
   */
  const sortChange = (row: any) => {
    const sort = {
      prop: row.prop,
      order: row.order
    }

    state.tableSearch = { ...state.tableSearch, ...sort }
    console.log('排序', sort)
  }

  /**
   * 设置表单大小
   */
  const setSize = (type: string) => {
    state.tableSize = type
  }

  onMounted(() => {
    if (state.immediate) {
      console.log('准备请求数据')
    }
  })

  return {
    ...toRefs(state),
    sortChange,
    setSize
  }
}
