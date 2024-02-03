<script setup lang="ts">
import { ref } from 'vue'
import { useDesignSettingStore } from '@/stores/modules/designSetting'
import { storeToRefs } from 'pinia'
import { uiConfig } from '@/settings/constant'
import { useMenuStore } from '@/stores/modules/menu'
// import { useRoute } from 'vue-router'
import Logo from './components/Logo.vue'
import SubItem from './components/SubItem.vue'

const { themeConfig, themeColor } = storeToRefs(useDesignSettingStore())
const { menuList, defalutActive, defaultOpeneds } = storeToRefs(useMenuStore())
</script>

<template>
  <div
    class="menu"
    :style="{
      width: themeConfig.isCollapse ? uiConfig.menuCollapseWidth : themeConfig.menuWidth + 'px'
    }"
  >
    <Logo />
    <el-scrollbar>
      <el-menu
        :default-active="defalutActive"
        :default-openeds="defaultOpeneds"
        :router="true"
        :collapse-transition="false"
        :unique-opened="true"
        text-color="#fff"
        :collapse="themeConfig.isCollapse"
        :background-color="themeColor.asideColor"
        active-text-color="#fff"
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
