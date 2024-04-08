<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { CollapseIcon, Breadcrumb, IconMenu } from './components'
import { useDesignSettingStore } from '@/stores/modules/designSetting'

const { themeConfig } = storeToRefs(useDesignSettingStore())
</script>

<template>
  <div class="header-box">
    <div class="header-box-left">
      <CollapseIcon />
      <Breadcrumb v-if="themeConfig.showBreadcrumb" />
    </div>

    <div class="header-box-right">
      <IconMenu />
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  border-bottom: 1px solid var(--el-border-color);
  &-left {
    display: flex;
    align-items: center;
    height: 100%;
  }
  &-right {
    display: flex;
    align-items: center;
    height: 100%;
  }
}
</style>
