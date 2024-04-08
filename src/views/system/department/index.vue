<script setup lang="ts">
import TestDrawer from './components/TestDrawer.vue'
import { useDrawer } from '@/components/Drawer'

const [register, { openDrawer, closeDrawer }] = useDrawer()

const open = () => {
  openDrawer({ name: 'hello' })
}
</script>

<template>
  <div>
    <div>部门</div>
  </div>

  <TestDrawer @register="register" />
  <el-button @click="open">打开drawer</el-button>
  <el-button @click="closeDrawer">关闭drawer</el-button>

  <div class="test-box"></div>
</template>

<style scoped lang="scss">
.test-box {
  width: 100%;
  height: 200vh;
  background-color: yellow;
}
</style>
