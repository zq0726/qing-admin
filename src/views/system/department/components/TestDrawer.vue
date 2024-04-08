<script setup lang="ts">
import { BaseDrawer, useDrawerInner } from '@/components/Drawer'

const [register] = useDrawerInner((data) => {
  console.log('data444444', data)
})

/**
 * 提交按钮
 */
const handleSubmit = () => {
  console.log('点我干嘛')
}
</script>

<template>
  <BaseDrawer
    @register="register"
    @submit="handleSubmit"
    size="30%"
    title="測試抽屉"
    :show-footer="true"
  >
    <div>你好</div>
  </BaseDrawer>
</template>

<style scoped lang="scss">
.drawer-content {
  height: 120vh;
}
</style>
