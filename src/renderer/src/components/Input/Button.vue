<template>
  <button
    class="px-3 rounded flex items-center text-xs cursor-pointer text-color"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
button {
  height: 24px;
  background-color: #2a2a2a;
  transition: 0.1s;

  &:hover {
    background-color: lighten(#2a2a2a, 2);
  }
}
</style>
