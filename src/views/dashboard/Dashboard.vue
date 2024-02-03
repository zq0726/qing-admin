<script setup lang="ts">
import { ref } from 'vue'
import { useDesignSettingStore } from '@/stores/modules/designSetting'
import { comSizeConfig } from '@/settings/constant'
import { SizeEnum } from '@/enums/config'
import UserDialog from './components/UserDialog.vue'
import { useDialog } from '@/components/Dialog'

const { setSize } = useDesignSettingStore()

const value = ref(null)
const changeSize = (info: SizeEnum) => {
  setSize(info)
}

const changeDialogShow = (type: Boolean) => {
  if (type) openDialog()
  else closeDialog()
}

const [register, { openDialog, closeDialog }] = useDialog({
  title: '锁屏密码',
  showFooter: false
})
</script>

<template>
  <el-select v-model="value" style="width: 240px" @change="changeSize">
    <el-option
      v-for="item in comSizeConfig"
      :key="item.value"
      :label="item.type"
      :value="item.value"
    />
  </el-select>

  <div>{{ $t('home.welcome') }}</div>
  <div>
    <el-button type="success" @click="changeDialogShow(true)">打开</el-button>
    <el-button type="primary" @click="changeDialogShow(false)">关闭</el-button>
  </div>
  <UserDialog @register="register" />
</template>

<style scoped lang="scss">
/* 添加具体的样式规则 */
.iconfont {
  width: 20px;
  font-size: 20px;
}
</style>
