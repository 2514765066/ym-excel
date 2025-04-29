<template>
  <section class="list-group flex flex-col gap-1 w-full">
    <header
      class="cursor-pointer flex items-center px-2 gap-2 rounded-md"
      @click="handleToggle"
    >
      <span class="text-xs mr-auto">{{ title }}</span>

      <div class="opacity-0">
        <slot name="after"></slot>
      </div>

      <Icon
        name="arrow"
        size="16"
        color="#989898"
        style="transition: 0.1s"
        :class="{ shrink: !visible }"
      />
    </header>

    <div v-if="visible" class="flex flex-col gap-1">
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();

const visible = ref(true);

//处理显示隐藏
const handleToggle = () => {
  visible.value = !visible.value;
};
</script>

<style scoped lang="scss">
.list-group {
  > header {
    height: 30px;

    transition: 0.1s;

    > span {
      color: #9b9b9b;
    }

    &:hover {
      background-color: #2c2c2c;

      > div {
        opacity: 1;
      }
    }
  }
}

.shrink {
  transform: rotate(90deg);
}
</style>
