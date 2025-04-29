<template>
  <li
    class="flex items-center px-2 gap-1.5 rounded-md w-full"
    :title="data.name"
  >
    <Rename v-model:visible="visible" v-model="data" placeholder="模板名称">
      <Icon name="table" size="20" color="#989898" />
    </Rename>

    <span
      class="text-sm text-ellipsis overflow-hidden mr-auto whitespace-nowrap"
    >
      {{ data.name || "新建模板" }}
    </span>

    <Menu :data="menu" placement="bottom-start">
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
import { Template } from "@type/index";
import { useTemplateStore } from "@/stores/templateStore";
import Rename from "@/components/Tooltip/Rename.vue";
import { Menu } from "@/components/Tooltip/Menu";

const { remove } = useTemplateStore();

const data = defineModel<Template>({
  required: true,
});

const emist = defineEmits<{
  click: [];
}>();

//重命名是否显示
const visible = ref(false);

const menu = [
  {
    title: "更多操作",
    children: [
      {
        title: "编辑模板",
        icon: "open",
        onSelect() {
          ipcRenderer.send("openTemplate", data.value.id);
        },
      },
      {
        title: "重命名模板",
        icon: "rename",
        onSelect() {
          visible.value = true;
        },
      },
      {
        title: "删除模板",
        icon: "remove",
        hoverColor: "#EB5757",
        onSelect() {
          remove(data.value.id);
        },
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
