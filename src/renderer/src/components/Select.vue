<template>
  <section
    class="rounded flex items-center text-xs text-color relative"
    :class="{ error: !model.validate }"
  >
    <Menu :data="menu" :width="width">
      <input
        readonly
        :placeholder="placeholder"
        :value="selectedMenu?.title"
        class="w-full h-full text-center px-3 absolute cursor-pointer"
        spellcheck="false"
      />
    </Menu>

    <span class="opacity-0 px-3 text-center -z-10">
      {{ selectedMenu?.title || placeholder }}
    </span>
  </section>
</template>

<script setup lang="ts">
import { Menu } from "@/components/Tooltip/Menu";
import { Data } from "@type/operation";

const props = withDefaults(
  defineProps<{
    title?: string;
    width?: string | number;
    placeholder?: string;
    data: {
      title: string;
      value: string;
    }[];
  }>(),
  {
    width: 250,
  }
);

const model = defineModel<Data>({
  required: true,
});

//当前选中菜单项
const selectedMenu = computed(() => {
  return props.data.find(item => item.value == model.value.text);
});

//菜单
const menu = computed(() => {
  return [
    {
      title: props.title,
      hidden: props.data.length == 0,
      children: props.data.map(item => {
        return {
          sub: "#",
          ...item,
          onSelect() {
            model.value.text = item.value;
          },
        };
      }),
    },
    {
      hidden: props.data.length != 0,
      children: [
        {
          sub: "暂无可选内容",
        },
      ],
    },
  ];
});

watchEffect(() => {
  model.value.validate = props.data.some(
    item => item.value == model.value.text
  );
});
</script>

<style scoped lang="scss">
section {
  min-width: 70px;
  height: 24px;
  background-color: #2a2a2a;
}
</style>
