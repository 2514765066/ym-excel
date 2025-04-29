<template>
  <Base>
    <template #before>
      <span class="text-color text-sm">每次遍历把行名赋值到</span>

      <SwitchInput v-model="rule.row" type="row" only="var" />
    </template>
  </Base>
</template>

<script setup lang="ts">
import Base from "@/components/Operation/Base/index.vue";
import SwitchInput from "@/components/SwitchInput/index.vue";
import { EachRow } from "@type/operation";

const rule = defineModel<EachRow>({
  required: true,
});
</script>

<style scoped lang="scss"></style>
