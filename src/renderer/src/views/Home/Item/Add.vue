<template>
  <section
    class="flex flex-col justify-end rounded-2xl overflow-hidden cursor-pointer"
    @click="add"
  >
    <div class="px-4 pb-3 pt-6 relative flex flex-col">
      <aside class="absolute top-0 -translate-y-1/2">
        <Icon name="add2" size="28" color="#868686" class="" />
      </aside>

      <p class="text-sm text-color-darken">新建宏</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useMacroStore } from "@/stores/macroStore";

const { add } = useMacroStore();
</script>

<style scoped lang="scss">
section {
  width: 145px;
  height: 145px;

  background-color: #2c2c2c;

  outline: 1.5px solid transparent;

  > div {
    height: 70%;
    background-color: #252525;
  }

  &:hover {
    outline-color: #303030;
  }
}
</style>
