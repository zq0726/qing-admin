import type { TableColumnCtx } from 'element-plus'
import type { Ref, VNode } from 'vue'

export type RenderScope<T> = {
  row: T
  $index: number
  column: TableColumnCtx<T>
  [key: string]: any
}
export type TypeProps = 'index' | 'selection' | 'radio'

export interface ColumnProps<T = any>
  extends Partial<Omit<TableColumnCtx<T>, 'type' | 'children' | 'renderCell' | 'renderHeader'>> {
  type?: TypeProps // 列类型
  slot?: string
  sortCustom?: string
  isShow?: boolean | Ref<boolean> // 是否显示在表格当中
  render?: (scope: RenderScope<T>) => VNode | string // 自定义单元格内容渲染（tsx语法）
}

export interface SearchType {
  label: string
  type: string
  field: string
  placeholder?: string
  render?: Function
  labelName?: string // 当使用select 时
  valueName?: string // 当使用select 时
  option?: { [key: string]: string }[]
  slot?: string
}
