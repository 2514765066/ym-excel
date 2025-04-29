<template>
  <main
    class="test w-full grid absolute left-0 bottom-0 z-10"
    v-if="testWinVisible"
  >
    <ResizeBar />

    <TitleBar @close="handleClose" />

    <ListBar />

    <div class="flex flex-col">
      <Table :data="selectedSheet?.data" />
      <SheetBar />
    </div>
  </main>
</template>

<script setup lang="ts">
import Table from "@/components/Table/index.vue";
import SheetBar from "@/components/Table/SheetBar.vue";
import ListBar from "./ListBar/index.vue";
import TitleBar from "./TitleBar/index.vue";
import ResizeBar from "./ResizeBar.vue";
import { testWinVisible, testWinHeight } from "@/hooks/useTest";
import { useTableStore } from "@/stores/tableStore";

const { selectedSheet } = storeToRefs(useTableStore());

//关闭测试窗口
const handleClose = () => {
  testWinVisible.value = false;
};
</script>

<style scoped lang="scss">
.test {
  height: calc(v-bind("testWinHeight") * 1px);

  grid-template-rows: 3px 30px calc(100% - 33px);
  grid-template-columns: 240px calc(100% - 240px);
  grid-template-areas:
    "resize-bar resize-bar"
    "title-bar title-bar"
    "list-bar main";

  > div:last-child {
    grid-area: main;
    background-color: #1f1f1f;
  }
}
</style>
