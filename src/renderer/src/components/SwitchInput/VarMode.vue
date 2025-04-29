<template>
  <Menu :data="menu">
    <input
      :placeholder="typeInfo.title"
      v-model="model.text"
      class="w-full h-full text-center px-3 absolute"
      spellcheck="false"
    />
  </Menu>
</template>

<script setup lang="ts">
import { Menu } from "@/components/Tooltip/Menu";
import { useVar } from "@/hooks/useVar";
import { TypeInfo } from "@/stores/typeStore";
import { Data } from "@type/operation";

const props = defineProps<{
  type: string;
  typeInfo: TypeInfo;
}>();

const model = defineModel<Data>({
  required: true,
});

//可用变量
const { vars } = useVar(props.type);

//菜单内容
const menu = computed(() => {
  return [
    {
      title: "变量名称",
      hidden: vars.value.length == 0,
      children: vars.value.map(item => ({
        title: item.name.text,
        sub: "$",
        onSelect() {
          model.value.text = item.name.text;
        },
      })),
    },
    {
      title: "变量名称",
      hidden: vars.value.length != 0,
      children: [
        {
          sub: "暂无可用变量",
        },
      ],
    },
  ];
});

//验证
watchEffect(() => {
  model.value.validate = vars.value.some(
    item => item.name.text == model.value.text
  );
});
</script>

<style scoped lang="scss"></style>
