<template>
  <section
    class="rounded-md p-6 flex flex-col justify-center items-center gap-2"
  >
    <Icon name="folder" size="18" color="#606060"></Icon>

    <span class="text-sm">添加文件夹中的表格</span>

    <button class="text-xs px-3 rounded-md text-color" @click="selectWorkarea">
      选择文件夹
    </button>
  </section>
</template>

<script setup lang="ts">
import { useTableStore } from "@/stores/tableStore";

const { selectWorkarea } = useTableStore();
</script>

<style scoped lang="scss">
section {
  background-color: rgba(36, 36, 36);

  > span {
    color: #7f7f7f;
  }

  > button {
    height: 28px;
    background-color: #303030;

    &:hover {
      background-color: #2d2d2d;
    }
  }
}
</style>
