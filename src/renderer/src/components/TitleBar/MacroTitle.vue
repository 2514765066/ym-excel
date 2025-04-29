<template>
  <Rename
    v-if="selectedMacro"
    placeholder="新建宏"
    v-model:visible="visible"
    v-model="selectedMacro"
  >
    <section
      class="h-6 rounded-md flex items-center gap-1.5 px-1.5 cursor-pointer"
      @click="visible = true"
    >
      <Icon name="macro" size="20" color="#989898"></Icon>

      <span class="text-sm text-color">
        {{ selectedMacro?.name || "新建宏" }}
      </span>
    </section>
  </Rename>
</template>

<script setup lang="ts">
import { useMacroStore } from "@/stores/macroStore";
import Rename from "@/components/Tooltip/Rename.vue";

const { selectedMacro } = storeToRefs(useMacroStore());

const visible = ref(false);
</script>

<style scoped lang="scss">
section {
  transition: 0.1s;

  &:hover {
    background-color: #262626;
  }
}
</style>
