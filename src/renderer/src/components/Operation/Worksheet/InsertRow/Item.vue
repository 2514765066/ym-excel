<template>
  <Base @remove="emits('remove')">
    <template #before>
      <span class="text-color text-sm">在</span>

      <SwitchInput type="row" v-model="rule.row" />

      <span class="text-color text-sm">行前面，插入</span>

      <SwitchInput type="number" v-model="rule.count" />

      <span class="text-color text-sm">行空白行</span>
    </template>
  </Base>
</template>

<script setup lang="ts">
import Base from "@/components/Operation/Base/index.vue";
import SwitchInput from "@/components/SwitchInput/index.vue";
import { InsertRow } from "@type/operation";

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<InsertRow>({ required: true });
</script>

<style scoped lang="scss"></style>
