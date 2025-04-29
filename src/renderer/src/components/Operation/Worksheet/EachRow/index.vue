<template>
  <Base
    :title="titleMap.worksheet.eachRow.title"
    :icon="titleMap.worksheet.eachRow.icon"
    @remove="emits('remove')"
  >
    <template #after>
      <Button @click="handleAdd">添加条件</Button>
    </template>

    <Drag
      v-model="rule"
      group="eachRow"
      v-if="rule.length != 0"
      class="gap-1.5"
    >
      <Item
        v-for="(_, i) of rule"
        :key="nanoid()"
        v-model="rule[i]"
        @remove="handleRemove(i)"
      />
    </Drag>

    <slot></slot>
  </Base>
</template>

<script setup lang="ts">
import Button from "@/components/Input/Button.vue";
import Base from "@/components/Operation/Base/index.vue";
import Drag from "@/components/Drag.vue";
import Item from "./Item.vue";
import { nanoid } from "nanoid";
import { EachRow } from "@type/operation";
import { titleMap } from "@/components/Operation/index";

const props = defineProps<{
  index: number[];
}>();

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<EachRow[]>({
  required: true,
});

//添加条件
const handleAdd = () => {
  rule.value.push({
    row: {
      text: "",
      validate: false,
      mode: "input",
    },
  });
};

//删除条件
const handleRemove = (index: number) => {
  rule.value.splice(index, 1);
};

if (rule.value.length == 0) {
  handleAdd();
}

provide("index", props.index);
</script>

<style scoped lang="scss"></style>
