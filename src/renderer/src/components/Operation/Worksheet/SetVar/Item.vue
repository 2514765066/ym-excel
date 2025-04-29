<template>
  <Base @remove="emits('remove')">
    <template #before>
      <span class="text-color text-sm">变量名:</span>

      <Select :data="menu" v-model="rule.name" placeholder="请选择变量" />

      <span class="text-color text-sm" v-if="selectedVar">，新值:</span>

      <SwitchInput
        v-if="selectedVar?.type.text"
        :type="selectedVar.type.text"
        v-model="rule.value"
        only="input"
      />
    </template>
  </Base>
</template>

<script setup lang="ts">
import SwitchInput from "@/components/SwitchInput/index.vue";
import Base from "@/components/Operation/Base/index.vue";
import Select from "@/components/Select.vue";
import { SetVar } from "@type/operation";
import { useVar } from "@/hooks/useVar";

const { vars } = useVar();

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<SetVar>({
  required: true,
});

const selectedVar = computed(() => {
  return vars.value.find(item => item.name.text == rule.value.name.text);
});

watch(selectedVar, val => {
  if (!val) {
    return;
  }

  rule.value.type.text = val.type.text;
});

const menu = computed(() => {
  return vars.value.map(item => ({
    title: item.name.text,
    value: item.name.text,
  }));
});
</script>

<style scoped lang="scss"></style>
