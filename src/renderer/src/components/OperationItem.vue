<template>
  <li
    class="cursor-pointer flex items-center px-2 gap-1.5 rounded-md w-full"
    @click="handleClick"
  >
    <Icon :name="data.icon" size="20" color="#989898" />

    <span
      class="text-sm text-ellipsis overflow-hidden mr-auto whitespace-nowrap"
    >
      {{ data.title }}
    </span>

    <Menu :data="menu">
      <button
        class="w-5 h-5 rounded flex items-center justify-center opacity-0"
        @click.stop
      >
        <ToolTip content="更多操作" placement="right">
          <Icon size="16" color="#8A8A8A" name="more" />
        </ToolTip>
      </button>
    </Menu>
  </li>
</template>

<script setup lang="ts">
import ToolTip from "@/components/Tooltip/Tip.vue";
import { useOperationStore } from "@/stores/operationStore";
import { Menu } from "@/components/Tooltip/Menu";

const { add } = useOperationStore();

const props = defineProps<{
  data: {
    title: string;
    icon: string;
    type: string;
  };
}>();

const emist = defineEmits<{
  click: [];
}>();

//点击元素
const handleClick = () => {
  add(props.data.type);

  emist("click");
};

const menu = [
  {
    title: "更多操作",
    children: [
      {
        title: "查看帮助",
        icon: "book",
        onSelect() {},
      },
      {
        title: "添加操作",
        icon: "add2",
        onSelect: handleClick,
      },
    ],
  },
];
</script>

<style scoped lang="scss">
li {
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
    background-color: rgba(#fff, 0.05);

    > button {
      opacity: 1;
    }
  }
}

.active {
  background-color: rgba(#fff, 0.05);

  > span {
    color: rgba(#fff, 0.81);
  }
}
</style>
