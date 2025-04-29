<template>
  <main class="app grid">
    <TitleBar />

    <ListBar v-if="!isTest" />

    <RouterView />
  </main>
</template>

<script setup lang="ts">
import ListBar from "@/components/ListBar/index.vue";
import TitleBar from "@/components/TitleBar/index.vue";
import { ElMessage } from "element-plus";
import eventEmitter from "./hooks/eventEmitter";
import { isTest } from "./hooks/useTest";

eventEmitter.on("error:show", (message: string) => {
  ElMessage({
    plain: true,
    message,
    type: "error",
    grouping: true,
  });
});

eventEmitter.on("success:show", (message: string) => {
  ElMessage({
    plain: true,
    message,
    type: "success",
    grouping: true,
  });
});
</script>

<style scoped lang="scss">
.app {
  --list-bar-width: calc(v-bind("isTest ? 0 : 240") * 1px);

  grid-template-rows: 44px calc(100vh - 44px);
  grid-template-columns: var(--list-bar-width) calc(
      100vw - var(--list-bar-width)
    );

  grid-template-areas:
    "list-bar title-bar"
    "list-bar main";

  background-color: #191919;

  > *:last-child {
    grid-area: main;
  }
}
</style>
