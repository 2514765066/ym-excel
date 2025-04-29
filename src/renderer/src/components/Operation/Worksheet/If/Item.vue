<template>
  <Base @remove="emits('remove')" :drag="false">
    <template #before>
      <span class="text-color text-sm">当</span>

      <SwitchInput type="all" v-model="rule.init" />

      <Select
        :data="menu"
        v-model="rule.sym"
        placeholder="运算符"
        width="150"
      />

      <SwitchInput type="all" v-model="rule.value" />

      <span class="text-color text-sm">时运行内部操作</span>
    </template>
  </Base>
</template>

<script setup lang="ts">
import SwitchInput from "@/components/SwitchInput/index.vue";
import Base from "@/components/Operation/Base/index.vue";
import Select from "@/components/Select.vue";
import { If_ } from "@type/operation";

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<If_>({
  required: true,
});

const menu = [
  {
    sub: "==",
    value: "==",
    title: "等于",
  },
  {
    sub: "!=",
    value: "!=",
    title: "不等于",
  },
  {
    sub: " >",
    value: ">",
    title: "大于",
  },
  {
    sub: " >=",
    value: ">=",
    title: "大于等于",
  },
  {
    sub: "<",
    value: "<",
    title: "小于",
  },
  {
    sub: "<=",
    value: "<=",
    title: "小于等于",
  },
];
</script>

<style scoped lang="scss"></style>
