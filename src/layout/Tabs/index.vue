<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMenuStore } from '@/stores/modules/menu'
import { useTabStore } from '@/stores/modules/tabs'
import { useRouter } from 'vue-router'
import { inject } from 'vue'

import type { MenuType } from '@/stores/types'
import type { TabsPaneContext } from 'element-plus'
import type { Fn } from '@vueuse/core'
import type { TabPaneName } from 'element-plus/lib/components/tabs/src/tabs.js'

const { menuList, breadcrumbList, defalutActive, defaultOpeneds } = storeToRefs(useMenuStore())
const { tabsMenuList, activeTab, canCloseLeft, canCloseRight, canCloseOrther, canCloseAll } =
  storeToRefs(useTabStore())
const { addTab, removeTab, closeLeft, closeRight, closeOrther, closeAll } = useTabStore()
const route = useRoute()
const router = useRouter()
const reload: Fn | undefined = inject('reload')

//改变 tab 页面
const tabClick = (tab: TabsPaneContext) => {
  router.push(tab.props.name as string)
}

//删除某个tab
const deleteTab = (targetName: TabPaneName | undefined) => {
  if (targetName) removeTab(targetName as string)
}

watch(
  () => route.path,
  async (newV) => {
    const currentMneu: MenuType | null = getActiveMenu(menuList.value, newV)
    breadcrumbList.value = route.matched.filter((item) => item.path !== '/')
    activeTab.value = route.path

    if (currentMneu != null) addTab(currentMneu)
    defalutActive.value = newV

    const openMenu = []
    for (let item of route.matched) {
      if (item.path != newV) {
        openMenu.push(item.path)
      }
    }
    defaultOpeneds.value = openMenu
  }
)

const getActiveMenu = (info: any[], chosePath: string) => {
  let activeMenu = null

  info.forEach((item) => {
    if (item.children) {
      const childActiveMenu = getActiveMenu(item.children, chosePath)
      if (childActiveMenu) {
        activeMenu = childActiveMenu
      }
    } else if (item.path === chosePath) {
      activeMenu = item
    }
  })

  return activeMenu
}

//刷新页面
const reloadPage = () => {
  console.log('hel')
  if (reload) {
    reload()
  }
}
</script>

<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs
        type="card"
        closable
        class="card-tab"
        v-model="activeTab"
        @tab-click="tabClick"
        @edit="deleteTab"
      >
        <el-tab-pane
          v-for="item in tabsMenuList"
          :key="item.path"
          :label="item.title"
          :name="item.path"
        >
          <template #label>
            <el-icon class="tabs-icon" v-if="item.icon">
              <component :is="item.icon"></component>
            </el-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="tabs-operation">
      <el-icon><More /></el-icon>
      <el-tooltip class="box-item" effect="dark" content="刷新" placement="top-start">
        <el-icon @click="reloadPage"><Refresh /></el-icon>
      </el-tooltip>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon><ArrowDownBold /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="removeTab(route.path)" :disabled="activeTab == '/'">
              <el-icon><CloseBold /></el-icon>
              <span>关闭当前</span>
            </el-dropdown-item>
            <el-dropdown-item @click="closeLeft" divided :disabled="!canCloseLeft">
              <!-- <el-icon><DArrowLeft /></el-icon> -->
              <i class="iconfont icon-to-leftdaozuobian"></i>
              <span>关闭左侧</span>
            </el-dropdown-item>
            <el-dropdown-item @click="closeRight" :disabled="!canCloseRight">
              <!-- <el-icon><DArrowRight /></el-icon> -->
              <i class="iconfont icon-to-rightdaoyoubian"></i>
              <span>关闭右侧</span>
            </el-dropdown-item>
            <el-dropdown-item @click="closeOrther" divided :disabled="!canCloseOrther">
              <i class="iconfont icon-tupianzhongjian"></i>
              <span>关闭其他</span>
            </el-dropdown-item>
            <el-dropdown-item @click="closeAll" :disabled="!canCloseAll">
              <el-icon><SemiSelect /></el-icon>
              <span>全部关闭</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- <el-icon><ArrowDownBold /></el-icon> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabs-box {
  display: flex;
  justify-content: space-between;
  .tabs-menu {
    padding: 5px 0;
    padding-left: $global-padding;
    flex: 1;
    .tabs-icon {
      margin-right: 8px;
    }
  }
  .tabs-operation {
    display: flex;
    align-items: center;
    border-left: 1px solid var(--el-border-color);
    i {
      width: 40px;
      height: 100%;
      border-right: 1px solid var(--el-border-color);
      cursor: pointer;
      outline: none;
    }
    span:focus-visible {
      outline: none;
    }
  }
}
:deep(.el-tabs__header) {
  margin: 0;
}
:deep(.el-tabs--card > .el-tabs__header .el-tabs__nav) {
  border: none;
}
:deep(.el-tabs--card > .el-tabs__header .el-tabs__item.is-active) {
  border-bottom-width: 2px;
  border-bottom-color: var(--el-color-primary);
}
:deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
  border-left: none;
}
:deep(.el-tabs--card > .el-tabs__header) {
  border: none;
}
</style>
