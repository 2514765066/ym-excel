<template>
  <ListGroup title="工作区">
    <template #after>
      <Menu :data="menu">
        <button
          class="more w-5 h-5 rounded flex items-center justify-center"
          @click.stop
        >
          <ToolTip content="更多操作" placement="right">
            <Icon size="14" color="#8A8A8A" name="more" />
          </ToolTip>
        </button>
      </Menu>
    </template>

    <Add v-if="data.length == 0" />

    <ElScrollbar view-class=" flex flex-col gap-1" max-height="200">
      <Item v-for="item of data" :key="item.name" :data="item" />
    </ElScrollbar>
  </ListGroup>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";
import ListGroup from "@/components/ListGroup.vue";
import { Menu } from "@/components/Tooltip/Menu";
import ToolTip from "@/components/Tooltip/Tip.vue";
import Add from "./Add.vue";
import Item from "./Item.vue";
import { useTableStore } from "@/stores/tableStore";

const { selectWorkarea } = useTableStore();
const { data } = storeToRefs(useTableStore());

const menu = [
  {
    title: "更多操作",
    children: [
      {
        title: "选择工作区",
        icon: "folder1",
        onSelect: selectWorkarea,
      },
    ],
  },
];
</script>

<style scoped lang="scss">
section {
  .more {
    transition: 0.1s;

    &:hover {
      background-color: #383838;
    }
  }
}

.shrink {
  transform: rotate(90deg);
}
</style>
