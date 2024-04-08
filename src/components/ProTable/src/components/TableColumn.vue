<script setup lang="tsx" name="TableColumn">
import { useSlots } from 'vue'
import type { ColumnProps, RenderScope } from '../types/interface'
defineProps<{ column: ColumnProps }>()

const slots = useSlots()

const renderCellData = (item: ColumnProps, scope: any) => {
  return scope.row[item.prop as string]
}

const RenderTableColumn = (item: ColumnProps) => {
  return (
    <>
      {item.isShow && (
        <el-table-column {...item} sortable={item.sortCustom} align={item.align ?? 'center'}>
          {{
            default: (scope: RenderScope<any>) => {
              if (item.render) return item.render(scope)
              if (item.slot) {
                return slots[item.slot]!({ item, scope })
              }
              renderCellData(item, scope)
            }
          }}
        </el-table-column>
      )}
    </>
  )
}
</script>

<template>
  <RenderTableColumn v-bind="column" />
</template>
<style scoped lang="scss"></style>
