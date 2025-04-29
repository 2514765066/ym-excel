<template>
  <section class="title-bar flex items-center gap-1 pl-3">
    <Tip content="退出测试环境" v-if="isTest">
      <button
        class="w-6 h-6 rounded-md flex items-center justify-center active"
        @click="exitTest"
      >
        <Icon name="arrow1" color="#ffffffcf" size="18" />
      </button>
    </Tip>

    <Nav v-else />

    <Tip content="添加宏" v-if="!isTest">
      <button
        class="w-6 h-6 rounded-md flex items-center justify-center active"
        @click="add"
      >
        <Icon name="add" color="#ffffffcf" size="18" />
      </button>
    </Tip>

    <MacroTitle v-if="route.path.includes('/macro')" />

    <TableTitle v-if="route.path.includes('/table')" />

    <Menu :data="menu" placement="bottom">
      <button
        class="w-6 h-6 rounded-md flex items-center justify-center active ml-auto"
      >
        <Tip content="导入等操作..." placement="left">
          <Icon name="more" size="18" color="#ffffffcf"></Icon>
        </Tip>
      </button>
    </Menu>
  </section>
</template>

<script setup lang="ts">
import Nav from "./Nav.vue";
import MacroTitle from "./MacroTitle.vue";
import TableTitle from "./TableTitle.vue";
import Tip from "@/components/Tooltip/Tip.vue";
import { Menu } from "@/components/Tooltip/Menu";
import { useMacroStore } from "@/stores/macroStore";
import { isTest, exitTest } from "@/hooks/useTest";

const { importConfig } = useMacroStore();
const { add } = useMacroStore();

const route = useRoute();

const menu = [
  {
    title: "更多操作",
    children: [
      {
        title: "导入宏",
        icon: "import",
        onSelect: importConfig,
      },
    ],
  },
];
</script>

<style scoped lang="scss">
.title-bar {
  grid-area: title-bar;
  padding-right: 140px;

  -webkit-app-region: drag;

  * {
    -webkit-app-region: no-drag;
  }

  > button {
    cursor: default;
    transition: 0.1s;
  }

  > div {
    transition: 0.1s;

    &:hover {
      background-color: #262626;
    }
  }

  :deep(.active) {
    cursor: pointer;
    &:hover {
      background-color: #262626;
    }
  }
}
</style>
