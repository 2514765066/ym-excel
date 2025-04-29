<template>
  <Base @remove="emits('remove')">
    <template #before>
      <span class="text-color text-sm">清空</span>

      <SwitchInput type="row" v-model="rule.row" />

      <span class="text-color text-sm">列中的所有内容</span>
    </template>
  </Base>
</template>

<script setup lang="ts">
import Base from "@/components/Operation/Base/index.vue";
import SwitchInput from "@/components/SwitchInput/index.vue";
import { ClearRow } from "@type/operation";

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<ClearRow>({ required: true });
</script>

<style scoped lang="scss"></style>
