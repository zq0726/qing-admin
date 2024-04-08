<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { getCaptcha, login } from '@/api/system/login'

interface FormType {
  account: string
  password: string
  captcha: string
}

const form = reactive<FormType>({
  account: '',
  password: '',
  captcha: ''
})

const imgUrl = ref()

// 登录接口
const handleLogin = async () => {
  if (!form.account) return ElMessage.error('请输入账号')
  if (!form.password) return ElMessage.error('请输入密码')

  try {
    const res = await login(form)
    console.log('res', res)
  } catch (error) {
    console.log('err', error)
  }
}

const loadCaptcha = async () => {
  const { data } = await getCaptcha()
  imgUrl.value = data
}

onMounted(async () => {
  await loadCaptcha()
})
</script>

<template>
  <div class="flex items-center justify-center w-full h-full">
    <el-card>
      <el-config-provider size="large">
        <div class="flex-col shadow-sm p-4" style="width: 400px">
          <div class="text-xl text-center leading-20 font-bold">Qing Admin</div>
          <el-form :model="form" label-position="top" label-width="auto" style="max-width: 600px">
            <el-form-item>
              <el-input v-model="form.account" placeholder="账号" />
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.password" type="password" placeholder="密码" />
            </el-form-item>
            <el-row :gutter="10" class="mb-4">
              <el-col :span="15">
                <el-input placeholder="验证码" v-model="form.captcha"></el-input>
              </el-col>
              <el-col :span="9">
                <div
                  @click="loadCaptcha"
                  class="catpcha-box flex item-center justify-center"
                  v-html="imgUrl"
                ></div>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button class="w-full" type="primary" @click="handleLogin">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-config-provider>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.catpcha-box {
  height: 40px;
  border: 1px solid var(--el-border-color);
  cursor: pointer;
  :deep(svg, img) {
    width: 100%;
    height: 100%;
  }
}
</style>
