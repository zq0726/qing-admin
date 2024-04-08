<script setup lang="ts">
const emits = defineEmits(['changeSize'])
</script>

<template>
  <div class="setting-box">
    <div class="card-left"><slot /></div>
    <ul class="card-right">
      <li class="setting-item flex-c">
        <el-tooltip class="box-item" effect="dark" content="刷新" placement="top">
          <el-icon><RefreshRight /></el-icon>
        </el-tooltip>
      </li>
      <li class="setting-item flex-c">
        <el-dropdown @command="(command: string) => emits('changeSize', command)">
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
          <el-icon><Tools /></el-icon>
        </el-tooltip>
      </li>
      <li class="setting-item flex-c">
        <el-tooltip class="box-item" effect="dark" content="全屏" placement="top">
          <i class="iconfont icon-quanping"></i>
        </el-tooltip>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.setting-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3px;
  width: 100%;
  height: 35px;
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
