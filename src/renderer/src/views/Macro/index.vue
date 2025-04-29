<template>
  <main>
    <Content :paddingBottom="selectedOperation.length == 0 ? 0 : testWinHeight">
      <Header class="mb-2" />

      <Operation v-model="selectedOperation" :group="selectedNamespace" />

      <span class="text-color-darken" v-if="selectedOperation.length == 0">
        点击" 添加操作 "按钮，开始编写宏
      </span>

      <Bottom class="mt-auto" v-if="selectedOperation.length == 0" />
    </Content>

    <Test />
  </main>
</template>

<script setup lang="ts">
import Bottom from "./Bottom.vue";
import Test from "@/components/Test/index.vue";
import Operation from "@/components/Operation/index.vue";
import Header from "./Header.vue";
import Content from "@/components/Content.vue";
import { useOperationStore } from "@/stores/operationStore";
import { testWinHeight } from "@/hooks/useTest";

const { selectedNamespace, selectedOperation } = storeToRefs(
  useOperationStore()
);
</script>

<style scoped lang="scss"></style>
