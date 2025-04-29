<template>
  <Base @remove="emits('remove')">
    <template #before>
      <span class="text-color text-sm">按照</span>

      <SwitchInput type="col" v-model="rule.col" />

      <span class="text-color text-sm">列，</span>

      <Select
        :data="menu"
        v-model="rule.order"
        placeholder="排序次序"
        width="150"
      />

      <span class="text-color text-sm">排序，</span>
    </template>
  </Base>
</template>

<script setup lang="ts">
import Select from "@/components/Select.vue";
import Base from "@/components/Operation/Base/index.vue";
import SwitchInput from "@/components/SwitchInput/index.vue";
import { CustomSort } from "@type/operation";

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<CustomSort>({
  required: true,
});

const menu = [
  {
    title: "升序",
    value: "asc",
  },
  {
    title: "降序",
    value: "desc",
  },
];
</script>

<style scoped lang="scss"></style>
