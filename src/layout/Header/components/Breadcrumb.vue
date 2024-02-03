<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { useMenuStore } from '@/stores/modules/menu'
import { storeToRefs } from 'pinia'

const { breadcrumbList } = storeToRefs(useMenuStore())
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <template v-if="breadcrumbList.length > 0">
      <el-breadcrumb-item v-for="item in breadcrumbList" :key="item?.path">{{
        item?.name
      }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<style scoped lang="scss"></style>
