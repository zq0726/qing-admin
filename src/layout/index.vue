<script setup lang="ts">
import { uiConfig } from '@/settings/constant'
import { useDesignSettingStore } from '@/stores/modules/designSetting'
import { storeToRefs } from 'pinia'

import LockScreen from './LockScreen/LockScreen.vue'
import Aside from './Menu/index.vue'
import Header from './Header/index.vue'
import Footer from './Footer/index.vue'
import Tabs from './Tabs/index.vue'
import { nextTick, ref, computed, watch } from 'vue'
import emitter from '@/plugin/mitt/index'
import { useScroll, useWindowSize } from '@vueuse/core'

const el = ref<HTMLElement | null>(null)
const { y } = useScroll(el)
const goTop = () => {
  const timer = setInterval(() => {
    y.value = y.value - 30
    if (y.value <= 0) {
      clearInterval(timer)
    }
  }, 1)
}

const showTopBox = computed(() => {
  return y.value > 50 ? true : false
})

const { themeColor, themeConfig } = storeToRefs(useDesignSettingStore())
const { setThemeConfig } = useDesignSettingStore()

const isRouterAlive = ref(true)
const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}

emitter.on('reload', reload)

const { width } = useWindowSize()
watch(
  width,
  (newV) => {
    if (newV < 1200) {
      setThemeConfig('isCollapse', true)
    } else {
      setThemeConfig('isCollapse', false)
    }

    if (newV < 768) {
      setThemeConfig('showBreadcrumb', false)
    } else {
      setThemeConfig('showBreadcrumb', true)
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="layout">
    <el-container>
      <el-aside
        class="layout-aside hidden-xs-only"
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
          <!-- <Tabs v-if="themeConfig.showTabs" /> -->
          <Tabs />
        </el-header>

        <el-main class="layout-main">
          <div class="page-main" ref="el">
            <router-view v-if="isRouterAlive" />
          </div>
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
    <div class="to-top" @click="goTop" v-if="showTopBox">
      <i class="iconfont icon-huidaodingbu"></i>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  overflow: hidden;
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
  &-main {
    position: relative;
    overflow-y: auto;
    padding: 0 !important;
    width: 100%;
    flex: 1;
    .page-main {
      overflow: hidden;
      padding: $global-padding;
      width: 100%;
      min-height: 100%;
    }
  }
}
.to-top {
  position: fixed;
  right: 40px;
  bottom: 50px;
  z-index: 9999;
  color: var(--el-color-primary);
  i {
    display: inline-block;
    width: 40px;
    height: 40px;
    font-size: 40px;
  }
}
</style>
