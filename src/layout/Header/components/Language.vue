<script setup lang="ts">
import type { LanguageEnum } from '@/enums/config'
import { languageConfig } from '@/settings/constant'
import { useI18n } from 'vue-i18n'
import { useDesignSettingStore } from '@/stores/modules/designSetting'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

const { setLanguage } = useDesignSettingStore()
const { language } = storeToRefs(useDesignSettingStore())

const { locale } = useI18n()
const changeLanguage = (value: LanguageEnum) => {
  locale.value = value
  setLanguage(value)
}
</script>

<template>
  <el-dropdown :teleported="false" @command="changeLanguage">
    <span class="el-dropdown-link">
      <i class="iconfont icon-a-zhongyingwenyingwen"></i>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          @click="changeLanguage(item.value)"
          v-for="item in languageConfig"
          :key="item.value"
          :command="item.value"
          :isSelect="item.value === language ? 'true' : 'false'"
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
:deep(.el-dropdown-menu__item[isSelect='true']) {
  color: white;
  background-color: var(--el-color-primary);
}
:deep(.el-dropdown-menu__item) {
  justify-content: center;
}
</style>
