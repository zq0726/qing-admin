<script setup lang="ts">
defineProps(['menuList'])
</script>

<template>
  <template v-for="item in menuList" :key="item.path">
    <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 0">
      <template #title>
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.title }}</span>
      </template>

      <SubItem :menuList="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="item.path">
      <el-icon>
        <component :is="item.icon"></component>
      </el-icon>
      <span>{{ item.title }}</span>
    </el-menu-item>
  </template>
</template>

<style scoped lang="scss">
.el-menu-item {
  &.is-active {
    position: relative;
    background-color: var(--el-color-primary) !important;
    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 4px;
      background-color: var(--el-color-danger);
      content: '';
    }
  }
}
</style>
