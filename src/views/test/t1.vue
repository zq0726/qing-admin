<script setup lang="ts">
import Child from './components/Child.vue'
import { useChild } from './hooks/useChild'
import { getTest, getTest1, getCountry } from './api'
import { useLoading } from '@/hooks/useLoading'
import { getCurrentInstance } from 'vue'

const [register, { open, close }] = useChild({
  type: 'primary',
  plain: true,
  round: true,
  icon: 'Edit',
  color: '#626aef'
})
const handleOpen = () => {
  console.log('打开')
  open()
}

const handleClose = () => {
  console.log('关闭')
  close()
}

const testApi = async () => {
  getTest()
}
const testApi1 = async () => {
  let res = await getTest1()
  console.log('res', res)
}

/**
 * 使用loading
 */
const { openLoading, closeLoading } = useLoading({
  background: '',
  text: 'loading...'
})

const handleOpenLoading = () => {
  openLoading()
  setTimeout(() => {
    closeLoading()
  }, 2000)
}
const handleCloseLoading = () => {
  closeLoading()
}

const handleGetCountry = async () => {
  let res = await getCountry()
  console.log('国家信息', res)
}

const getNews = <T, K>(name: T, age: K): T => {
  return name
}

const personAge = getNews<string, number>('hello', 33)
console.log('personAge', personAge)

const app = getCurrentInstance()

const showLoading = () => {
  console.log('点击了loading', app)
  app?.proxy?.$myLoading.show()

  // 5秒之后取消加载
  setTimeout(() => {
    app?.proxy?.$myLoading.hide()
  }, 5000)
}
</script>

<template>
  <div>
    <el-divider> 语言 中英文 </el-divider>
    <div>{{ $t('home.welcome') }}</div>

    <el-divider> 子组件的使用 </el-divider>
    <Child @register="register">
      <div>hello</div>
    </Child>

    <el-button @click="handleOpen">open</el-button>
    <el-button @click="handleClose">close</el-button>

    <el-divider>获取接口</el-divider>
    <el-button @click="testApi">apiTest</el-button>
    <el-button @click="testApi1">apiTest1</el-button>
    <el-button @click="handleGetCountry">获取国家信息</el-button>

    <el-divider>使用 loading</el-divider>
    <el-button @click="handleOpenLoading">打开loading</el-button>
    <el-button @click="handleCloseLoading">关闭loading</el-button>

    <input type="text" v-focus />

    <div>
      <el-button type="primary" @click="showLoading">show loading</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
