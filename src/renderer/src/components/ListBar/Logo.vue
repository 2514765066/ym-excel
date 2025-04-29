<template>
  <section class="w-full h-9 flex px-2">
    <div class="w-full h-fit flex items-center">
      <img src="@/assets/icon.png" width="18px" />

      <span class="ml-2 text-color text-lg">{{ name }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
const name = __APP_NAME__;
</script>

<style scoped lang="scss">
section {
  -webkit-app-region: drag;

  span {
    font-family: logo;
  }
}
</style>
