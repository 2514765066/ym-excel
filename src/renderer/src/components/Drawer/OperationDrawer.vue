<template>
  <header class="flex items-center h-11 py-2 px-4">
    <span class="text-color text-sm mr-auto">添加操作</span>
  </header>

  <section class="px-2 mb-4">
    <Text placeholder="搜索操作..." v-model.lazy="keyword" />
  </section>

  <ElScrollbar view-class="flex flex-col gap-1 px-2">
    <Item
      v-for="item of operation"
      :key="item.title"
      :data="item"
      v-show="isShow(item.title)"
      @click="emits('close')"
    />
  </ElScrollbar>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";
import Text from "@/components/Text.vue";
import Item from "@/components/OperationItem.vue";
import { useOperation } from "@/hooks/useOperation";

const { operation } = useOperation();

const emits = defineEmits<{
  close: [];
}>();

//关键词
const keyword = ref("");

//是否显示
const isShow = (name: string) => {
  return name.includes(keyword.value);
};
</script>

<style scoped lang="scss"></style>
