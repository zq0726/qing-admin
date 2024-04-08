<script setup lang="ts"></script>

<template>
  <div>
    <template v-for="slotName in Object.keys($slots)">
      <slot :name="slotName"></slot>
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
