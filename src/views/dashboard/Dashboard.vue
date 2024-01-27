<script setup lang="ts">
import { useDesignSettingStore } from '@/stores/modules/designSetting'
import { ref } from 'vue'
import { comSizeConfig } from '@/settings/constant'
import { SizeEnum } from '@/enums/config'

const { setSize } = useDesignSettingStore()

const value = ref(null)
const changeSize = (info: SizeEnum) => {
  setSize(info)
}

const test = () => {
  ElMessage.success('Successfully sent ！')
}
</script>

<template>
  <el-select v-model="value" style="width: 240px" @change="changeSize">
    <el-option
      v-for="item in comSizeConfig"
      :key="item.value"
      :label="item.type"
      :value="item.value"
    />
  </el-select>

  <div class="p-4">
    <el-button type="primary" @click="test">测试</el-button>
  </div>
</template>

<style scoped lang="scss">
/* 添加具体的样式规则 */
</style>
