<template>
  <Base @remove="emits('remove')">
    <template #before>
      <span class="text-color text-sm">把</span>

      <SwitchInput v-model="rule.area" type="area" />

      <span class="text-color text-sm">中的</span>

      <SwitchInput v-model="rule.search" type="text" />

      <span class="text-color text-sm">替换成</span>

      <SwitchInput v-model="rule.replace" type="text" />
    </template>
  </Base>
</template>

<script setup lang="ts">
import Base from "@/components/Operation/Base/index.vue";
import SwitchInput from "@/components/SwitchInput/index.vue";
import { ReplaceCellValue } from "@type/operation";

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<ReplaceCellValue>({ required: true });
</script>

<style scoped lang="scss"></style>
