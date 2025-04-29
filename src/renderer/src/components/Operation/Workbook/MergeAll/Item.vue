<template>
  <Base @remove="emits('remove')">
    <template #before>
      <span class="text-color text-sm">合并后，新表格的名称</span>
      <SwitchInput type="table" v-model="rule.table" />
    </template>
  </Base>
</template>

<script setup lang="ts">
import SwitchInput from "@/components/SwitchInput/index.vue";
import Base from "@/components/Operation/Base/index.vue";
import { MergeAll } from "@type/operation";

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<MergeAll>({
  required: true,
});
</script>

<style scoped lang="scss"></style>
