<script setup lang="ts">
import { reactive } from 'vue'
import { onMounted, useAttrs, ref } from 'vue'
import TableSetting from './components/TableSetting.vue'

interface PropsType {
  columns: any
}

const props = defineProps<PropsType>()
const attrs = useAttrs()
const tableBox = ref()

const pageSize = ref(100)
const small = ref(false)
const currentPage4 = ref(1)

const tableData = reactive([
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  },
  {
    userCode: '12',
    account: '1',
    password: '1'
  }
])

const showColumns = reactive({ ...props.columns })
const tableSize = ref('default')
onMounted(() => {
  console.log('attrs', attrs)
})
</script>

<template>
  <el-card>
    <TableSetting @changeSize="(size: string) => (tableSize = size)">
      <slot name="action" />
    </TableSetting>
    <div class="select-info"></div>
    <el-table
      style="width: 100%"
      :loading="true"
      :size="tableSize"
      ref="tableBox"
      :data="tableData"
      v-bind="attrs"
    >
      <template v-for="item in showColumns" :key="item.field">
        <el-table-column
          :prop="item.field"
          :label="item.title"
          :show-overflow-tooltip="true"
          :resizable="true"
          :width="item.width"
          :align="item.align || 'left'"
          #default="scope"
        >
          <slot :name="item.field" :row="scope.row">
            <!-- {{ scope.row[item.field] }} -->
            {{ scope.render ? scope.render() : scope.row[item.field] }}
          </slot>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      style="margin-top: 5px"
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize"
      :page-sizes="[100, 200, 300, 400]"
      :small="small"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      background
    />
  </el-card>
</template>

<style scoped lang="scss">
.select-info {
  display: flex;
  margin-bottom: 5px;
  height: 40px;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  background-color: var(--el-bg-color-page);
}
</style>
