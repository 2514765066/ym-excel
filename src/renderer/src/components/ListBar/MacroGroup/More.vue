<template>
  <section
    class="cursor-pointer flex items-center px-2 gap-1.5 rounded-md w-full"
    @click="handleClick"
  >
    <Icon name="more" size="20" color="#989898" />

    <span
      class="text-sm text-ellipsis overflow-hidden mr-auto whitespace-nowrap"
    >
      更多
    </span>
  </section>
</template>

<script setup lang="ts">
import eventEmitter from "@/hooks/eventEmitter";

//点击元素
const handleClick = () => {
  eventEmitter.emit("macroDrawer:show");
};
</script>

<style scoped lang="scss">
section {
  height: 30px;

  transition: 0.1s;

  > span {
    color: #9b9b9b;
  }

  > button {
    transition: 0.1s;

    &:hover {
      background-color: #383838;
    }
  }

  &:hover {
    background-color: #2c2c2c;

    > button {
      opacity: 1;
    }
  }
}
</style>
