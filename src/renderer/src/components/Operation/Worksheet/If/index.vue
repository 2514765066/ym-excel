<template>
  <Base
    :title="titleMap.worksheet.if_.title"
    :icon="titleMap.worksheet.if_.icon"
    @remove="emits('remove')"
    :open="rule.length != 0"
  >
    <Item v-for="(_, index) of rule" :key="nanoid()" v-model="rule[index]" />

    <slot></slot>
  </Base>
</template>

<script setup lang="ts">
import Base from "@/components/Operation/Base/index.vue";
import Item from "./Item.vue";
import { nanoid } from "nanoid";
import { If_ } from "@type/operation";
import { titleMap } from "@/components/Operation/index";

const props = defineProps<{
  index: number[];
}>();

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<If_[]>({ required: true });

//添加条件
const handleAdd = () => {
  rule.value.push({
    init: {
      text: "",
      validate: false,
      mode: "input",
    },
    sym: {
      text: "",
      validate: false,
      mode: "input",
    },
    value: {
      text: "",
      validate: false,
      mode: "input",
    },
  });
};

if (rule.value.length == 0) {
  handleAdd();
}

provide("index", props.index);
</script>

<style scoped lang="scss"></style>
