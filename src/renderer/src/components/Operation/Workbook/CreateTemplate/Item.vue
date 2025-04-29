<template>
  <Base @remove="emits('remove')">
    <template #before>
      <span class="text-color text-sm">使用模板</span>

      <Select
        title="可用模板"
        :data="menu"
        v-model="rule.template"
        placeholder="请选择模板"
      />

      <span class="text-color text-sm">，添加到工作区的表格名称</span>

      <SwitchInput type="table" v-model="rule.table" />
    </template>
  </Base>
</template>

<script setup lang="ts">
import SwitchInput from "@/components/SwitchInput/index.vue";
import Select from "@/components/Select.vue";
import Base from "@/components/Operation/Base/index.vue";
import { CreateTemplate } from "@type/operation";
import { useTemplateStore } from "@/stores/templateStore";

const { data } = storeToRefs(useTemplateStore());

const emits = defineEmits<{
  remove: [];
}>();

const rule = defineModel<CreateTemplate>({
  required: true,
});

const menu = computed(() => {
  return data.value.map(item => {
    return {
      title: item.name,
      value: item.id,
    };
  });
});
</script>

<style scoped lang="scss"></style>
