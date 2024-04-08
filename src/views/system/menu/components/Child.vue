<script setup lang="ts">
import { ref } from 'vue'
interface PersonType<T> {
  id: number
  name: string
  age: number
  hoobby: T
  tag: any
}

interface PropsType {
  person: PersonType<string>
}

const props = defineProps<PropsType>()

const personInfo = ref(props.person)
</script>

<template>
  <el-card>
    <el-input v-model="personInfo.name"></el-input>
    <el-input v-model="personInfo.age"></el-input>
    <el-input v-model="personInfo.hoobby"></el-input>
  </el-card>
</template>

<style scoped lang="scss">
:deep(.el-input) {
  margin-bottom: 10px;
}
</style>
