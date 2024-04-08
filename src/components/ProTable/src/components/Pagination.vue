<script setup lang="ts">
import { ref } from 'vue'
import { paginationConfig } from '@/settings/constant'
import { reactive } from 'vue'

interface PropsType {
  selectionRow: any[]
  pagination?: any
}
const props = defineProps<PropsType>()

const background = ref(true)
const pagination = reactive({ ...paginationConfig, ...(props?.pagination ?? {}) })
const total = ref(100)

const handleSizeChange = (val: number) => {
  console.log(`每页显示的数量：${val}`)
}
const handleCurrentChange = (val: number) => {
  console.log(`当前页: ${val}`)
}

defineExpose({ pagination })
</script>

<template>
  <div class="table-info">
    <div>
      <span v-if="selectionRow.length > 0">已选择：{{ selectionRow.length }}条</span>
    </div>
    <el-pagination
      v-model:current-page="pagination.currentPage"
      v-model:page-size="pagination.pageSize"
      :page-sizes="pagination.pageSizes"
      :background="background"
      layout="total,prev, pager, next, sizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped lang="scss">
.table-info {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}
</style>
