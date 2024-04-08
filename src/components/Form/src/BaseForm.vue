<script setup lang="ts">
import { reactive } from 'vue'
import TestInput from './components/input.vue'
import TestCheckbox from './components/checkbox.vue'

const componentList: any = {
  'test-input': TestInput,
  'test-checkbox': TestCheckbox
}

const form: any = reactive({})

const searchList = [
  {
    lable: '姓名:',
    type: 'input',
    field: 'name'
  },
  {
    lable: '学生:',
    type: 'checkbox',
    field: 'isStudent'
  }
]

const submit = () => {
  console.log('form', form)
}

const colSetting = {
  xs: 24,
  sm: 12,
  md: 6,
  lg: 6,
  xl: 6
}
</script>

<template>
  <el-form :model="form" :inline="true" label-width="80px">
    <el-row>
      <el-col v-bind="colSetting" v-for="item in searchList" :key="item.lable">
        <el-form-item>
          <template #label>
            <div>{{ item.lable }}</div>
          </template>
          <component
            v-model="form[item.field]"
            style="width: 100%"
            :is="componentList[`test-${item.type}` as string]"
          ></component>
        </el-form-item>
      </el-col>
      <el-col v-bind="colSetting">
        <el-form-item>
          <el-button @click="submit">提交444</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped lang="scss">
:deep(.el-form--inline .el-form-item) {
  width: 100%;
}
</style>
./components/I.vue
