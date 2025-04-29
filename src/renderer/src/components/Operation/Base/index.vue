<template>
  <li class="base-block text-color">
    <section
      class="flex items-center flex-wrap gap-1.5 relative px-2 rounded-md py-1"
    >
      <aside class="flex absolute opacity-0 left-0">
        <Menu :data="menu" v-if="drag">
          <button
            class="handle flex justify-center items-center rounded cursor-grab active:cursor-grabbing"
          >
            <Icon name="move" size="20" color="#7F7F7F" />
          </button>
        </Menu>
      </aside>

      <slot name="before">
        <Icon :name="icon" size="20" color="#989898" v-if="icon" />
        <span class="text-sm">{{ title }}</span>
      </slot>

      <div class="ml-auto" v-if="$slots.after">
        <slot name="after"></slot>
      </div>
    </section>

    <ul
      class="my-1.5 ml-2.5 pl-8 flex flex-col gap-1.5"
      v-if="$slots.default && open"
    >
      <slot></slot>
    </ul>

    <section
      class="flex items-center gap-1 px-2 rounded"
      v-if="$slots.default && open"
    >
      <span class="text-sm">结束</span>
    </section>
  </li>
</template>

<script setup lang="ts">
import { Menu } from "@/components/Tooltip/Menu";
import { useOperationStore } from "@/stores/operationStore";
import { docsBaseUrl } from "@/router/base";

const { selectedNamespace } = storeToRefs(useOperationStore());

const props = withDefaults(
  defineProps<{
    title?: string;
    icon?: string;
    drag?: boolean;
    open?: boolean;
  }>(),
  {
    drag: true,
    open: true,
  }
);

const emits = defineEmits<{
  remove: [];
}>();

const menu = [
  {
    title: "更多操作",
    children: [
      {
        title: "查看帮助",
        icon: "book",
        onSelect() {
          api.openUrl(
            `${docsBaseUrl}/tutorial/${selectedNamespace.value}.html#${props.title}`
          );
        },
      },
      {
        title: "删除操作",
        icon: "remove",
        hoverColor: "#EB5757",
        onSelect() {
          emits("remove");
        },
      },
    ],
  },
];
</script>

<style scoped lang="scss">
.base-block {
  > section {
    min-height: 34px;
    background-color: #202020;

    > aside {
      transform: translateX(calc(-100% - 4px));
      transition: 0.2s;

      > button {
        $size: 24px;
        width: $size;
        height: $size;

        &:hover {
          background-color: #262626;
        }
      }
    }

    &:hover {
      & > aside {
        opacity: 1;
      }
    }
  }

  > ul {
    border-left: 1.5px solid #373737;
  }
}
</style>
