<script setup lang="ts">
import { ref, computed, unref } from 'vue'
import { BaseDrawer, useDrawerInner } from '@/components/Drawer'
import draggable from 'vuedraggable'
import { getCancleName } from '@/utils/'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { DEFAULT_CACHE_TIME } from '@/settings/constant'

interface CacheType {
  checkIndex: boolean
  checkedList: string[]
  fixedColumns: { key: string; fixed: 'left' | 'right' }[]
  sortedList: string[]
}

const props = defineProps<{ columnList: any; showIndex: boolean }>()
const emits = defineEmits(['changeIndex', 'register'])
const columnList = ref(props.columnList)
const route = useRoute()

const [register, { closeDrawer }] = useDrawerInner(() => {
  changeColumn()
})

const checkAll = ref(false) //选择全部
const isIndeterminate = ref(true) //选中部分
const showSequence = ref(props.showIndex) //是否显示序列号
const setingColumn = computed(() => columnList.value.filter((item: any) => !item.type).length)
/**
 * 全部选择
 */
const handleCheckAllChange = (checked: boolean) => {
  isIndeterminate.value = false
  if (checked) {
    columnList.value.map((item: any) => (item.isShow = true))
  } else {
    columnList.value.map((item: any) => (item.isShow = false))
  }
}

/**
 * 固定在左侧
 */
const fixedLeft = (element: any) => {
  if (element.fixed === 'left') {
    delete element.fixed
  } else {
    element.fixed = 'left'
  }
}

/**
 * 固定在右侧
 * @param element
 */
const fixedRight = (element: any) => {
  if (element.fixed === 'right') {
    delete element.fixed
  } else {
    element.fixed = 'right'
  }
}

/**
 * 改变选中的column
 */
const changeColumn = () => {
  const showNum = columnList.value.filter((item: any) => item.isShow && !item.type).length
  if (showNum === setingColumn.value) {
    checkAll.value = true
    isIndeterminate.value = false
  } else if (showNum > 0) {
    isIndeterminate.value = true
  } else {
    checkAll.value = false
    isIndeterminate.value = false
  }
}

/**
 * 是否显示序号
 * @param checked
 */
const changeIndex = (type: boolean) => {
  emits('changeIndex', type)
}

/**
 * 保存column
 */
const saveColumn = () => {
  const cacheName = getCancleName(route)
  const option: CacheType = {
    checkIndex: false,
    checkedList: [],
    fixedColumns: [],
    sortedList: []
  }
  const list = unref(columnList).filter((item: any) => !item.type)
  for (let i = 0; i < list.length; i++) {
    option.checkIndex = unref(showSequence)
    if (list[i].isShow) {
      option.checkedList.push(list[i].prop)
    }

    if (list[i].fixed) {
      option.fixedColumns.push({ key: list[i].prop, fixed: list[i].fixed })
    }

    option.sortedList.push(list[i].prop)
  }

  createCache(cacheName, option)
  closeDrawer()
}

/**
 * 创建缓存
 */
const createCache = (name: string, option: CacheType) => {
  localStorage.setItem(
    name,
    JSON.stringify({
      time: dayjs().valueOf(),
      expire: dayjs().valueOf() + DEFAULT_CACHE_TIME,
      value: option
    })
  )
}
</script>

<template>
  <BaseDrawer @register="register" @submit="saveColumn" size="300" title="列设置">
    <div class="list">
      <div class="list-header">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
          >列展示</el-checkbox
        >

        <el-checkbox v-model="showSequence" @change="changeIndex">序列号</el-checkbox>
      </div>
      <div class="list-main">
        <draggable
          :list="columnList"
          chosen-class="chosenClass"
          ghost-class="ghostClass"
          animation="300"
          itemKey="props"
          handle=".mover"
        >
          <template #item="{ element }">
            <div class="item" v-if="!element.type">
              <div class="item-left">
                <div class="mover">
                  <el-icon><Rank /></el-icon>
                </div>
                <el-checkbox @change="changeColumn" v-model="element.isShow">{{
                  element.label
                }}</el-checkbox>
              </div>

              <div class="item-right">
                <i
                  @click="fixedLeft(element)"
                  :class="{ isLeft: element?.fixed === 'left' }"
                  class="iconfont icon-to-leftdaozuobian"
                ></i>
                <el-divider direction="vertical" />
                <i
                  @click="fixedRight(element)"
                  :class="{ isLeft: element?.fixed === 'right' }"
                  class="iconfont icon-to-rightdaoyoubian"
                ></i>
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </BaseDrawer>
</template>

<style scoped lang="scss">
.list {
  width: 100%;
  max-height: 100%;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  &-header {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    border-bottom: 1px solid var(--el-border-color);
  }
  &-main {
    padding: 5px 10px;
    font-size: 14px;
    line-height: 30px;
    .item {
      display: flex;
      justify-content: space-between;
      .item-left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .mover {
          margin-right: 8px;
          padding-top: 3px;
          cursor: move;
        }
      }
      .item-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex: 1;
        padding-top: 3px;
        .iconfont {
          cursor: pointer;
        }
        .isLeft {
          color: var(--el-color-primary);
        }
      }
    }
  }
}
</style>
