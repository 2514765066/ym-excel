import runOperation from "./Workbook/RunOperation/index.vue";
import mergeAll from "./Workbook/MergeAll/index.vue";
import createTemplate from "./Workbook/CreateTemplate/index.vue";

import removeCol from "./Worksheet/RemoveCol/index.vue";
import removeRow from "./Worksheet/RemoveRow/index.vue";
import moveCol from "./Worksheet/MoveCol/index.vue";
import moveRow from "./Worksheet/MoveRow/index.vue";
import customSort from "./Worksheet/CustomSort/index.vue";
import eachCell from "./Worksheet/EachCell/index.vue";
import eachRow from "./Worksheet/EachRow/index.vue";
import eachCol from "./Worksheet/EachCol/index.vue";
import createVar from "./Worksheet/CreateVar/index.vue";
import setVar from "./Worksheet/SetVar/index.vue";
import removeRepeatRow from "./Worksheet/RemoveRepeatRow/index.vue";
import compute from "./Worksheet/Compute/index.vue";
import if_ from "./Worksheet/If/index.vue";
import getCell from "./Worksheet/GetCell/index.vue";
import setCell from "./Worksheet/SetCell/index.vue";
import replaceCellValue from "./Worksheet/ReplaceCellValue/index.vue";
import insertCol from "./Worksheet/InsertCol/index.vue";
import insertRow from "./Worksheet/InsertRow/index.vue";
import clearCol from "./Worksheet/ClearCol/index.vue";
import clearRow from "./Worksheet/ClearRow/index.vue";

export const componentsMap = {
  //workbook操作
  runOperation,
  mergeAll,
  createTemplate,

  //worksheet操作
  removeCol,
  removeRow,
  moveCol,
  moveRow,
  customSort,
  eachCell,
  eachCol,
  createVar,
  setVar,
  removeRepeatRow,
  eachRow,
  compute,
  if_,
  getCell,
  setCell,
  replaceCellValue,
  insertCol,
  insertRow,
  clearCol,
  clearRow,
};

export const titleMap = {
  workbook: {
    createVar: {
      title: "创建变量",
      icon: "history",
    },
    setVar: {
      title: "设置变量",
      icon: "history",
    },
    runOperation: {
      title: "运行工作表操作",
      icon: "history",
    },
    createTemplate: {
      title: "使用模板",
      icon: "history",
    },
    mergeAll: {
      title: "合并工作区所有表格",
      icon: "history",
    },
  },
  worksheet: {
    createVar: {
      title: "创建变量",
      icon: "history",
    },

    setVar: {
      title: "设置变量",
      icon: "history",
    },

    clearCol: {
      title: "清空列",
      icon: "history",
    },

    clearRow: {
      title: "清空行",
      icon: "history",
    },

    insertCol: {
      title: "插入列",
      icon: "history",
    },

    insertRow: {
      title: "插入行",
      icon: "history",
    },

    removeRow: {
      title: "删除行",
      icon: "history",
    },

    moveRow: {
      title: "移动行",
      icon: "history",
    },

    eachRow: {
      title: "遍历行",
      icon: "history",
    },

    removeRepeatRow: {
      title: "删除重复行",
      icon: "history",
    },

    removeCol: {
      title: "删除列",
      icon: "history",
    },

    moveCol: {
      title: "移动列",
      icon: "history",
    },

    eachCol: {
      title: "遍历列",
      icon: "history",
    },

    getCell: {
      title: "获取单元格内容",
      icon: "history",
    },

    setCell: {
      title: "设置单元格内容",
      icon: "history",
    },

    replaceCellValue: {
      title: "替换单元格的内容",
      icon: "history",
    },

    eachCell: {
      title: "遍历单元格",
      icon: "history",
    },

    if_: {
      title: "如果",
      icon: "history",
    },

    compute: {
      title: "计算",
      icon: "history",
    },

    customSort: {
      title: "自定义排序",
      icon: "history",
    },
  },
};
