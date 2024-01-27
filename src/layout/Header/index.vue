<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { CollapseIcon, Breadcrumb, IconMenu } from './components'
import { useDesignSettingStore } from '@/stores/modules/designSetting'

const { themeConfig } = storeToRefs(useDesignSettingStore())
</script>

<template>
  <div class="header">
    <div class="header-left">
      <CollapseIcon />
      <Breadcrumb v-if="themeConfig.showBreadcrumb" />
    </div>

    <div class="header-right">
      <IconMenu />
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  &-left {
    display: flex;
    align-items: center;
  }
  &-right {
    display: flex;
    align-items: center;
  }
}
</style>
