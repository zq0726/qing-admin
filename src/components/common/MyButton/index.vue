<script setup lang="ts">
import  {  useAttrs } from 'vue';
const $attrs = useAttrs()

console.log('$attrs',$attrs)

</script>

<template>
  <div>
    <el-button v-bind="$attrs" >
        <slot />
    </el-button>

  </div>
</template>

<style scoped lang="scss">
</style>