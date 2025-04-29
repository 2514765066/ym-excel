<template>
  <header class="py-3 flex items-center sticky top-0 z-10">
    <Tab :data="tabData" v-model="selectedNamespace" class="mr-1" />

    <button
      class="flex items-center gap-1 rounded-md px-1.5"
      @click="handleOperation"
    >
      <Icon name="add1" size="16" color="#5A5A5A" />
      <span class="text-sm text-color-darken">添加操作</span>
    </button>

    <!-- <Menu :data="menu">
    
    </Menu> -->

    <button
      class="flex items-center gap-1 rounded-md px-1.5"
      @click="handleRun"
    >
      <Icon name="run" size="16" color="#5A5A5A" />
      <span class="text-sm text-color-darken">运行宏</span>
    </button>

    <button
      class="flex items-center gap-1 rounded-md px-1.5"
      @click="handleTest"
    >
      <Icon name="test" size="16" color="#5A5A5A" />
      <span class="text-sm text-color-darken">测试宏</span>
    </button>
  </header>
</template>

<script setup lang="ts">
import Tab from "@/components/Tab.vue";
import { useMacroStore } from "@/stores/macroStore";
import { useMacro } from "@/hooks/useMacro";
import { useOperationStore } from "@/stores/operationStore";
import eventEmitter from "@/hooks/eventEmitter";

const { selectedNamespace } = storeToRefs(useOperationStore());
const { runMacro, testMacro } = useMacro();
const { selectedMacro } = storeToRefs(useMacroStore());

//tab数据
const tabData = [
  {
    title: "工作簿",
    value: "workbook",
    to: "/macro/workbook",
  },
  {
    title: "工作表",
    value: "worksheet",
    to: "/macro/worksheet",
  },
];

//处理操作
const handleOperation = () => {
  eventEmitter.emit("operationDrawer:show");
};

//处理运行宏
const handleRun = () => {
  if (!selectedMacro.value) {
    return;
  }

  runMacro(selectedMacro.value.id);
};

//处理测试宏
const handleTest = () => {
  if (!selectedMacro.value) {
    return;
  }

  testMacro(selectedMacro.value.id);
};
</script>

<style scoped lang="scss">
header {
  background-color: #191919;
  box-shadow: 5px 0 10px 5px #191919;

  > button {
    height: 28px;

    transition: 0.1s;

    &:hover {
      background-color: #262626;
    }
  }
}
</style>
