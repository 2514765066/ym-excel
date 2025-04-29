<template>
  <Base :drag="false">
    <template #before>
      <span class="text-color text-sm">遍历</span>
      <SwitchInput v-model="rule.area" type="area" />

      <span class="text-color text-sm"> 区域，每次遍历把单元格赋值到</span>

      <SwitchInput v-model="rule.cell" type="cell" only="var" />
    </template>
  </Base>
</template>

<script setup lang="ts">
import Base from "@/components/Operation/Base/index.vue";
import SwitchInput from "@/components/SwitchInput/index.vue";
import { EachCell } from "@type/operation";

const rule = defineModel<EachCell>({
  required: true,
});
</script>

<style scoped lang="scss"></style>
