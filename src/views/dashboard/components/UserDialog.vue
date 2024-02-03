<script setup lang="ts">
import { BasicDialog, useDialog } from '@/components/Dialog'

const [ register ] = useDialog()

</script>

<template>
  <div>
    <BasicDialog @register="register" />
  </div>
</template>

<style scoped lang="scss">
</style>