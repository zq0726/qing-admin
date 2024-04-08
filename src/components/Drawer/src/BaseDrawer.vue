<script setup lang="ts">
import { computed, getCurrentInstance, useAttrs, ref } from 'vue'
import type { ReturnMethods } from './typing'

interface PropsType {
  direction?: string
  showFooter?: boolean
}

const attrs = useAttrs()
const props = withDefaults(defineProps<PropsType>(), {
  direction: 'rtl',
  showFooter: true
})

const emits = defineEmits(['register', 'submit'])

const getBindValues: any = computed(() => {
  return {
    ...attrs,
    ...props
  }
})

const visible = ref<boolean>(false)

/**
 * 打开抽屉
 * @param data
 */
const openDrawer = (data: any) => {
  console.log('打开抽屉传递的参数', data)
  visible.value = true
}

/**
 * 关闭抽屉
 */
const closeDrawer = () => {
  visible.value = false
}

const drawerMethods: ReturnMethods = {
  openDrawer,
  closeDrawer
}

const instance = getCurrentInstance()

if (instance) {
  emits('register', drawerMethods)
}

const submit = () => {
  emits('submit')
}

const drawerAction = ref({})
const drawer = ref()

defineExpose(drawerAction.value)
</script>

<template>
  <el-drawer v-model="visible" v-bind="getBindValues" ref="drawer">
    <div class="drawer-content">
      <slot />
    </div>
    <template v-if="showFooter" #footer>
      <el-button @click="closeDrawer">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>

    <template v-for="(_, name) in $slots" v-slot:[name]>
      <slot :name="name"></slot>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
:deep(.el-drawer__body) {
  padding: 0 !important;
}
:deep(.el-drawer__footer) {
  border-top: 1px solid red;
}
.drawer-content {
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: violet;
}
</style>
