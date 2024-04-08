import { render } from '@/utils/commom/renderUtils'
import type { ColumnProps, SearchType } from '@/components/ProTable/src/types/interface'

import { getCountry } from './api'
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

/**
 * 表单搜索
 */
export const searchList: SearchType[] = [
  {
    label: '姓名:',
    type: 'input',
    field: 'name',
    placeholder: '请输入姓名'
  },
  {
    label: '姓名:',
    type: 'input',
    field: 'name',
    placeholder: '请输入姓名'
  },
  {
    label: '年龄:',
    type: 'input-number',
    field: 'age',
    placeholder: '请输入年龄'
  },

  {
    label: '国家：',
    type: 'select',
    field: 'country',
    placeholder: '请选择国家',
    render: async () => {
      const { data }: any = await getCountry()
      return data
    },
    labelName: 'labelName',
    valueName: 'valueName'
  },
  {
    label: '国家1：',
    type: 'select',
    field: 'country1',
    placeholder: '请选择国家',
    option: [
      {
        labelName: '中国',
        valueName: 'China'
      },
      {
        labelName: '日本',
        valueName: 'japanese'
      }
    ],
    labelName: 'labelName',
    valueName: 'valueName'
  }
]
