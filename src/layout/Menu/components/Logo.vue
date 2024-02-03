<script setup lang="ts">
import { useDesignSettingStore } from '@/stores/modules/designSetting'
import { storeToRefs } from 'pinia'
import { uiConfig } from '@/settings/constant'

const { themeConfig } = storeToRefs(useDesignSettingStore())
</script>

<template>
  <div class="logo" :style="{ height: uiConfig.headerHeight }">
    <h1>
      <img src="@/assets/qing.svg" alt="logo" />
      <span v-if="!themeConfig.isCollapse">{{ uiConfig.title }}</span>
    </h1>
  </div>
</template>

<style scoped lang="scss">
.logo {
  padding: 0 var(--el-menu-base-level-padding);
  h1 {
    display: flex;
    align-items: center;
    overflow-x: hidden;
    text-wrap: nowrap;
    height: 100%;
    img {
      width: 25px;
      height: 25px;
    }
  }
}
</style>
