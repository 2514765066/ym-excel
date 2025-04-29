<template>
  <Base @remove="emits('remove')">
    <template #before>
      <span class="text-color text-sm">计算</span>

      <SwitchInput type="all" v-model="rule.init" />

      <Select
        :data="menu"
        v-model="rule.sym"
        placeholder="运算符"
        width="100"
      />

      <SwitchInput type="all" v-model="rule.value" />

      <span class="text-color text-sm ml-2">运算结果赋值到</span>

      <SwitchInput type="all" v-model="rule.res" only="var" />
    </template>
  </Base>
</template>

<script setup lang="ts">
import SwitchInput from "@/components/SwitchInput/index.vue";
import Base from "@/components/Operation/Base/index.vue";
import Select from "@/components/Select.vue";
import { Compute } from "@type/operation";

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<Compute>({
  required: true,
});

const menu = [
  {
    sub: "加",
    value: "+",
    title: "+",
  },
  {
    sub: "减",
    value: "-",
    title: "-",
  },
  {
    sub: "乘",
    value: "*",
    title: "*",
  },
  {
    sub: "除",
    value: "/",
    title: "/",
  },
];
</script>

<style scoped lang="scss"></style>
