<template>
  <Mask v-model="visible">
    <component :is="componentMap[selectedDrawer]" @close="handleClose" />
  </Mask>
</template>

<script setup lang="ts">
import Mask from "./Mask.vue";
import macroDrawer from "./MacroDrawer.vue";
import templateDrawer from "./TemplateDrawer.vue";
import operationDrawer from "./OperationDrawer.vue";
import eventEmitter from "@/hooks/eventEmitter";

const visible = ref(false);

const componentMap = {
  macroDrawer,
  templateDrawer,
  operationDrawer,
};

const selectedDrawer = ref<keyof typeof componentMap>("macroDrawer");

const handleClose = () => {
  visible.value = false;
};

eventEmitter.on("macroDrawer:show", () => {
  selectedDrawer.value = "macroDrawer";

  visible.value = true;
});

eventEmitter.on("templateDrawer:show", () => {
  selectedDrawer.value = "templateDrawer";

  visible.value = true;
});

eventEmitter.on("operationDrawer:show", () => {
  selectedDrawer.value = "operationDrawer";

  visible.value = true;
});
</script>

<style scoped lang="scss"></style>
