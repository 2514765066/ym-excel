<template>
  <VueDraggable
    v-model="model"
    :tag="tag"
    :group="group"
    :animation="150"
    class="flex flex-col"
    style="min-height: 34px"
    handle=".handle"
  >
    <slot></slot>
  </VueDraggable>
</template>

<script setup lang="ts">
import { VueDraggable } from "vue-draggable-plus";

withDefaults(
  defineProps<{
    group: string;
    tag?: string;
  }>(),
  {
    tag: "ul",
  }
);

const model = defineModel<any[]>({
  required: true,
});
</script>

<style scoped lang="scss"></style>
