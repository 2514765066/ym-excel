<template>
  <Base @remove="emits('remove')">
    <template #before>
      <span class="text-color text-sm">在</span>

      <SwitchInput type="col" v-model="rule.col" />

      <span class="text-color text-sm">列前面，插入</span>

      <SwitchInput type="number" v-model="rule.count" />

      <span class="text-color text-sm">列空白列</span>
    </template>
  </Base>
</template>

<script setup lang="ts">
import Base from "@/components/Operation/Base/index.vue";
import SwitchInput from "@/components/SwitchInput/index.vue";
import { InsertCol } from "@type/operation";

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<InsertCol>({ required: true });
</script>

<style scoped lang="scss"></style>
