<template>
  <main class="flex flex-col">
    <Table :data="selectedSheet?.data" />
    <SheetBar />
  </main>
</template>

<script setup lang="ts">
import Table from "@/components/Table/index.vue";
import SheetBar from "@/components/Table/SheetBar.vue";
import { useTableStore } from "@/stores/tableStore";

const { selectedSheet } = storeToRefs(useTableStore());
</script>

<style scoped lang="scss"></style>
