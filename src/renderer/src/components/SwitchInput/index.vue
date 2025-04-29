<template>
  <section
    class="switch-input rounded flex items-center text-xs text-color"
    :class="{ error: !model.validate }"
  >
    <Tip :content="`${selectedMode.tip}模式`" placement="top">
      <button
        class="w-5 h-full cursor-pointer shrink-0"
        :disabled="only != 'all'"
        @click="toggleMode"
      >
        {{ selectedMode.icon }}
      </button>
    </Tip>

    <section class="relative flex items-center w-full">
      <component
        :is="model.mode == 'input' ? InputMode : VarMode"
        :type-info="typeInfo"
        :type="type"
        v-model="model"
      />

      <span class="px-3 -z-10 whitespace-nowrap">
        {{ model.text || typeInfo.title }}
      </span>
    </section>
  </section>
</template>

<script setup lang="ts">
import Tip from "@/components/Tooltip/Tip.vue";
import InputMode from "./InputMode.vue";
import VarMode from "./VarMode.vue";
import { useTypeStore } from "@/stores/typeStore";
import { Data } from "@type/operation";

const { selectedType } = storeToRefs(useTypeStore());

const props = withDefaults(
  defineProps<{
    //传入类型
    type: string;

    //模式
    only?: "input" | "var" | "all";
  }>(),
  {
    only: "all",
  }
);

const model = defineModel<Data>({
  required: true,
});

//当前选中的类型信息
const typeInfo = computed(() => {
  return selectedType.value[props.type];
});

//模式映射
const modeMap = ref({
  input: {
    icon: "#",
    tip: "输入",
  },
  var: {
    icon: "$",
    tip: "变量",
  },
});

//当前选中模式信息
const selectedMode = computed(() => {
  return modeMap.value[model.value.mode];
});

//初始化信息
const init = () => {
  if (props.only != "all") {
    model.value.mode = props.only;
  }
};

init();

//切换模式
const toggleMode = () => {
  model.value.mode = model.value.mode == "input" ? "var" : "input";
};
</script>

<style scoped lang="scss">
.switch-input {
  min-width: 70px;
  height: 24px;
  background-color: #2a2a2a;

  > button {
    border-right: 1.5px solid #373737;

    &:disabled {
      cursor: not-allowed;
    }
  }
}
</style>
