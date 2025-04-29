<template>
  <section
    class="flex flex-col justify-end rounded-2xl overflow-hidden cursor-pointer shrink-0"
    @click="handleClick"
  >
    <div class="px-4 pb-3 pt-6 relative flex flex-col">
      <aside class="absolute top-0 -translate-y-1/2">
        <Icon name="macro" size="26" color="#868686" />
      </aside>

      <p
        class="text-sm whitespace-nowrap text-ellipsis overflow-hidden text-color"
      >
        {{ data.name || "新建宏" }}
      </p>

      <span class="text-xs mt-auto text-color-darken">
        {{ data.workbook.length + data.worksheet.length }}个操作
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useMacroStore } from "@/stores/macroStore";
import { Macro } from "@type/index";

const { select } = useMacroStore();

const props = defineProps<{
  data: Macro;
}>();

//处理点击
const handleClick = () => {
  select(props.data.id);
};
</script>

<style scoped lang="scss">
section {
  width: 144px;
  height: 144px;

  background-color: #2c2c2c;

  outline: 1.5px solid transparent;

  > div {
    height: 70%;
    background-color: #252525;
  }

  &:hover {
    outline-color: #303030;
  }
}
</style>
