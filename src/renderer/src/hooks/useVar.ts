import { useOperationStore } from "@/stores/operationStore";
import { CreateVar } from "@type/operation";
import { Operation } from "@type/index";

export const useVar = (filterType?: string) => {
  const { selectedOperation } = storeToRefs(useOperationStore());

  const indexs: number[] = inject("index")!;

  //获取当前索引之前所有的变量
  const getVar = (data: Operation[], index: number) => {
    const res: CreateVar[] = [];

    for (let i = 0; i < index; i++) {
      const item = data[i];

      if (item.type == "createVar") {
        const rule = item.rule as CreateVar[];

        res.push(...rule);
      }
    }

    return res;
  };

  const vars = computed(() => {
    const result: CreateVar[] = [];

    let data = selectedOperation.value;

    for (const index of indexs) {
      const res = getVar(data, index);

      result.push(...res);

      data = data[index].children!;
    }

    if (!filterType || filterType == "all") {
      return result.filter(item => item.name.text);
    }

    return result.filter(
      item => item.name.text && item.type.text == filterType
    );
  });

  return { vars };
};
