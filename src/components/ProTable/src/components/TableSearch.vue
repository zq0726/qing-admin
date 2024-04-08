<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { Input, CheckBox, Select, InputNumber } from '@/components/Form'

interface PropsType {
  tableSearch: any
}

const componentList: any = {
  'test-input': Input,
  'test-checkbox': CheckBox,
  'test-select': Select,
  'test-input-number': InputNumber
}

const props = defineProps<PropsType>()

let form: any = reactive({})

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

const clearForm = () => {
  for (const key in form) {
    form[key] = null
  }
}

onMounted(() => {
  console.log('props.tableSearch', props.tableSearch)
})
</script>

<template>
  <el-card style="margin-bottom: 10px">
    <el-form :model="form" :inline="true" label-width="80px">
      <el-row>
        <el-col v-bind="colSetting" v-for="item in props.tableSearch" :key="item.label">
          <el-form-item>
            <template #label>
              <div>{{ item.label }}</div>
            </template>
            <template v-if="!item.slot">
              <component
                v-model="form[item.field]"
                style="width: 100%"
                v-bind="item"
                :is="componentList[`test-${item.type}` as string]"
              ></component>
            </template>

            <template v-for="(_, name) in $slots" v-slot:[name]>
              <slot :name="name" :value="form[item.field]"></slot>
            </template>
          </el-form-item>
        </el-col>
        <el-col v-bind="colSetting">
          <el-form-item>
            <div class="submit-box">
              <el-button @click="clearForm">重置</el-button>
              <el-button type="primary" @click="submit">确定</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss">
:deep(.el-card__body) {
  padding-top: var(--el-card-padding) !important;
}
:deep(.el-form--inline .el-form-item) {
  width: 100%;
}
:deep(.el-form-item--default) {
  margin: 0;
  padding: 5px 0;
}
.submit-box {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style>
