<script setup lang="ts">
import { computed, getCurrentInstance, ref, unref, useAttrs } from 'vue'
import type { DialogMethods } from '..'
import { baseProps } from './props'

const attrs = useAttrs()
const emit = defineEmits(['register'])
const props = defineProps({ ...baseProps })

const settingProps = ref({})
const visible = ref(false) //是否显示
const fullscreen = ref(false) //是否全屏

/**
 * 关闭 Dialog
 */
const closeDialog = () => {
  visible.value = false
}

/**
 * 显示 Dialog
 */
const openDialog = () => {
  visible.value = true
}

/**
 * 设置props
 */
const setProps = (props: any) => {
  settingProps.value ={...props,...unref(settingProps)}
}


const modalMethods: DialogMethods = {
  setProps,
  openDialog,
  closeDialog,
}

const instance = getCurrentInstance()
if (instance) {
  emit('register', modalMethods)
}

const getBindValues:any = computed(() => {
  return {
    ...props,
    ...attrs,
    ...unref(settingProps)
  }
})

/**
 * 确认
 */
const submit = () => {
  console.log(getBindValues.value)
}
</script>

<template>
  <el-dialog
    v-bind="getBindValues"
    v-model="visible"
    :show-close="false"
    :fullscreen="fullscreen"
    draggable
  >
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">{{ getBindValues.title }}</h4>
        <div class="header-action">
          <div class="header-action-btn" @click="fullscreen = !fullscreen">
            <i v-if="fullscreen" class="iconfont icon-daping-feiquanping"></i>
            <i v-else class="iconfont icon-quanping"></i>
          </div>
          <div class="header-action-btn" @click="visible = !visible">
            <el-icon><Close /></el-icon>
          </div>
        </div>
      </div>
    </template>
    <span>
      <slot />
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submit()"> {{ baseProps.subBtuText.default }} </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.my-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  h4{
    display: flex;
    align-items: center;
    height: 100%;
    flex: 1;
  }
  .header-action {
    display: flex;
    align-items: center;
   height: 100%;
    &-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 15px;
      height: 50px;
      font-size: 20px;
    }
  }
}
</style>
