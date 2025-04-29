<template>
  <Base
    :title="titleMap.worksheet.setCell.title"
    :icon="titleMap.worksheet.setCell.icon"
    @remove="emits('remove')"
    :open="rule.length != 0"
  >
    <template #after>
      <Button @click.stop="handleAdd">添加条件</Button>
    </template>

    <Drag v-model="rule" group="setCell" class="gap-1.5">
      <Item
        v-for="(_, index) of rule"
        :key="nanoid()"
        v-model="rule[index]"
        @remove="handleRemove(index)"
      />
    </Drag>
  </Base>
</template>

<script setup lang="ts">
import Drag from "@/components/Drag.vue";
import Button from "@/components/Input/Button.vue";
import Base from "@/components/Operation/Base/index.vue";
import Item from "./Item.vue";
import { nanoid } from "nanoid";
import { SetCell } from "@type/operation";
import { titleMap } from "@/components/Operation/index";

const props = defineProps<{
  index: number[];
}>();

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<SetCell[]>({ required: true });

//添加条件
const handleAdd = () => {
  rule.value.push({
    row: {
      text: "",
      validate: false,
      mode: "input",
    },
    col: {
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

//删除条件
const handleRemove = (index: number) => {
  rule.value.splice(index, 1);
};

provide("index", props.index);
</script>

<style scoped lang="scss"></style>
