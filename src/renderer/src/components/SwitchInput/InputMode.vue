<template>
  <Tip :content="typeInfo.tip" placement="top" trigger="click">
    <input
      :placeholder="typeInfo.title"
      v-model="model.text"
      class="w-full h-full text-center px-3 absolute"
      spellcheck="false"
    />
  </Tip>
</template>

<script setup lang="ts">
import Tip from "@/components/Tooltip/Tip.vue";
import { TypeInfo } from "@/stores/typeStore";
import { Data } from "@type/operation";

const props = defineProps<{
  type: string;
  typeInfo: TypeInfo;
}>();

const model = defineModel<Data>({
  required: true,
});

//验证
watchEffect(() => {
  model.value.validate = props.typeInfo.validate(model.value.text);
});
</script>

<style scoped lang="scss"></style>
