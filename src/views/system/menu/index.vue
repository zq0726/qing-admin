<script setup lang="ts">
import { h, reactive } from 'vue'
import Child from './components/Child.vue'

interface PersonType<T> {
  id: number
  name: string
  age: number
  hoobby: T
  tag: any
}

const person = reactive<PersonType<string>>({
  id: 1,
  name: '小王',
  age: 33,
  hoobby: 'play computer game',
  tag: () => {
    return h('div', null, 'hello')
  }
})
</script>

<template>
  <div>
    <el-card>
      <ul>
        <li>
          <div>姓名：{{ person.name }}</div>
          <div>年龄：{{ person.age }}</div>
          <div>爱好：{{ person.hoobby }}</div>
          <template v-if="person.tag">
            <div class="tag-box">
              tag：
              <component :is="person.tag" />
            </div>
          </template>
        </li>
      </ul>
    </el-card>

    <Child v-model:person="person" />
  </div>
</template>

<style scoped lang="scss">
.tag-box {
  display: flex;
}
</style>
