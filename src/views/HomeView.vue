<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { ElMessage, ElSelect, ElOption, ElDatePicker } from 'element-plus'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useConfigStore } from '../stores/config'
import { useI18n } from 'vue-i18n'
import type { UiSize } from '../settings'
import { getCatInfo } from '../api/test'

const config = useConfigStore()
const { themeColor, themeValue, size, locale } = storeToRefs(config)
const { t } = useI18n()

const dateValue = ref<Date>()

const sizeOptions: { label: string; value: UiSize }[] = [
  { label: t('home.default'), value: 'default' },
  { label: t('home.small'), value: 'small' },
  { label: t('home.large'), value: 'large' },
]

const localeOptions = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
]

const showMessage = () => {
  ElMessage.success(t('home.message'))
}

const getCat = async () => {
  const res = await getCatInfo()
  console.log(`%c猫信息 :${res.name}`, 'color: red')
}
</script>

<template>
  <main>
    <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 20px">
      <el-button type="primary" @click="showMessage">{{ t('home.button') }}</el-button>
      <span style="margin-right: 8px">{{ t('home.color') }}</span>
      <el-input style="width: 50px" type="color" v-model="themeColor"></el-input>

      <el-select v-model="themeValue" style="width: 150px">
        <el-option :label="t('home.auto')" value="auto" />
        <el-option :label="t('home.light')" value="light" />
        <el-option :label="t('home.dark')" value="dark" />
      </el-select>

      <el-select v-model="size" style="width: 120px">
        <el-option
          v-for="item in sizeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select v-model="locale" style="width: 120px">
        <el-option
          v-for="item in localeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-date-picker v-model="dateValue" type="date" style="width: 180px" />
      <div>
        <el-button type="primary" @click="getCat">获取猫信息</el-button>
      </div>
    </div>
    <TheWelcome />
  </main>
</template>
