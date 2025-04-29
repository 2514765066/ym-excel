<template>
  <Base @remove="emits('remove')">
    <template #before>
      <span class="text-color text-sm">从</span>

      <SwitchInput type="col" v-model="rule.col" />

      <span class="text-color text-sm">列开始，删除</span>

      <SwitchInput type="number" v-model="rule.count" />

      <span class="text-color text-sm">列</span>
    </template>
  </Base>
</template>

<script setup lang="ts">
import Base from "@/components/Operation/Base/index.vue";
import SwitchInput from "@/components/SwitchInput/index.vue";
import { RemoveCol } from "@type/operation";

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<RemoveCol>({ required: true });
</script>

<style scoped lang="scss"></style>
