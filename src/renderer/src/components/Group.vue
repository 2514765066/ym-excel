<template>
  <section class="group">
    <header class="h-12 flex items-center gap-2">
      <Icon :name="icon" size="16" color="#989898" v-if="icon"></Icon>

      <span class="text-xs mr-auto">{{ title }}</span>

      <slot name="after"></slot>
    </header>

    <main>
      <slot></slot>
    </main>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  icon?: string;
}>();
</script>

<style scoped lang="scss">
.group {
  > header {
    > span {
      color: #7f7f7f;
    }
  }
}
</style>
