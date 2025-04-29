<template>
  <section class="title-bar px-2 flex items-center gap-2">
    <Icon name="test" size="18" color="#989898" />

    <span class="text-sm text-color mr-auto">测试窗口</span>

    <Tip content="关闭测试窗口">
      <button
        class="w-5 h-5 rounded flex justify-center items-center"
        @click="emits('close')"
      >
        <Icon name="add" size="18" color="#989898" rotate="45" />
      </button>
    </Tip>
  </section>
</template>

<script setup lang="ts">
import Tip from "@/components/Tooltip/Tip.vue";

const emits = defineEmits<{
  close: [];
}>();
</script>

<style scoped lang="scss">
.title-bar {
  grid-area: title-bar;

  background-color: #1f1f1f;
  border-top: 1px solid #2b2b2b;

  > button {
    transition: 0.1s;

    &:hover {
      background-color: #2c2c2c;
    }
  }
}
</style>
