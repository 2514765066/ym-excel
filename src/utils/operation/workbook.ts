import { Macro, Worksheet } from "@/type";
import {
  CreateVar,
  MergeAll,
  RunOperation,
  Data,
  CreateTemplate,
} from "@/type/operation";
import { typeMap, VarType, ValueType } from "./type";
import workarea from "@/utils/workarea";
import { WorksheetOperation } from "./worksheet";
import { readExcel } from "../excel";
import { join } from "path";
import { templateDirPath } from "@/api/path";
import { existsSync } from "fs";

//workbook操作
export class WorkbookOperation {
  //存储所有变量
  private var: Record<string, any> = {};

  //当前宏
  private macro: Macro;

  constructor(macro: Macro) {
    this.macro = macro;
  }

  //运行
  run() {
    for (const operation of this.macro.workbook) {
      const { type, rule, children } = operation;

      //调用
      this[type](rule, children);
    }
  }

  //获取值
  private getValue<T extends VarType, K extends ValueType<T>>(
    value: Data,
    type: T
  ): K {
    //是变量
    if (value.mode == "var") {
      return this.var[value.text];
    }

    return typeMap[type](value.text, 0) as K;
  }

  //创建变量
  createVar(rule: CreateVar[]) {
    for (const { name, value, type } of rule) {
      this.var[name.text] = typeMap[type.text](value.text);
    }
  }

  //合并工作区所有工作薄
  mergeAll(rule: MergeAll[]) {
    const excels = workarea.getAllExcel();

    //合并后的所有工作表
    const worksheets: Worksheet[] = [];

    for (const { sheets } of excels) {
      sheets.forEach((sheet, index) => {
        //不存在就直接赋值
        if (!worksheets[index]) {
          worksheets[index] = {
            name: `Sheet${index + 1}`,
            data: [],
          };
        }

        //存在就添加在下方
        worksheets[index].data.push(...structuredClone(sheet.data));
      });
    }

    for (const item of rule) {
      //新表格的名称
      const name = this.getValue(item.table, "table");

      workarea.createExcel({
        name,
        sheets: worksheets,
      });
    }
  }

  //运行操作
  runOperation(rule: RunOperation[]) {
    for (const item of rule) {
      const name = this.getValue(item.table, "table");

      const excel = workarea.getExcel(name);

      if (!excel) return;

      const instance = new WorksheetOperation(this.macro);

      instance.run(excel);
    }

    workarea.update();
  }

  //使用模板
  createTemplate(rule: CreateTemplate[]) {
    for (const item of rule) {
      const name = this.getValue(item.table, "table");
      const templateName = this.getValue(item.template, "template");

      const path = join(templateDirPath, templateName);

      if (!existsSync(path)) {
        break;
      }

      const wb = readExcel(path);

      workarea.createExcel({
        name,
        sheets: wb.sheets,
      });
    }
  }
}
