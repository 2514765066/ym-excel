import {
  CreateVar,
  CustomSort,
  EachCell,
  MoveCol,
  MoveRow,
  RemoveCol,
  RemoveRepeatRow,
  RemoveRow,
  ReplaceCellValue,
  Data,
  EachRow,
  SetVar,
  Compute,
  If_,
  GetCell,
  SetCell,
  EachCol,
  InsertCol,
  InsertRow,
  ClearCol,
  ClearRow,
} from "@/type/operation";
import { naturalSort } from "@/utils/sort";
import { Workbook, Operation, Macro } from "@/type";
import { typeMap, VarType, ValueType } from "./type";
import { evaluate } from "mathjs";

export class WorksheetOperation {
  //存储所有变量
  private var: Record<string, any> = {};

  //当前宏
  private macro: Macro;

  //当前操作的表格
  private data: string[][] = [[]];

  constructor(macro: Macro) {
    this.macro = macro;
  }

  //运行
  run(excel: Workbook) {
    for (const sheet of excel.sheets) {
      this.data = sheet.data;

      this.runOperation(this.macro.worksheet);

      sheet.data = this.data;
    }

    return excel;
  }

  //运行操作
  private runOperation(operations: Operation[]) {
    for (const operation of operations) {
      const { type, rule, children } = operation;

      //调用
      this[type](rule, children);
    }
  }

  //获取行数
  private getRowCount() {
    return this.data.length;
  }

  //获取列数
  private getColCount() {
    if (this.data[0]) {
      return this.data[0].length;
    }

    return 0;
  }

  //获取单元格值
  private getCellValue(col: number, row: number) {
    if (!this.data[row] && !this.data[row][col]) {
      return "";
    }

    return this.data[row][col];
  }

  //设置单元格值
  private setCellValue(col: number, row: number, value: string) {
    if (!this.data[row]) {
      const rowCount = this.getRowCount();
      const colCount = this.getColCount();

      const res = new Array(row + 1 - rowCount)
        .fill("")
        .map(() => new Array(colCount).fill(""));

      this.data.push(...res);
    }

    this.data[row][col] = value;
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

    //是值
    const rowCount = this.getRowCount();

    return typeMap[type](value.text, rowCount) as K;
  }

  //设置值
  private setValue<T extends VarType, K extends ValueType<T>>(
    key: Data,
    _: T,
    value: K
  ) {
    this.var[key.text] = value;
  }

  //创建变量
  createVar(rule: CreateVar[]) {
    for (const { name, value, type } of rule) {
      this.var[name.text] = typeMap[type.text](value.text);
    }
  }

  //设置变量
  setVar(rule: SetVar[]) {
    for (const { name, value, type } of rule) {
      this.var[name.text] = typeMap[type.text](value.text);
    }
  }

  //计算
  compute(rule: Compute[]) {
    for (const item of rule) {
      const init = this.getValue(item.init, "text");
      const sym = this.getValue(item.sym, "text");
      const value = this.getValue(item.value, "text");

      try {
        const res = evaluate(`${init}${sym}${value}`);

        this.setValue(item.res, "text", res);
      } catch {}
    }
  }

  //删除列
  removeCol(rule: RemoveCol[]) {
    for (const item of rule) {
      //获取变量中的字母
      const col = this.getValue(item.col, "col");

      //获取变量中的数量
      const count = this.getValue(item.count, "number");

      this.data.forEach(row => {
        row.splice(col, count);
      });
    }
  }

  //删除行
  removeRow(rule: RemoveRow[]) {
    for (const item of rule) {
      //获取变量中的字母
      const row = this.getValue(item.row, "row");

      //获取变量中的数量
      const count = this.getValue(item.count, "number");

      this.data.splice(row, count);
    }
  }

  //移动列
  moveCol(rule: MoveCol[]) {
    for (const item of rule) {
      //获取变量中的字母
      const from = this.getValue(item.col, "col");

      //获取变量中的数量
      const to = this.getValue(item.to, "col");

      this.data.forEach(row => {
        if (from > to) {
          row.splice(to, 0, row[from]);
          row.splice(from + 1, 1);
          return;
        }

        if (from < to) {
          row.splice(to + 1, 0, row[from]);
          row.splice(from, 1);
          return;
        }
      });
    }
  }

  //移动行
  moveRow(rule: MoveRow[]) {
    for (const item of rule) {
      //获取变量中的字母
      const from = this.getValue(item.row, "row");

      //获取变量中的数量
      const to = this.getValue(item.to, "row");

      if (from > to) {
        this.data.splice(to, 0, this.data[from]);
        this.data.splice(from + 1, 1);
        break;
      }

      if (from < to) {
        this.data.splice(to + 1, 0, this.data[from]);
        this.data.splice(from, 1);
        break;
      }
    }
  }

  //遍历单元格
  eachCell(rule: EachCell[], children: Operation[]) {
    for (const item of rule) {
      //获取变量中的区域
      const { startCell, endCell } = this.getValue(item.area, "area");

      for (let row = startCell.row; row <= endCell.row; row++) {
        for (let col = startCell.col; col <= endCell.col; col++) {
          this.setValue(item.cell, "cell", {
            row,
            col,
          });

          this.runOperation(children);
        }
      }
    }
  }

  //遍历行
  eachRow(rule: EachRow[], children: Operation[]) {
    for (const item of rule) {
      const rowCount = this.getRowCount();

      for (let row = 0; row < rowCount; row++) {
        this.setValue(item.row, "row", row);

        this.runOperation(children);
      }
    }
  }

  //遍历列
  eachCol(rule: EachCol[], children: Operation[]) {
    for (const item of rule) {
      const colCount = this.getColCount();

      for (let col = 0; col < colCount; col++) {
        this.setValue(item.col, "col", col);

        this.runOperation(children);
      }
    }
  }

  //替换单元格的值
  replaceCellValue(rule: ReplaceCellValue[]) {
    for (const item of rule) {
      //单元格的行列
      const { startCell, endCell } = this.getValue(item.area, "area");

      //被替换的字符串
      const search = this.getValue(item.search, "text");

      //替换的字符串
      const replace = this.getValue(item.replace, "text");

      //当前单元格的值
      for (let row = startCell.row; row <= endCell.row; row++) {
        for (let col = startCell.col; col <= endCell.col; col++) {
          const text = this.getCellValue(col, row);

          const newText = text.replaceAll(search, replace);

          this.setCellValue(col, row, newText);
        }
      }
    }
  }

  //自定义排序
  customSort(rule: CustomSort[]) {
    const sort = rule.map(item => {
      const col = this.getValue(item.col, "col");

      return {
        [item.order.text]: u => u[col],
      };
    });

    naturalSort(this.data).by(sort as any[]);
  }

  //删除重复行
  removeRepeatRow(rule: RemoveRepeatRow[]) {
    //列数
    const colCount = this.getColCount();

    //获取可用的列
    const cols = rule
      .map(item => this.getValue(item.col, "col"))
      .filter(col => col <= colCount);

    if (cols.length == 0) {
      return;
    }

    for (let i = 0; i < this.data.length; i++) {
      const row1 = this.data[i];

      for (let j = i + 1; j < this.data.length; j++) {
        const row2 = this.data[j];

        let repeat = true;

        for (const col of cols) {
          if (row1[col] != row2[col]) {
            repeat = false;
          }
        }

        if (repeat) {
          this.data.splice(j, 1);
          j--;
        }
      }
    }
  }

  //如果
  if_(rule: If_[], children: Operation[]) {
    for (const item of rule) {
      const init = this.getValue(item.init, "text");
      const sym = this.getValue(item.sym, "text");
      const value = this.getValue(item.value, "text");

      const fn = Function(`
        if(${JSON.stringify(init)}${sym}${JSON.stringify(value)}){
            return true
        }

        return false
    `);

      if (fn()) {
        this.runOperation(children);
      }
    }
  }

  //获取单元格内容
  getCell(rule: GetCell[]) {
    for (const item of rule) {
      const col = this.getValue(item.col, "col");
      const row = this.getValue(item.row, "row");

      const text = this.getCellValue(col, row);

      this.setValue(item.res, "text", text);
    }
  }

  //设置单元格内容
  setCell(rule: SetCell[]) {
    for (const item of rule) {
      const col = this.getValue(item.col, "col");
      const row = this.getValue(item.row, "row");
      const value = this.getValue(item.value, "text");

      this.setCellValue(col, row, value);
    }
  }

  //插入列
  insertCol(rule: InsertCol[]) {
    for (const item of rule) {
      const col = this.getValue(item.col, "col");
      const count = this.getValue(item.count, "number");

      this.data.forEach(row => {
        row.splice(col, 0, ...new Array(count).fill(""));
      });
    }
  }

  //插入行
  insertRow(rule: InsertRow[]) {
    for (const item of rule) {
      const row = this.getValue(item.row, "row");
      const count = this.getValue(item.count, "number");

      const colCount = this.getColCount();

      const data = new Array(count)
        .fill("")
        .map(() => new Array(colCount).fill(""));

      this.data.splice(row, 0, ...data);
    }
  }

  //清空列
  clearCol(rule: ClearCol[]) {
    for (const item of rule) {
      const col = this.getValue(item.col, "col");

      this.data.forEach(row => {
        row[col] = "";
      });
    }
  }

  //清空行
  clearRow(rule: ClearRow[]) {
    for (const item of rule) {
      const row = this.getValue(item.row, "row");

      this.data[row].fill("");
    }
  }
}
