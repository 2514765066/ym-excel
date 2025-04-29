<template>
  <Drag v-model="model" :group="group" class="gap-1.5">
    <component
      v-for="(item, i) in model"
      :key="nanoid()"
      :is="componentsMap[item.type]"
      v-model="item.rule"
      :index="[...index, i]"
      @remove="removeHandler(i)"
    >
      <Index v-model="item.children" :index="[...index, i]" :group="group" />
    </component>
  </Drag>
</template>

<script setup lang="ts">
import Drag from "@/components/Drag.vue";
import { componentsMap } from "./index";
import { Operation } from "@type/index";
import { nanoid } from "nanoid";

withDefaults(
  defineProps<{
    index?: number[];
    group: string;
  }>(),
  {
    index: () => [],
  }
);

const model = defineModel<Operation[]>({
  default: [],
});

const removeHandler = (index: number) => {
  model.value.splice(index, 1);
};
</script>
