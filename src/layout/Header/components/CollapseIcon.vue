<script setup lang="ts">
import { useDesignSettingStore } from '@/stores/modules/designSetting'
import { storeToRefs } from 'pinia'

const { themeConfig } = storeToRefs(useDesignSettingStore())
const { changeCollapse } = useDesignSettingStore()
</script>

<template>
  <div class="icon-box">
    <el-icon class="collapse-icon" @click="changeCollapse()">
      <component :is="themeConfig.isCollapse ? 'expand' : 'fold'"></component>
    </el-icon>
  </div>
</template>

<style scoped lang="scss">
.icon-box {
  margin-right: $global-padding;
  height: 100%;
}
</style>
