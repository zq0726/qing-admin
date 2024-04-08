<script setup lang="ts">
import { computed, getCurrentInstance, ref, useAttrs, useSlots } from 'vue'

const instance = getCurrentInstance()

const attrs = useAttrs()
const settingProps = ref({})

const slots = useSlots()

const stepPropsInfo = (data: any) => {
  console.log('data', data)
  settingProps.value = data
}

const methods = {
  open: () => {
    console.log('open')
  },
  close: () => {
    console.log('close')
  },
  setProps: (data: any) => {
    console.log('设置参数', 88888)
    stepPropsInfo(data)
  }
}

if (instance) {
  instance.emit('register', methods)
}

const getBind = computed(() => {
  console.log(333333333, settingProps)
  return {
    ...attrs,
    ...settingProps.value
  }
})
</script>

<template>
  <div>我是子组件</div>

  <el-button v-bind="getBind">
    <template v-for="(_, name) in $slots" v-slot:[name]>
      <slot :name="name"></slot>
    </template>
  </el-button>

  <div>222222---{{ getBind }}</div>
  <hr />
</template>

<style scoped lang="scss"></style>
