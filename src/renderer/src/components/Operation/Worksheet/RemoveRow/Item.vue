<template>
  <Base @remove="emits('remove')">
    <template #before>
      <span class="text-color text-sm">从</span>

      <SwitchInput v-model="rule.row" type="row" />

      <span class="text-color text-sm">行开始，删除</span>

      <SwitchInput v-model="rule.count" type="number" />

      <span class="text-color text-sm">行</span>
    </template>
  </Base>
</template>

<script setup lang="ts">
import Base from "@/components/Operation/Base/index.vue";
import SwitchInput from "@/components/SwitchInput/index.vue";
import { RemoveRow } from "@type/operation";

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<RemoveRow>({ required: true });
</script>

<style scoped lang="scss"></style>
