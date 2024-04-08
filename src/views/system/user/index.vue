<script setup lang="ts">
import { reactive } from 'vue'
import { ProTable } from '@/components/ProTable'
import { columns, searchList } from './data'

const dataInfo = reactive([
  {
    username: '小王',
    sex: '男',
    hobby: 'play computer game',
    id: 1,
    age: 2
  },
  {
    username: '小红',
    sex: '女',
    hobby: 'play basketball',
    id: 2,
    age: 3
  },
  {
    username: '小红',
    sex: '女',
    hobby: 'play basketball',
    id: 3,
    age: 3
  },
  {
    username: '小红',
    sex: '女',
    hobby: 'play basketball',
    id: 4,
    age: 3
  },
  {
    username: '小红',
    sex: '女',
    hobby: 'play basketball',
    id: 5,
    age: 3
  },
  {
    username: '小红',
    sex: '女',
    hobby: 'play basketball',
    id: 6,
    age: 3
  },
  {
    username: '小红',
    sex: '女',
    hobby: 'play basketball',
    id: 7,
    age: 3
  },
  {
    username: '小红',
    sex: '女',
    hobby: 'play basketball',
    id: 8,
    age: 3
  }
])

/**
 * 修改行样式
 * @param param0
 */
const setRowClass = ({ row }: any) => {
  if (row.id === 1) {
    return 'danger-row'
  }
}
</script>

<template>
  <div>
    <ProTable
      :row-class-name="setRowClass"
      :columns="columns"
      :border="true"
      :stripe="true"
      :data="dataInfo"
      :show-overflow-tooltip="true"
      :immediate="true"
      :tableSearch="searchList"
      rowKey="id"
    >
      <template #table-method>
        <el-button type="primary">新增</el-button>
        <el-button type="primary">修改</el-button>
        <el-button type="primary">导入</el-button>
        <el-button type="primary">导出</el-button>
      </template>
      <template #sex1="{ item, scope }">{{ scope.row[item.prop] }}</template>
    </ProTable>
  </div>
</template>

<style scoped lang="scss"></style>
