<template>
  <Base>
    <template #before>
      <span class="text-color text-sm">每次遍历把列名赋值到</span>

      <SwitchInput v-model="rule.col" type="col" only="var" />
    </template>
  </Base>
</template>

<script setup lang="ts">
import Base from "@/components/Operation/Base/index.vue";
import SwitchInput from "@/components/SwitchInput/index.vue";
import { EachCol } from "@type/operation";

const rule = defineModel<EachCol>({
  required: true,
});
</script>

<style scoped lang="scss"></style>
