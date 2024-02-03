<script setup lang="ts">
import { uiConfig } from '@/settings/constant'
import { useDesignSettingStore } from '@/stores/modules/designSetting'
import { storeToRefs } from 'pinia'
import LockScreen from './LockScreen/LockScreen.vue'

import Aside from './Menu/index.vue'
import Header from './Header/index.vue'
import Footer from './Footer/index.vue'
import Tabs from './Tabs/index.vue'
const { themeColor, themeConfig } = storeToRefs(useDesignSettingStore())
</script>

<template>
  <div class="layout">
    <el-container>
      <el-aside
        class="hidden-xs-only layout-aside"
        :style="{ background: themeConfig.isDark ? '#000' : themeColor.asideColor }"
      >
        <Aside />
      </el-aside>
      <el-container>
        <el-header
          class="layout-header"
          :style="{
            background: themeConfig.isDark ? '#000' : themeColor.headerColor
          }"
        >
          <Header />
          <Tabs v-if="themeConfig.showTabs" />
        </el-header>

        <el-main>
          <router-view />
        </el-main>
        <el-footer
          v-if="themeConfig.showFooter"
          class="layout-footer"
          :style="{ height: uiConfig.footerHeight }"
        >
          <Footer />
        </el-footer>
      </el-container>
    </el-container>

    <el-backtop :right="100" :bottom="100" />

    <LockScreen v-if="themeConfig.isLock" />
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  width: 100vw;
  height: 100vh;
  &-aside {
    width: auto;
  }
  &-header {
    padding: 0;
    height: auto;
    border-bottom: 1px solid var(--el-border-color);
  }
  &-footer {
    border-top: 1px solid var(--el-border-color);
  }
}
</style>
