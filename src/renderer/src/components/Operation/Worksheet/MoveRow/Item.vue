<template>
  <Base @remove="emits('remove')">
    <template #before>
      <span class="text-color text-sm">把</span>

      <SwitchInput v-model="rule.row" type="row" />

      <span class="text-color text-sm">行，移动到</span>

      <SwitchInput v-model="rule.to" type="row" />

      <span class="text-color text-sm">行</span>
    </template>
  </Base>
</template>

<script setup lang="ts">
import Base from "@/components/Operation/Base/index.vue";
import SwitchInput from "@/components/SwitchInput/index.vue";
import { MoveRow } from "@type/operation";

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<MoveRow>({ required: true });
</script>

<style scoped lang="scss"></style>
