<template>
  <YmVirtualizedTable
    :data="data"
    cell-bg-color="#191919"
    cell-color="#C6C6C6"
    header-bg-color="#1e1e1e"
    header-color="#989898"
    select-bg-color="#1A2735"
    border-color="#2D2D2D"
  />
</template>

<script setup lang="ts">
import { YmVirtualizedTable } from "ym-virtualized-table";
import "ym-virtualized-table/es/style.css";

defineProps<{
  data?: any[][];
}>();
</script>

<style scoped lang="scss"></style>
