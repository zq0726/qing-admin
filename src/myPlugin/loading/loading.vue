<template>
  <div v-if="loading" class="loading">Loading</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)

const show = () => {
  loading.value = true
  console.log('show方法执行了')
}

const hide = () => {
  loading.value = false
  console.log('hide方法执行了')
}

defineExpose({
  show,
  hide
})
</script>

<style scoped lang="scss">
.loading {
  position: fixed;
  top: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-size: 30px;
  color: white;
  background-color: grey;
  opacity: 0.5;
}
</style>
