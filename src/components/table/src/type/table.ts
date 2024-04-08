export interface BasicColumn {
  field: string
  title: string
  align?: 'left' | 'right' | 'center'
  showOverflowTooltip?: Boolean
  type?: 'selection' | 'index'
  formatter?: Function
}
