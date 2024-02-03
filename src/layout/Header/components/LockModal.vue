<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { BasicDialog, useDialog } from '@/components/Dialog'
import { useDesignSettingStore } from '@/stores/modules/designSetting'
import type { FormRules } from 'element-plus'

interface FormType {
  password: string
}

const { lockPassword, userInfo, themeConfig } = storeToRefs(useDesignSettingStore())
const [register, { closeDialog }] = useDialog()

/**
 * 表单数据
 */
const formInfo = reactive<FormType>({
  password: ''
})

const formSize = ref('default')
const rules = reactive<FormRules<FormType>>({
  password: [{ required: true, message: '锁屏密码', trigger: 'blur' }]
})

/**
 * 锁定屏幕
 */
const lockScreen = () => {
  themeConfig.value.isLock = true
  lockPassword.value = formInfo.password
  closeDialog()
}
</script>

<template>
  <div>
    <BasicDialog @register="register">
      <ul class="user-info">
        <li class="user-info-avatar">
          <el-image :src="userInfo.avatar" fit="cover" />
        </li>
        <li class="user-info-name">{{ userInfo.name }}</li>
      </ul>
      <div class="p-4">
        <el-form
          :model="formInfo"
          label-width="80px"
          :rules="rules"
          :size="formSize"
          type="password"
          status-icon
          show-password
        >
          <el-form-item label="锁屏密码" prop="password">
            <el-input
              v-model="formInfo.password"
              placeholder="请输入密码"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>

        <el-button @click="lockScreen" type="primary" style="margin-bottom: 10px; width: 100%"
          >锁定</el-button
        >
      </div>
    </BasicDialog>
  </div>
</template>

<style scoped lang="scss">
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  &-avatar {
    overflow: hidden;
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  &-name {
    margin-bottom: 10px;
    font-weight: bold;
    line-height: 40px;
  }
}
</style>
