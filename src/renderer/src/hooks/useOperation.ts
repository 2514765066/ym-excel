import { titleMap } from "@/components/Operation/index";
import { useOperationStore } from "@/stores/operationStore";

export const useOperation = () => {
  const { selectedNamespace } = storeToRefs(useOperationStore());

  const operation = computed(() => {
    return Object.entries(titleMap[selectedNamespace.value]).map(item => ({
      title: item[1].title,
      icon: item[1].icon,
      type: item[0],
    }));
  });

  return {
    operation,
  };
};
