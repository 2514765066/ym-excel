<template>
  <Base @remove="emits('remove')">
    <template #before>
      <span class="text-color text-sm">类型:</span>

      <Select
        :data="menu"
        v-model="rule.type"
        width="150"
        placeholder="请选择类型"
      />

      <span class="text-color text-sm">，变量名:</span>

      <SwitchInput type="name" v-model="rule.name" only="input" />

      <span class="text-color text-sm" v-if="rule.type.text">，初始值:</span>

      <SwitchInput
        v-if="rule.type.text"
        :type="rule.type.text"
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
import { CreateVar } from "@type/operation";
import { useTypeStore } from "@/stores/typeStore";

const { selectedType } = storeToRefs(useTypeStore());
const { ignoreType } = useTypeStore();

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<CreateVar>({
  required: true,
});

const menu = computed(() => {
  return Object.entries(selectedType.value)
    .map(item => ({
      title: item[1].title,
      value: item[0],
    }))
    .filter(item => !ignoreType.includes(item.value));
});
</script>

<style scoped lang="scss"></style>
