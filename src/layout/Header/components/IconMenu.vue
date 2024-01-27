<script setup lang="ts"></script>

<template>
  <ul class="icon-list">
    <li>
      <el-tooltip class="box-item" effect="dark" content="搜索" placement="bottom">
        <el-icon><Search /></el-icon>
      </el-tooltip>
    </li>
    <li>
      <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom">
        <el-icon><FullScreen /></el-icon>
      </el-tooltip>
    </li>
    <li>
      <el-tooltip class="box-item" effect="dark" content="设置" placement="bottom">
        <el-icon><Setting /></el-icon>
      </el-tooltip>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.icon-list {
  display: flex;
  align-items: center;
  li {
    margin-right: 20px;
  }
}
</style>
