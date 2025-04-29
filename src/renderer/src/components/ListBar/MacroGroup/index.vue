<template>
  <ListGroup title="最近" v-if="data.length != 0">
    <Item
      v-for="(item, index) of data.slice(0, 5)"
      :key="item.id"
      v-model="data[index]"
    />

    <More v-if="data.length > 5" />
  </ListGroup>
</template>

<script setup lang="ts">
import More from "./More.vue";
import ListGroup from "@/components/ListGroup.vue";
import Item from "@/components/MacroItem.vue";
import { useMacroStore } from "@/stores/macroStore";

const { data } = storeToRefs(useMacroStore());
</script>

<style scoped lang="scss">
section {
  > div {
    height: 30px;

    transition: 0.1s;

    > span {
      color: #9b9b9b;
    }

    > button {
      transition: 0.1s;

      &:hover {
        background-color: #383838;
      }
    }

    &:hover {
      background-color: #2c2c2c;

      > button {
        opacity: 1;
      }

      > i {
        opacity: 1;
      }
    }
  }
}

.shrink {
  transform: rotate(90deg);
}
</style>
