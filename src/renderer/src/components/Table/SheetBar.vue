<template>
  <section class="w-full flex items-center pr-4">
    <div
      class="h-full px-4 text-xs text-color flex items-center cursor-pointer"
      :class="{ active: selectedSheetIndex == index }"
      v-for="(item, index) of selectedTable?.sheets"
      :key="item.name"
      @click="handleClick(index)"
    >
      {{ item.name }}
    </div>

    <span class="text-xs text-color ml-auto">
      列范围：A-{{ numberToCol(selectedSheet?.data[0]?.length || 1) }}
    </span>

    <span class="text-xs text-color ml-4">
      行范围：1-{{ selectedSheet?.data.length || 1 }}
    </span>
  </section>
</template>

<script setup lang="ts">
import { numberToCol } from "E:/Project/前端/ym-virtualized-table/es";
import { useTableStore } from "@/stores/tableStore";

const { selectedTable, selectedSheetIndex, selectedSheet } = storeToRefs(
  useTableStore()
);

//处理切换sheet
const handleClick = (index: number) => {
  selectedSheetIndex.value = index;
};
</script>

<style scoped lang="scss">
section {
  height: 34px;
  border-top: 1px solid #2d2d2d;
  border-left: 1px solid #2d2d2d;
  background-color: #1e1e1e;

  > div {
    border-right: 1px solid #2d2d2d;
  }

  .active {
    background-color: #191919;
  }
}
</style>
