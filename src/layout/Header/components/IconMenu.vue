<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

const { toggle, isFullscreen } = useFullscreen()
</script>

<template>
  <ul class="icon-list">
    <li>
      <el-tooltip class="box-item" effect="dark" content="搜索" placement="bottom">
        <el-icon><Search /></el-icon>
      </el-tooltip>
    </li>
    <li>
      <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom">
        <span @click="toggle">
          <i v-if="isFullscreen" class="iconfont icon-daping-feiquanping"></i>
          <i v-else class="iconfont icon-quanping"></i>
        </span>
      </el-tooltip>
    </li>
    <li>
      <el-tooltip class="box-item" effect="dark" content="中英文" placement="bottom">
        <i class="iconfont icon-a-zhongyingwenyingwen"></i>
      </el-tooltip>
    </li>
    <li>
      <el-tooltip class="box-item" effect="dark" content="消息" placement="bottom">
        <i class="iconfont icon-xiaoxi"></i>
      </el-tooltip>
    </li>
    <li>
      <el-tooltip class="box-item" effect="dark" content="锁屏" placement="bottom">
        <el-icon><Lock /></el-icon>
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
