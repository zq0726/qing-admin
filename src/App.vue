<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

import { useDesignSettingStore } from '@/stores/modules/designSetting'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { language, comSize } = storeToRefs(useDesignSettingStore())

const locale = computed(() => {
  if (language.value && language.value === 'zh') {
    return zhCn
  }
  return en
})
</script>

<template>
  <el-config-provider :locale="locale" :size="comSize">
    <router-view />
  </el-config-provider>
</template>

<style lang="scss">
.el-dropdown-menu__item {
  color: #606266;
  &:hover {
    background-color: #e9e9ea;
  }
}
.el-dropdown-menu__item.is-active {
  color: #409eff;
  background-color: #ecf5ff;
}
.el-dropdown-menu__item.is-disabled {
  color: #409eff;
  background-color: #ecf5ff;
}
</style>
