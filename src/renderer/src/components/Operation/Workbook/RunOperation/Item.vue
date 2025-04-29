<template>
  <Base @remove="emits('remove')">
    <template #before>
      <span class="text-color text-sm">对</span>

      <SwitchInput type="table" v-model="rule.table" />

      <span class="text-color text-sm">运行工作表操作</span>
    </template>
  </Base>
</template>

<script setup lang="ts">
import SwitchInput from "@/components/SwitchInput/index.vue";
import Base from "@/components/Operation/Base/index.vue";
import { RunOperation } from "@type/operation";

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<RunOperation>({
  required: true,
});
</script>

<style scoped lang="scss"></style>
