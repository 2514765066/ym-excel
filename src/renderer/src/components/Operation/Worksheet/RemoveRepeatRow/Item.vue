<template>
  <Base @remove="emits('remove')">
    <template #before>
      <span class="text-color text-sm">当</span>

      <SwitchInput type="col" v-model="rule.col" />

      <span class="text-color text-sm">列重复时</span>
    </template>
  </Base>
</template>

<script setup lang="ts">
import Base from "@/components/Operation/Base/index.vue";
import SwitchInput from "@/components/SwitchInput/index.vue";
import { RemoveRepeatRow } from "@type/operation";

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<RemoveRepeatRow>({ required: true });
</script>

<style scoped lang="scss"></style>
