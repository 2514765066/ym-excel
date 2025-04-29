<template>
  <section class="list-bar flex flex-col items-center gap-1 p-2">
    <Logo />

    <Item title="主页" to="/home" icon="home" />

    <Item title="模板" icon="template" class="mb-2" @click="handleTemplate" />

    <TableGroup class="mb-2" />

    <MacroGroup />

    <Bottom class="mt-auto" />

    <Drawer />
  </section>
</template>

<script setup lang="ts">
import Bottom from "./Bottom/index.vue";
import Drawer from "@/components/Drawer/index.vue";
import Logo from "./Logo.vue";
import MacroGroup from "./MacroGroup/index.vue";
import TableGroup from "./TableGroup/index.vue";
import Item from "./Item.vue";
import eventEmitter from "@/hooks/eventEmitter";

const handleTemplate = () => {
  eventEmitter.emit("templateDrawer:show");
};
</script>

<style scoped lang="scss">
.list-bar {
  grid-area: list-bar;

  background-color: #202020;
  border: 1px solid #2b2b2b;

  &:hover {
    > section {
      > button {
        opacity: 1;
      }
    }
  }
}
</style>
