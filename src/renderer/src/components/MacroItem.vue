<template>
  <li
    class="cursor-pointer flex items-center px-2 gap-1.5 rounded-md w-full"
    :class="{
      active: route.path.includes('/macro') && selectedID == data.id,
    }"
    @click="handleClick"
  >
    <Rename v-model:visible="renameVisible" v-model="data" placeholder="新建宏">
      <Icon name="macro" size="20" color="#989898" />
    </Rename>

    <span
      class="text-sm text-ellipsis overflow-hidden mr-auto whitespace-nowrap"
    >
      {{ data.name || "新建宏" }}
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
import { Macro } from "@type/index";
import { useMacroStore } from "@/stores/macroStore";
import Rename from "@/components/Tooltip/Rename.vue";
import { Menu } from "@/components/Tooltip/Menu";
import { useMacro } from "@/hooks/useMacro";

const { runMacro, testMacro } = useMacro();
const { selectedID } = storeToRefs(useMacroStore());
const { remove, exportConfig } = useMacroStore();
const route = useRoute();
const router = useRouter();

const data = defineModel<Macro>({
  required: true,
});

const emist = defineEmits<{
  click: [];
}>();

//重命名是否显示
const renameVisible = ref(false);

//点击元素
const handleClick = () => {
  selectedID.value = data.value.id;

  router.push("/macro");

  emist("click");
};

const menu = [
  {
    title: "更多操作",
    children: [
      {
        title: "运行宏",
        icon: "run1",
        onSelect() {
          runMacro(data.value.id);
        },
      },
      {
        title: "测试宏",
        icon: "test1",
        onSelect() {
          handleClick();
          testMacro(data.value.id);
        },
      },
    ],
  },
  {
    children: [
      {
        title: "导出宏",
        icon: "export",
        onSelect() {
          exportConfig(data.value.id);
        },
      },
    ],
  },
  {
    children: [
      {
        title: "重命名宏",
        icon: "rename",
        onSelect() {
          renameVisible.value = true;
        },
      },
      {
        title: "删除宏",
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
