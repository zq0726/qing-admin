<script setup lang="ts">
import { onMounted, useAttrs, ref } from 'vue'

const attr: any = useAttrs()
const option = ref()

onMounted(async () => {
  if (attr.render && typeof attr.render === 'function') {
    option.value = await attr.render()
  } else {
    option.value = attr.option
  }
})
</script>

<template>
  <el-select v-bind="$attrs" placeholder="Select" style="width: 240px">
    <el-option
      v-for="item in option"
      :key="item[attr['labelName'] || 'label']"
      :label="item[attr['labelName'] || 'label']"
      :value="item[attr['valueName'] || 'value']"
    />
  </el-select>
</template>

<style scoped lang="scss"></style>
