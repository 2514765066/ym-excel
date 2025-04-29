import { useMacroStore } from "./macroStore";

export const useOperationStore = defineStore("operation", () => {
  const { selectedMacro } = storeToRefs(useMacroStore());

  //当前选择的命名空间
  const selectedNamespace = ref<"workbook" | "worksheet">("workbook");

  //当前命名空间下的操作
  const selectedOperation = computed({
    get() {
      if (!selectedMacro.value) {
        return [];
      }

      return selectedMacro.value[selectedNamespace.value];
    },
    set(val) {
      if (!selectedMacro.value) {
        return;
      }

      selectedMacro.value[selectedNamespace.value] = val;
    },
  });

  //添加操作
  const add = (type: string) => {
    selectedOperation.value.push({
      type,
      rule: [],
    });
  };

  return {
    selectedNamespace,
    selectedOperation,
    add,
  };
});
