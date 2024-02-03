<script setup lang="ts">
import { ref } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { useDesignSettingStore } from '@/stores/modules/designSetting'
import ThemeSetting from './ThemeSetting.vue'
import LockModal from './LockModal.vue'
import Language from './Language.vue'
import { storeToRefs } from 'pinia'
import { useDialog } from '@/components/Dialog'

const themeSetting = ref()
const { toggle, isFullscreen } = useFullscreen()
const { userInfo } = storeToRefs(useDesignSettingStore())
const [register, { openDialog }] = useDialog({
  title: '锁屏页面',
  showFooter: false
})
/**
 * 显示主题抽屉
 */
const showThemeDrawer = () => {
  themeSetting.value.showDrawer()
}

/**
 * 显示锁屏modal
 */
const showLockModal = () => {
  openDialog()
}
</script>

<template>
  <ul class="icon-list">
    <li>
      <el-tooltip class="box-item" effect="dark" content="搜索" placement="bottom">
        <el-icon><Search /></el-icon>
      </el-tooltip>
    </li>
    <li>
      <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom">
        <span @click="toggle">
          <i v-if="isFullscreen" class="iconfont icon-daping-feiquanping"></i>
          <i v-else class="iconfont icon-quanping"></i>
        </span>
      </el-tooltip>
    </li>
    <li>
      <Language />
    </li>
    <li>
      <el-tooltip class="box-item" effect="dark" content="消息" placement="bottom">
        <i class="iconfont icon-xiaoxi"></i>
      </el-tooltip>
    </li>
    <li @click="showLockModal">
      <el-tooltip class="box-item" effect="dark" content="锁屏" placement="bottom">
        <el-icon><Lock /></el-icon>
      </el-tooltip>
    </li>
    <li class="avatar-box">
      <el-dropdown>
        <span class="el-dropdown-link">
          <div class="base-info">
            <el-avatar :size="40" :src="userInfo.avatar" />
            <span>{{ userInfo.name }}</span>
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>官网</el-dropdown-item>
            <el-dropdown-item divided>账号设置</el-dropdown-item>
            <el-dropdown-item>密码修改</el-dropdown-item>
            <el-dropdown-item>退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </li>
    <li @click="showThemeDrawer">
      <el-tooltip class="box-item" effect="dark" content="设置" placement="bottom">
        <el-icon><Setting /></el-icon>
      </el-tooltip>
    </li>
  </ul>

  <ThemeSetting ref="themeSetting" />
  <LockModal @register="register" />
</template>

<style scoped lang="scss">
.icon-list {
  display: flex;
  align-items: center;
  height: 100%;
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 35px;
    height: 100%;
    &:hover {
      background-color: #eeeeee;
    }
    .el-avatar {
      margin-right: 5px;
      width: 30px;
      height: 30px;
    }
  }
  .avatar-box {
    display: flex;
    .base-info {
      display: flex;
      align-items: center;
      padding: 0 8px;
      font-weight: bold;
    }
  }
}
::v-deep .el-tooltip__trigger:focus-visible {
  outline: none;
}
</style>
