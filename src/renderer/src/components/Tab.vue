<template>
  <section class="flex items-center rounded-md p-1">
    <div
      v-for="item of data"
      :key="item.value"
      :class="{ active: selectedValue == item.value }"
      class="h-full rounded text-xs flex items-center justify-center cursor-pointer"
      @click="handleClick(item.value)"
    >
      {{ item.title }}
    </div>
  </section>
</template>

<script setup lang="ts">
type Value = string | number | symbol;

type Item = {
  title: string;
  value: Value;
  to: string;
};

defineProps<{
  data: Item[];
}>();

//当前选中的value
const selectedValue = defineModel<Value>();

const handleClick = (value: Value) => {
  selectedValue.value = value;
};
</script>

<style scoped lang="scss">
section {
  height: 32px;
  background-color: #222;

  > div {
    width: 70px;
    transition: 0.1s;
    color: rgba(#fff, 0.282);
  }

  .active {
    background-color: #191919;
    color: rgba(#fff, 0.81);
  }
}
</style>
