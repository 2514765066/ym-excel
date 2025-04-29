<template>
  <Base @remove="emits('remove')">
    <template #before>
      <span class="text-color text-sm">把</span>

      <SwitchInput type="col" v-model="rule.col" />

      <span class="text-color text-sm">列，移动到</span>

      <SwitchInput type="col" v-model="rule.to" />

      <span class="text-color text-sm">列</span>
    </template>
  </Base>
</template>

<script setup lang="ts">
import Base from "@/components/Operation/Base/index.vue";
import SwitchInput from "@/components/SwitchInput/index.vue";
import { MoveCol } from "@type/operation";

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<MoveCol>({ required: true });
</script>

<style scoped lang="scss"></style>
