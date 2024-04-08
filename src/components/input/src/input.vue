<script setup lang="ts">
import { useAttrs } from 'vue'
import { ref, onMounted, getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const refInput = ref()
const attrs = useAttrs()

onMounted(() => {
  console.log('我是子组件 mounted')
  const entries = Object.entries(refInput.value.$.exposed)
  if (instance && instance.exposed) {
    for (const [key, value] of entries) {
      instance.exposed[key] = value
    }
  }
})
</script>

<template>
  <div>
    <el-input v-bind="attrs" ref="refInput">
      <template v-for="(_value, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}" />
      </template>
    </el-input>
  </div>
</template>

<style scoped lang="scss"></style>
