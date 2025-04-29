<template>
  <header class="flex items-center h-11 py-2 px-4">
    <span class="text-color text-sm mr-auto">模板</span>

    <Tip content="添加模板">
      <button
        class="w-6 h-6 rounded flex items-center justify-center"
        @click="add"
      >
        <Icon name="add" size="18" color="#7F7F7F" />
      </button>
    </Tip>
  </header>

  <section class="px-2 mb-4">
    <Text placeholder="搜索模板..." class="mb-2" v-model.lazy="keyword" />
  </section>

  <Empty v-if="data.length == 0" />

  <ElScrollbar view-class="px-2">
    <Drag v-model="data" group="templateDrawer" class="gap-1">
      <Item
        v-for="(item, index) of data"
        :key="item.id"
        class="handle"
        v-show="isShow(item.name)"
        v-model="data[index]"
        @click="emits('close')"
      />
    </Drag>
  </ElScrollbar>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";
import Empty from "@/components/Empty.vue";
import Drag from "@/components/Drag.vue";
import Text from "@/components/Text.vue";
import Tip from "@/components/Tooltip/Tip.vue";
import Item from "@/components/TemplateItem.vue";
import { useTemplateStore } from "@/stores/templateStore";

const { data } = storeToRefs(useTemplateStore());
const { add } = useTemplateStore();

const emits = defineEmits<{
  close: [];
}>();

//关键词
const keyword = ref("");

//是否显示
const isShow = (name: string) => {
  return (name || "新建模板").includes(keyword.value);
};
</script>

<style scoped lang="scss">
header {
  > button {
    transition: 0.1s;

    &:hover {
      background-color: #262626;
    }
  }
}
</style>
