<template>
  <ElScrollbar class="list-bar" view-class=" h-full">
    <section class="p-2 flex flex-col">
      <ListGroup title="运行结果">
        <Item v-for="item of data" :key="item.name" :data="item" />
      </ListGroup>
    </section>
  </ElScrollbar>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";
import ListGroup from "@/components/ListGroup.vue";
import Item from "./Item.vue";
import { useTableStore } from "@/stores/tableStore";

const { data } = storeToRefs(useTableStore());
</script>

<style scoped lang="scss">
.list-bar {
  width: 240px;
  grid-area: list-bar;

  border-top: 1px solid #2b2b2b;
  background-color: #1f1f1f;
}
</style>
