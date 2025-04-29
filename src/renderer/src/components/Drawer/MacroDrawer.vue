<template>
  <header class="flex items-center h-11 py-2 px-4">
    <span class="text-color text-sm mr-auto">所有宏</span>

    <Tip content="创建宏">
      <button
        class="w-6 h-6 rounded flex items-center justify-center"
        @click="add"
      >
        <Icon name="add" size="18" color="#7F7F7F" />
      </button>
    </Tip>
  </header>

  <section class="px-2 mb-4">
    <Text placeholder="搜索宏..." v-model.lazy="keyword" />
  </section>

  <ElScrollbar view-class="px-2">
    <Drag v-model="data" group="macroDrawer" class="gap-1">
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
import Text from "@/components/Text.vue";
import Tip from "@/components/Tooltip/Tip.vue";
import Item from "@/components/MacroItem.vue";
import { useMacroStore } from "@/stores/macroStore";
import Drag from "@/components/Drag.vue";

const { data } = storeToRefs(useMacroStore());
const { add } = useMacroStore();

const emits = defineEmits<{
  close: [];
}>();

//关键词
const keyword = ref("");

//是否显示
const isShow = (name: string) => {
  return (name || "新建宏").includes(keyword.value);
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
