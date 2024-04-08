<script setup lang="ts">
import { reactive, ref, useAttrs, unref, provide, onMounted } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { useTable } from './hooks/useTable'
import { useSelect } from './hooks/useSelect'
import { useDrawer } from '@/components/Drawer'
import { useRoute } from 'vue-router'
import { useColumn } from './hooks/useColumn'

import TableColumn from './components/TableColumn.vue'
import TableSetting from './components/TableSetting.vue'
import ColumnSetting from './components/ColumnSetting.vue'
import Pagination from './components/Pagination.vue'
import TeableSearch from './components/TableSearch.vue'

import type { ColumnProps, TypeProps } from './types/interface'
import { getCancleName } from '@/utils'
import dayjs from 'dayjs'

interface ProTableProps {
  columns: ColumnProps[] // 列配置项  ==> 必传
  data?: any[]
  pagination?: boolean
  api?: (...arg: any) => Promise<any>
  immediate?: boolean
  tableSearch?: any[]
}

const route = useRoute()
const props = withDefaults(defineProps<ProTableProps>(), {
  pagination: true // 默认显示分页
})

const { columnSort, columnShow, columnFixed, columnIndex } = useColumn()

const tableBox = ref<HTMLElement | null>(null)
const showIndex = ref(false)

/**
 * 获取表单的column
 */
const getColumns = () => {
  const cacheName = getCancleName(route)
  const localColumn = localStorage.getItem(cacheName)

  const usePropsInfo = () => {
    const list = props.columns
    for (const item of list) {
      if (item.isShow !== false) {
        item.isShow = true
      }
    }
    return list
  }

  if (localColumn) {
    const nowTime = dayjs().valueOf()
    const cancleInfo = JSON.parse(localColumn)

    if (nowTime - cancleInfo.expire > 0) {
      console.log('清理缓存')
      localStorage.removeItem(cacheName)

      return usePropsInfo()
    }

    const typeList = props.columns.filter((item) => item.type)
    const info = columnSort(props.columns, cancleInfo.value.sortedList)
    let columnList = [...typeList, ...info]
    columnShow(columnList, cancleInfo.value.checkedList)
    columnFixed(columnList, cancleInfo.value.fixedColumns)
    columnIndex(columnList, cancleInfo.value.checkIndex)

    showIndex.value = cancleInfo.value.checkIndex
    return columnList
  } else {
    return usePropsInfo()
  }
}

// 接收 columns 并设置为响应式
const tableColumns = reactive<ColumnProps[]>(getColumns())

const attr = useAttrs()
const rowKey = ref(attr.rowKey || 'id')
const columnTypes: TypeProps[] = ['selection', 'radio', 'index']
const tableRef = ref<HTMLElement | null>(null)
const loading = ref(true)

const { radio, data, tableSize, sortChange, setSize } = useTable({
  api: props.api,
  immediate: props.immediate,
  data: props.data
})

/**
 * 刷新表单
 */
const reloadTable = () => {
  console.log('刷新表单')
}

/**
 * 是否显示 index
 * @param type
 */
const changeIndex = (type: boolean) => {
  if (type) {
    tableColumns.unshift({
      type: 'index',
      label: '序号',
      width: '80',
      fixed: 'left'
    })
  } else {
    const indexNum = tableColumns.findIndex((item) => item.type === 'index')
    if (indexNum !== -1) {
      tableColumns.splice(indexNum, 1)
    }
  }
}

const { isFullscreen, toggle } = useFullscreen(tableBox)
provide('changeSize', setSize) //设置表单大小
provide('changeFull', { status: isFullscreen, toggle: toggle })

const { selectionRow, selectionKeys, selectionChange, clearSelection } = useSelect(
  unref(rowKey) as string
)

const [register, { openDrawer }] = useDrawer()

defineExpose({
  selectionRow,
  selectionKeys,
  clearSelection
})

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 2000)
})
</script>

<template>
  <div class="table-box" ref="tableBox">
    <TeableSearch
      v-if="props.tableSearch && props.tableSearch.length > 0"
      :tableSearch="props.tableSearch"
    />

    <el-card
      class="box-card"
      v-loading="loading"
      element-loading-text="加载中"
      element-loading-background="rgba(122, 122, 122, 0.8)"
    >
      <div>
        <TableSetting
          :tableColumns="tableColumns"
          @reload-table="reloadTable"
          @showColumnDrawer="openDrawer"
        >
          <slot name="table-method" />
        </TableSetting>

        <el-table
          :data="data"
          v-bind="$attrs"
          :rowKey="rowKey"
          :size="tableSize"
          @sort-change="sortChange"
          @selection-change="selectionChange"
          ref="tableRef"
        >
          <template v-for="item in tableColumns" :key="item">
            <!-- selection || radio || index || expand || sort -->
            <el-table-column
              v-if="item.type && columnTypes.includes(item.type)"
              v-bind="item"
              :align="item.align ?? 'center'"
              :reserve-selection="item.type == 'selection'"
            >
              <template #default="scope">
                <el-radio
                  fixed="left"
                  v-if="item.type == 'radio'"
                  :label="scope.row[rowKey as string]"
                  v-model="radio"
                >
                </el-radio>

                <span fixed="left" v-if="item.type == 'index'">{{
                  scope.row[rowKey as string]
                }}</span>
              </template>
            </el-table-column>

            <!-- other -->
            <TableColumn v-if="!item.type && item.prop && item.isShow" :column="item">
              <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                <slot :name="slot" v-bind="scope" />
              </template>
            </TableColumn>
          </template>

          <template #empty>
            <el-empty description="暂无数据" :image-size="50" />
          </template>
        </el-table>

        <Pagination :selectionRow="selectionRow" />
      </div>
    </el-card>

    <column-setting
      @register="register"
      @change-index="changeIndex"
      :showIndex="showIndex"
      v-model:columnList="tableColumns"
    />
  </div>
</template>

<style scoped lang="scss">
:deep(.el-empty__description) {
  height: 30px;
}
:deep(.el-radio__label) {
  display: none;
}
:deep(.danger-row) {
  background-color: var(--el-color-danger) !important;
  td {
    background-color: var(--el-color-danger) !important;
  }
}
:deep(.el-card__body) {
  padding-top: 0;
}
.table-box {
  background-color: var(--el-bg-color-page);
}
</style>
