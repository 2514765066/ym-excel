//数据
export type Data = {
  mode: "input" | "var";
  text: string;
  validate: boolean;
};

//变量
export type CreateVar = {
  type: Data;
  name: Data;
  value: Data;
};

//设置变量
export type SetVar = {
  type: Data;
  name: Data;
  value: Data;
};

//计算
export type Compute = {
  init: Data;
  sym: Data;
  value: Data;
  res: Data;
};

//删除列
export type RemoveCol = {
  col: Data;
  count: Data;
};

//删除行
export type RemoveRow = {
  row: Data;
  count: Data;
};

//移动列
export type MoveCol = {
  col: Data;
  to: Data;
};

//移动行
export type MoveRow = {
  row: Data;
  to: Data;
};

//插入列
export type InsertCol = {
  col: Data;
  count: Data;
};

//插入行
export type InsertRow = {
  row: Data;
  count: Data;
};

//遍历单元格
export type EachCell = {
  area: Data;
  cell: Data;
};

//遍历行
export type EachRow = {
  row: Data;
};

//遍历列
export type EachCol = {
  col: Data;
};

//替换单元格的内容
export type ReplaceCellValue = {
  area: Data;
  search: Data;
  replace: Data;
};

//自定义排序
export type CustomSort = {
  col: Data;
  order: Data;
};

//删除重复行
export type RemoveRepeatRow = {
  col: Data;
};

//运行操作
export type RunOperation = {
  table: Data;
};

//合并表格
export type MergeAll = {
  table: Data;
};

//创建模板
export type CreateTemplate = {
  template: Data;
  table: Data;
};

//如果
export type If_ = {
  init: Data;
  sym: Data;
  value: Data;
};

//获取单元格内容
export type GetCell = {
  row: Data;
  col: Data;
  res: Data;
};

//设置单元格内容
export type SetCell = {
  row: Data;
  col: Data;
  value: Data;
};

//清空列
export type ClearCol = {
  col: Data;
};

//清空行
export type ClearRow = {
  row: Data;
};
