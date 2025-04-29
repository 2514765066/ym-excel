<template>
  <section @mousedown="handleMousedown"></section>
</template>

<script setup lang="ts">
import { testWinHeight } from "@/hooks/useTest";

const handleMousedown = (e: MouseEvent) => {
  e.preventDefault();

  document.body.style.cursor = "ns-resize";

  function onMouseMove(e: MouseEvent) {
    testWinHeight.value = window.innerHeight - e.clientY;
  }

  function onMouseUp() {
    document.body.style.cursor = "unset";
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};
</script>

<style scoped lang="scss">
section {
  grid-area: resize-bar;

  &:hover {
    cursor: ns-resize;
    background-color: #2383e2;
  }
}
</style>
