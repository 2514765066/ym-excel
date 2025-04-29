<template>
  <i :style="{ 'mask-image': `url(${maskUrl})` }" class="shrink-0 block"></i>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size: string;
    color: string;
    name: string;
    rotate?: number | string;
  }>(),
  {
    rotate: 0,
  }
);

const maskUrl = ref(
  new URL(`../assets/svg/${props.name}.svg`, import.meta.url)
);
</script>

<style scoped lang="scss">
i {
  width: calc(v-bind("size") * 1px);
  height: calc(v-bind("size") * 1px);

  background-color: v-bind("color");
  mask-repeat: no-repeat;
  mask-position: center;
  transform: rotate(calc(v-bind("rotate") * 1deg));
  transition: 0.1s;
}
</style>
