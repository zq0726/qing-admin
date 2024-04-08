import type { ColumnProps } from '@/components/ProTable/src/types/interface'
import { render } from '@/utils/commom/renderUtils'

export const columns: ColumnProps[] = [
  {
    type: 'selection',
    fixed: 'left',
    width: '50px',
    selectable: (row, index) => {
      if (row.id === 1) return false
      else return true
    }
  },
  {
    type: 'radio',
    fixed: 'left',
    width: '50px'
  },
  {
    prop: 'username',
    label: '用户姓名',
    align: 'center',
    fixed: 'left'
  },
  {
    prop: 'sex',
    label: '用户性别',
    align: 'center',
    slot: 'sex1'
  },
  {
    prop: 'age',
    label: '年龄',
    align: 'center',
    sortCustom: 'coustom'
  },
  {
    prop: 'hobby',
    label: '爱好',
    align: 'center',
    render: (scope) => {
      return render.renderTag(scope.row.hobby, 'green')
    }
  },
  {
    prop: 'avatar',
    label: '头像',
    align: 'center',
    render: (scope) => {
      return render.renderImage(
        'https://img1.baidu.com/it/u=3233541672,3148331937&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
      )
    }
  }
]
