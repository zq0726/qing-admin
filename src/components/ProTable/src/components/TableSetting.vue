<script setup lang="ts">
import { inject } from 'vue'
import type { ColumnProps } from '../types/interface'

interface PropsType {
  tableColumns: ColumnProps[]
}

defineProps<PropsType>()
const emits = defineEmits(['showColumnDrawer', 'reloadTable'])

const setSize: Function = inject('changeSize')!
const fullInfo:
  | {
      status: string
      toggle: Function
    }
  | undefined = inject('changeFull')

/**
 * 全屏设置
 */
const setFull = () => {
  fullInfo?.toggle()
}

/**
 * 表单重置
 */
const handleReload = () => {
  emits('reloadTable')
}

/**
 * 显示列设置
 */
const showListDrawer = () => {
  emits('showColumnDrawer')
}
</script>

<template>
  <div>
    <div class="setting-box">
      <div class="card-left"><slot /></div>
      <ul class="card-right">
        <li class="setting-item flex-c">
          <el-tooltip class="box-item" effect="dark" content="刷新" placement="top">
            <el-icon @click="handleReload"><RefreshRight /></el-icon>
          </el-tooltip>
        </li>
        <li class="setting-item flex-c">
          <el-dropdown
            @command="
              (command: string) => {
                setSize(command)
              }
            "
          >
            <span class="el-dropdown-link">
              <el-tooltip class="box-item" effect="dark" content="密度" placement="top">
                <i class="iconfont icon-midu"></i>
              </el-tooltip>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="large">宽松</el-dropdown-item>
                <el-dropdown-item command="default">默认</el-dropdown-item>
                <el-dropdown-item command="small">紧凑</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
        <li class="setting-item flex-c">
          <el-tooltip class="box-item" effect="dark" content="列设置" placement="top">
            <el-icon @click="showListDrawer"><Tools /></el-icon>
          </el-tooltip>
        </li>
        <li class="setting-item flex-c">
          <el-tooltip class="box-item" effect="dark" content="全屏" placement="top">
            <i v-if="fullInfo?.status" @click="setFull" class="iconfont icon-quanping"></i>
            <i v-else class="iconfont icon-quanping"></i>
          </el-tooltip>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.setting-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--el-card-padding) 0;
  width: 100%;
  .card-left {
    display: flex;
    align-items: center;
  }
  .card-right {
    display: flex;
    justify-content: center;
    align-items: center;
    .setting-item {
      margin-right: 10px;
      cursor: pointer;
      border-radius: 50%;
    }
  }
}
:deep(.el-dropdown-link) {
  outline: none;
}
</style>
