<script setup lang="ts">
import { ref } from 'vue'
import { themeColorList, headerColorList } from '@/settings/constant'
import { useTheme } from '@/hooks/useTheme'
import { useDesignSettingStore } from '@/stores/modules/designSetting'
import { storeToRefs } from 'pinia'
import { Sunny, Moon } from '@element-plus/icons-vue'

const { changePrimary, toggleDark, changeGreyOrWeak, changeHeaderColor } = useTheme()
const { themeColor, themeConfig } = storeToRefs(useDesignSettingStore())

const drawer = ref(false)
const direction = ref('rtl')
const size = ref('300')

/**
 * 显示drawer
 */
const showDrawer = () => {
  drawer.value = !drawer.value
}

defineExpose({
  showDrawer
})
</script>

<template>
  <el-config-provider size="small">
    <el-drawer
      class="drawer-box"
      :size="size"
      v-model="drawer"
      title="项目配置"
      :direction="direction"
    >
      <div class="content">
        <el-divider>全局主题</el-divider>
        <ul>
          <li class="li-item">
            <div class="title">黑夜模式</div>
            <div class="operation">
              <el-switch
                v-model="themeConfig.isDark"
                inline-prompt
                active-color="#0a0a0a"
                inactive-color="#dcdfe6"
                :active-icon="Sunny"
                :inactive-icon="Moon"
                @change="toggleDark"
              />
            </div>
          </li>
          <li class="li-item">
            <div class="title">灰色模式</div>
            <div class="operation">
              <el-switch
                v-model="themeConfig.isGrey"
                inline-prompt
                @change="changeGreyOrWeak($event, 'grey')"
              />
            </div>
          </li>
          <li class="li-item">
            <div class="title">色弱模式</div>
            <div class="operation">
              <el-switch
                v-model="themeConfig.isWeak"
                inline-prompt
                @change="changeGreyOrWeak($event, 'weak')"
              />
            </div>
          </li>
          <li class="li-item">
            <div class="title">主题颜色</div>
            <div class="operation">
              <el-color-picker
                v-model="themeColor.primaryColor"
                :predefine="themeColorList"
                @change="changePrimary"
                show-alpha
              />
            </div>
          </li>
          <li class="li-item">
            <div class="title">顶栏颜色</div>
            <div class="operation">
              <el-color-picker
                v-model="themeColor.headerColor"
                :predefine="headerColorList"
                @change="changeHeaderColor"
                show-alpha
              />
            </div>
          </li>
        </ul>

        <el-divider>界面设置</el-divider>
        <ul>
          <li class="li-item">
            <div class="title">菜单展开宽度(px)</div>
            <div class="operation">
              <div class="input-box">
                <el-input-number
                  v-model="themeConfig.menuWidth"
                  :min="100"
                  :max="500"
                  size="small"
                  :step="10"
                  style="width: 100%"
                  controls-position="right"
                  class="input-number"
                />
              </div>
            </div>
          </li>
          <li class="li-item">
            <div class="title">面包屑</div>
            <div class="operation">
              <el-switch v-model="themeConfig.showBreadcrumb" inline-prompt />
            </div>
          </li>
          <li class="li-item">
            <div class="title">标签页</div>
            <div class="operation">
              <el-switch v-model="themeConfig.showTabs" inline-prompt />
            </div>
          </li>
          <li class="li-item">
            <div class="title">页脚</div>
            <div class="operation">
              <el-switch v-model="themeConfig.showFooter" inline-prompt />
            </div>
          </li>
        </ul>
      </div>
    </el-drawer>
  </el-config-provider>
</template>

<style scoped lang="scss">
.li-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  font-size: 14px;
}
::v-deep(.el-input__wrapper) {
  width: 120px !important;
}
.input-number {
  & > .el-input {
    position: relative;
    &::before {
      position: absolute;
      top: 0;
      right: 42px;
      height: 32px;
      font-size: 12px;
      color: #999999;

      // 也可以将此处的分钟换成其他单位

      content: '分钟';
      line-height: 32px;
    }
  }
  .el-input__inner {
    padding-right: 64px;
  }
}
</style>
