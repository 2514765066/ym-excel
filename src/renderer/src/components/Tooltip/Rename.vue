<template>
  <ElTooltip
    trigger="click"
    effect="light"
    :visible="visible"
    :show-arrow="false"
    :offset="0"
    popper-class="tooltip-rename"
    placement="bottom-start"
    v-bind="$attrs"
    @show="handleTooltipShow"
  >
    <template #content>
      <section class="flex items-center gap-1.5" v-click-outside="handleClose">
        <div class="w-7 h-7 rounded flex justify-center items-center">
          <Icon name="rename" size="20" color="#868686"></Icon>
        </div>

        <input
          ref="tooltipInput"
          type="text"
          class="h-7 text-sm py-1 px-2.5 rounded text-color"
          :placeholder="placeholder"
          v-model="data!.name"
        />
      </section>
    </template>

    <slot></slot>
  </ElTooltip>
</template>

<script setup lang="ts">
import { ElTooltip, ClickOutside as vClickOutside } from "element-plus";

defineProps<{
  placeholder?: string;
}>();

const data = defineModel<{
  name: string;
}>({
  required: true,
});

//显示隐藏
const visible = defineModel<boolean>("visible", {
  required: true,
});

//输入框
const tooltipInput = ref<HTMLInputElement>();

//处理关闭
const handleClose = () => {
  visible.value = false;
};

//处理显示聚焦
const handleTooltipShow = async () => {
  await nextTick();

  tooltipInput.value?.focus();
};
</script>

<style lang="scss">
.tooltip-rename {
  --el-bg-color-overlay: #252525 !important;
  --el-border-color-light: transparent !important;
  --el-popper-border-radius: 10px !important;
  padding: 4px 8px !important;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 14px 28px -6px,
    rgba(0, 0, 0, 0.12) 0px 2px 4px -1px,
    rgba(255, 255, 255, 0.094) 0px 0px 0px 1px;

  section {
    > div {
      box-shadow: rgba(255, 255, 255, 0.13) 0px 0px 0px 1px inset;
    }
  }

  input {
    width: 330px;
    background-color: #313131;
    box-shadow: rgba(255, 255, 255, 0.075) 0px 0px 0px 1px inset;

    &::placeholder {
      color: #696969;
    }
  }
}
</style>
