<script setup lang="ts">
import { BasicDialog, useDialog } from '@/components/Dialog'
import { reactive, ref } from 'vue'
import { useDesignSettingStore } from '@/stores/modules/designSetting'
import type { FormRules } from 'element-plus'
import type { FormType } from './type'
import { storeToRefs } from 'pinia'

const { lockPassword } = storeToRefs(useDesignSettingStore())
const [register] = useDialog()

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
 * 改变锁屏密码
 */
const changeLockPassword = (info: string) => {
  lockPassword.value = info
}
</script>

<template>
  <div>
    <BasicDialog @register="register">
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
            @input="changeLockPassword"
            placeholder="请输入密码"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
    </BasicDialog>
  </div>
</template>

<style scoped lang="scss"></style>
