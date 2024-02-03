<script setup lang="ts">
import type { LanguageEnum } from '@/enums/config'
import { languageConfig } from '@/settings/constant'
import { useI18n } from 'vue-i18n'
import { useDesignSettingStore } from '@/stores/modules/designSetting'

const { setLanguage } = useDesignSettingStore()

const { locale } = useI18n()
const changeLanguage = (value: LanguageEnum) => {
  locale.value = value
  setLanguage(value)
}
</script>

<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <i class="iconfont icon-a-zhongyingwenyingwen"></i>
    </span>
    <template #dropdown>
      <el-dropdown-menu tabindex="0">
        <el-dropdown-item
          @click="changeLanguage(item.value)"
          v-for="item in languageConfig"
          :key="item.value"
          >{{ item.type }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
.el-dropdown-link {
  outline: none;
}
</style>
