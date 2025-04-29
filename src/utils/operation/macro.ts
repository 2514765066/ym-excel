import workarea from "@/utils/workarea";
import { WorkbookOperation } from "./workbook";

//测试宏
export const testMacro = (macro: string) => {
  //重置工作区的表格
  workarea.restore();

  const instance = new WorkbookOperation(JSON.parse(macro));

  instance.run();
};

//运行宏
export const runMacro = (macro: string) => {
  testMacro(macro);

  workarea.write();
};
