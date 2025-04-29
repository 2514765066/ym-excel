<template>
  <section class="bottom h-40 flex flex-col justify-center gap-3">
    <span class="text-color-darken text-xs">开始使用</span>

    <div class="flex gap-2">
      <section
        class="h-8 flex gap-1 items-center p-2 pr-3 cursor-pointer"
        v-for="item of data"
        :key="item.title"
        @click="add(item.type)"
      >
        <Icon :name="item.icon" color="#D3D3D3" size="20" />
        <span class="text-color text-sm">{{ item.title }}</span>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useOperationStore } from "@/stores/operationStore";
import { useOperation } from "@/hooks/useOperation";

const { operation } = useOperation();
const { add } = useOperationStore();

const data = computed(() => {
  const res = operation.value.toSorted(() => 0.5 - Math.random());

  return res.slice(0, 4);
});
</script>

<style scoped lang="scss">
.bottom {
  > div {
    > section {
      border-radius: 1rem;
      background-color: #262626;
    }
  }
}
</style>
