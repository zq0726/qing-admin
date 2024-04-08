<script setup lang="ts">
import { triggerRef } from 'vue'
import { defineAsyncComponent, Ref, shallowRef } from 'vue'

type Obj = {
  name: string
}

let message: Ref<Obj> = shallowRef({
  name: 'hello'
})

const changeName = () => {
  message.value.name = 'word'
  console.log('message', message.value.name)

  triggerRef(message)

  // message.value = {
  //   name: 'word'
  // }
}

const child = defineAsyncComponent(() => import('./components/Child.vue'))
</script>

<template>
  <div>{{ message.name }}</div>
  <el-button @click="changeName">改变名字44</el-button>

  <component :is="child" />
</template>

<style scoped lang="scss"></style>
