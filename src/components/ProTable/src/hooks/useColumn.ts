export const useColumn = () => {
  /**
   * 进行排序
   */
  const columnSort = (columnList: any, sortList: any) => {
    return sortList.map((item: string) => columnList.find((prop: any) => prop.prop === item))
  }

  /**
   * 筛选显示的
   */
  const columnShow = (columnList: any, showList: any) => {
    for (let i = 0; i < columnList.length; i++) {
      if (showList.includes(columnList[i].prop)) {
        columnList[i].isShow = true
      } else {
        columnList[i].isShow = false
      }
    }
  }

  /**
   * 设置
   */
  const columnFixed = (columnList: any, fixedColumns: any) => {
    for (let i = 0; i < columnList.length; i++) {
      const findInfo = fixedColumns.find((item: any) => item.key === columnList[i].prop)
      if (findInfo) {
        columnList[i].fixed = findInfo.fixed
      } else {
        if (columnList[i].fixed) {
          delete columnList[i].fixed
        }
      }
    }
  }

  /**
   * 显示序号
   * @param columnList
   * @param showIndex
   */
  const columnIndex = (columnList: any, showIndex: boolean) => {
    console.log('showIndex', showIndex)
    if (showIndex) {
      console.log('showIndex', showIndex)
      columnList.unshift({
        type: 'index',
        label: '序号',
        width: '80',
        isShow: true
      })
    }
  }

  return {
    columnSort,
    columnShow,
    columnFixed,
    columnIndex
  }
}
