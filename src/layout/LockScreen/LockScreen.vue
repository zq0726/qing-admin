<script setup lang="ts">
import { computed, ref } from 'vue'
import { Week } from '@/enums/config'
import { onMounted } from 'vue'
import { useDesignSettingStore } from '@/stores/modules/designSetting'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const { userInfo, lockPassword, themeConfig } = storeToRefs(useDesignSettingStore())

const now = ref(new Date())
const date = computed(() => {
  const year = now.value.getFullYear()
  const month = now.value.getMonth() + 1
  const day = now.value.getDate()
  return `${year}/${month}/${day}`
})
const week = computed(() => {
  const nowWeek = now.value.getDay()
  return Week[nowWeek]
})
const hour = computed(() => now.value.getHours())
const minute = computed(() => now.value.getMinutes())
const isAm = computed(() => now.value.getHours() < 12)

// 显示开锁页面
const showUnlock = ref(false)
// 开锁密码
const lockPwd = ref('')

const showUnlockBox = () => {
  showUnlock.value = true
}

/**
 * 返回系统
 */
const backSystem = () => {
  if (lockPwd.value === lockPassword.value) {
    showUnlock.value = false
    themeConfig.value.isLock = false
  }
}

/**
 * 返回登录
 */
const backLogin = () => {
  console.log('router', router)
  router.push({
    path: '/login'
  })
}

onMounted(() => {
  setInterval(() => {
    now.value = new Date()
  })
})
</script>

<template>
  <div class="lock-screen">
    <el-container
      :class="{ 'opacity-box': showUnlock }"
      style="display: flex; flex-direction: column"
    >
      <el-header v-if="!showUnlock" class="lock-header">
        <div class="lock-icon" @click="showUnlockBox">
          <el-icon><Lock /></el-icon>
          <span>点击解锁</span>
        </div>
      </el-header>
      <el-main class="lock-main p-4">
        <div>
          <el-card class="box-card" style="position: relative" :class="{ 'no-dg': showUnlock }">
            {{ hour }}
            <div v-if="!showUnlock" class="position">
              {{ isAm ? '上午' : '下午' }}
            </div>
          </el-card>
        </div>
        <div>
          <el-card class="box-card" :class="{ 'no-dg': showUnlock }"> {{ minute }} </el-card>
        </div>
      </el-main>
      <el-footer v-if="!showUnlock" class="lock-footer"> {{ date }} {{ week }} </el-footer>
    </el-container>

    <div class="unlock-box" v-if="showUnlock">
      <div>
        <el-avatar :size="70" :src="userInfo.avatar"></el-avatar>
      </div>
      <div style="margin: 10px 0">{{ userInfo.name }}</div>
      <el-input v-model="lockPwd" type="password" placeholder="请输入锁屏密码" show-password />
      <div class="unlock-action">
        <el-link type="primary" @click="showUnlock = false">返回</el-link>
        <el-link type="primary" @click="backLogin">返回登录</el-link>
        <el-link type="primary" @click="backSystem">返回系统</el-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.lock-screen {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  display: flex;
  width: 100vw;
  height: 100vh;
  color: #ffffff;
  background-color: var(--el-color-black);
  flex-direction: column;
  .lock-header {
    display: flex;
    justify-content: center;
    align-items: center;
    .lock-icon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .lock-main {
    display: flex;
    justify-content: space-between;
    flex: 1;
    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      flex: 1;
      .el-card {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70%;
        height: 100%;
        font-size: 180px;
        border: none;
        color: #bababa;
        background-color: #141313;
        .position {
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 20px;
        }
      }
      .no-dg {
        background-color: var(--el-color-black);
        text-shadow: 0 0 30px #ffffff;
      }
    }
  }
  .lock-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
  .unlock-box {
    position: absolute;
    top: 0;
    left: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 270px;
    height: 100vh;
    transform: translateX(-50%);
    .unlock-action {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5px;
      width: 100%;
    }
  }
  .opacity-box {
    opacity: 0.2;
  }
}
</style>
