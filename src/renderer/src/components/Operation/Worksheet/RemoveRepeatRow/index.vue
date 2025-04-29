<template>
  <Base
    :title="titleMap.worksheet.removeRepeatRow.title"
    :icon="titleMap.worksheet.removeRepeatRow.icon"
    @remove="emits('remove')"
    :open="rule.length != 0"
  >
    <template #after>
      <Button @click="handleAdd">添加条件</Button>
    </template>

    <Drag v-model="rule" group="removeRepeatRow" class="gap-1.5">
      <Item
        v-for="(_, i) of rule"
        :key="nanoid()"
        v-model="rule[i]"
        @remove="handleRemove(i)"
      />
    </Drag>
  </Base>
</template>

<script setup lang="ts">
import Button from "@/components/Input/Button.vue";
import Drag from "@/components/Drag.vue";
import Base from "@/components/Operation/Base/index.vue";
import Item from "./Item.vue";
import { nanoid } from "nanoid";
import { RemoveRepeatRow } from "@type/operation";
import { titleMap } from "@/components/Operation/index";

const props = defineProps<{
  index: number[];
}>();

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<RemoveRepeatRow[]>({
  required: true,
});

//添加条件
const handleAdd = () => {
  rule.value.push({
    col: {
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
