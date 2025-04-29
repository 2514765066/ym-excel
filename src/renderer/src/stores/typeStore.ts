import { useOperationStore } from "./operationStore";

export type TypeInfo = {
  title: string;
  tip: string;
  validate: (val: string) => boolean;
};

type Data = {
  workbook: Record<string, TypeInfo>;
  worksheet: Record<string, TypeInfo>;
};

export const useTypeStore = defineStore("type", () => {
  const { selectedNamespace } = storeToRefs(useOperationStore());

  const data: Data = {
    workbook: {
      text: {
        title: "文本",
        tip: "格式：任意字符",
        validate: val => {
          return /^\S*$/.test(val);
        },
      },

      table: {
        title: "表格名称",
        tip: "格式：以.xls或.xlsx结尾",
        validate: val => {
          return /^\S+.xlsx?$/.test(val);
        },
      },

      name: {
        title: "名称",
        tip: "格式：不能为空的任意字符",
        validate: val => {
          return /^\S+$/.test(val);
        },
      },
    },

    worksheet: {
      all: {
        title: "任意内容",
        tip: "格式：不能为空的任意字符",
        validate: val => {
          return Boolean(val);
        },
      },

      name: {
        title: "名称",
        tip: "格式：不能为空的任意字符",
        validate: val => {
          return /^\S+$/.test(val);
        },
      },

      text: {
        title: "文本",
        tip: "格式：任意字符",
        validate: val => {
          return /^\S*$/.test(val);
        },
      },

      number: {
        title: "数字",
        tip: "格式：任意数字",
        validate: val => {
          return Boolean(Number(val));
        },
      },

      col: {
        title: "列名",
        tip: "格式：A-Z",
        validate: val => {
          return /^[A-Z]+$/.test(val);
        },
      },

      row: {
        title: "行名",
        tip: "格式：非0的数字，负数表示倒数",
        validate: val => {
          return /^-?[1-9][0-9]*$/.test(val);
        },
      },

      area: {
        title: "区域",
        tip: "格式：A1:A2 或 A:B",
        validate: val => {
          return /^[A-Z]+(?:[1-9]+:[A-Z]+[1-9]+|:[A-Z]+)$/.test(val);
        },
      },

      cell: {
        title: "单元格",
        tip: "格式：A1",
        validate: val => {
          return /^[A-Z]+[1-9]+$/.test(val);
        },
      },
    },
  };

  //忽略的类型
  const ignoreType = ["name", "all"];

  //当前命名空间下的类型信息
  const selectedType = computed(() => {
    return data[selectedNamespace.value];
  });

  return {
    data,
    ignoreType,
    selectedType,
  };
});
