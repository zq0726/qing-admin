<script setup lang="ts">
interface PropsType {
  type?: string
}

const props = withDefaults(defineProps<PropsType>(), {
  type: 'primary'
})
</script>

<template>
  <el-button v-bind="$attrs" :type="props.type">
    <slot />
  </el-button>
</template>

<style scoped lang="scss"></style>
