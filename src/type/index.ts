//ipc事件配置
export type IpcEvent = {
  //读取宏
  readMacro: () => string;

  //写入宏
  writeMacro: (data: string) => void;

  //运行宏
  runMacro: (macro: string) => void;

  //测试宏
  testMacro: (macro: string) => void;

  //导出宏
  exportConfig: (name: string, macro: string) => void;

  //导入宏
  importConfig: () => string;

  //选择工作区
  readWorkarea: () => void;

  //更新工作区
  updateWorkarea: (table: Workbook[]) => void;

  //还原工作区
  restoreWorkarea: () => void;

  //读取模板
  readTemplate: () => string;

  //写入模板
  writeTemplate: (data: string) => void;

  //删除模板
  removeTemplate: (id: string) => void;

  //打开模板
  openTemplate: (id: string) => void;

  //添加模板
  addTemplate: () => Template[];
};

//宏中的操作
export type Operation = {
  type: string;
  rule: Record<string, any>[];
  children?: Operation[];
};

//宏
export type Macro = {
  name: string;
  id: string;
  workbook: Operation[];
  worksheet: Operation[];
};

//工作表
export type Worksheet = {
  name: string;
  data: any[][];
};

//工作簿
export type Workbook = {
  name: string;
  sheets: Worksheet[];
};

//模板
export type Template = {
  name: string;
  id: string;
};

//文档信息
export type DocInfo = {
  name: string;
  data: string[];
};
