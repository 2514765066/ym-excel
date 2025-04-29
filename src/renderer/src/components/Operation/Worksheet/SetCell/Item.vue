<template>
  <Base @remove="emits('remove')">
    <template #before>
      <span class="text-color text-sm">设置</span>

      <SwitchInput type="col" v-model="rule.col" />

      <span class="text-color text-sm">:</span>

      <SwitchInput type="row" v-model="rule.row" />

      <span class="text-color text-sm">的内容为</span>

      <SwitchInput type="text" v-model="rule.value" />
    </template>
  </Base>
</template>

<script setup lang="ts">
import SwitchInput from "@/components/SwitchInput/index.vue";
import Base from "@/components/Operation/Base/index.vue";
import { SetCell } from "@type/operation";

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<SetCell>({
  required: true,
});
</script>

<style scoped lang="scss"></style>
