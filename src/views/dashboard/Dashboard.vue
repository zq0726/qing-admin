<script setup lang="ts">
import { ref } from 'vue'
import { useDesignSettingStore } from '@/stores/modules/designSetting'
import { comSizeConfig } from '@/settings/constant'
import { SizeEnum } from '@/enums/config'

const { setSize } = useDesignSettingStore()

const value = ref(null)
const changeSize = (info: SizeEnum) => {
  setSize(info)
}

const info = ref('')

const vFocus = {
  mounted: (el: HTMLElement) => el.focus()
}

const show = ref(false)
const test = ref<HTMLElement | null>(null)
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
  <el-input v-model="info" v-focus></el-input>

  <button @click="show = !show" ref="test">Toggle</button>
  <Transition>
    <p v-if="show">hello</p>
  </Transition>
</template>

<style scoped lang="scss">
/* 添加具体的样式规则 */
.iconfont {
  width: 20px;
  font-size: 20px;
}

/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
