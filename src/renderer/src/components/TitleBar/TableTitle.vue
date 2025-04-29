<template>
  <section class="h-6 rounded-md flex items-center gap-1.5 px-1.5">
    <Icon name="table" size="20" color="#989898"></Icon>

    <span class="text-sm text-color">{{ selectedName }}</span>
  </section>
</template>

<script setup lang="ts">
import { useTableStore } from "@/stores/tableStore";

const { selectedName } = storeToRefs(useTableStore());
</script>

<style scoped lang="scss">
section {
  transition: 0.1s;

  &:hover {
    background-color: #262626;
  }
}
</style>
