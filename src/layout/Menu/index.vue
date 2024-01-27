<script setup lang="ts">
import { useDesignSettingStore } from '@/stores/modules/designSetting'
import { storeToRefs } from 'pinia'
import Logo from './components/Logo.vue'
import SubItem from './components/SubItem.vue'
import { uiConfig } from '@/settings/constant'

const { themeConfig, themeColor } = storeToRefs(useDesignSettingStore())

const menuList = [
  {
    title: '測試',
    path: '/404',
    icon: 'Edit'
  },
  {
    title: '检查',
    path: '/403',
    icon: 'Edit',
    children: [
      {
        title: 'hello',
        path: '/404',
        icon: 'Edit'
      }
    ]
  }
]
</script>

<template>
  <div
    class="menu"
    :style="{
      width: themeConfig.isCollapse ? uiConfig.menuCollapseWidth : uiConfig.menuWidth
    }"
  >
    <Logo />
    <el-scrollbar>
      <el-menu
        :router="true"
        :collapse-transition="false"
        :unique-opened="true"
        active-text-color="#fff"
        text-color="#fff"
        :collapse="themeConfig.isCollapse"
        :background-color="themeColor.asideColor"
      >
        <SubItem :menuList="menuList" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.menu {
  color: white;
  transition: all 0.3s ease;
  .el-menu {
    border: none;
    color: white;
  }
}
</style>
