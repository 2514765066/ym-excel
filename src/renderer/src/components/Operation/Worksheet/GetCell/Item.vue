<template>
  <Base @remove="emits('remove')">
    <template #before>
      <span class="text-color text-sm">获取</span>

      <SwitchInput type="col" v-model="rule.col" />

      <span class="text-color text-sm">:</span>

      <SwitchInput type="row" v-model="rule.row" />

      <span class="text-color text-sm">的内容，并赋值到</span>

      <SwitchInput type="text" v-model="rule.res" only="var" />
    </template>
  </Base>
</template>

<script setup lang="ts">
import SwitchInput from "@/components/SwitchInput/index.vue";
import Base from "@/components/Operation/Base/index.vue";
import { GetCell } from "@type/operation";

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<GetCell>({
  required: true,
});
</script>

<style scoped lang="scss"></style>
