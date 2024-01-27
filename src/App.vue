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

<style lang="scss"></style>
