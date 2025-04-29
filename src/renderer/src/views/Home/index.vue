<template>
  <Content>
    <TimeGreet class="mb-6"></TimeGreet>

    <Group title="最近使用" icon="history" class="mb-8">
      <Scroll>
        <Item v-for="item of data" :data="item" />
        <Add />
      </Scroll>
    </Group>
  </Content>
</template>

<script setup lang="ts">
import Content from "@/components/Content.vue";
import Item from "./Item/index.vue";
import Add from "./Item/Add.vue";
import Group from "@/components/Group.vue";
import TimeGreet from "./TimeGreet.vue";
import { useMacroStore } from "@/stores/macroStore";
import Scroll from "@/components/Scroll.vue";

const { data } = storeToRefs(useMacroStore());
</script>

<style scoped lang="scss"></style>
