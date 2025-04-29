import { extname } from "path";
import { utils } from "xlsx";

export const typeMap = {
  //数字
  number: (num: string) => {
    return Number(num);
  },

  //文本
  text: (text: string) => {
    return text;
  },

  //列变索引
  col: (col: string) => {
    return utils.decode_col(col);
  },

  //行变索引
  row: (row: string, rowCount: number) => {
    if (Number(row) > 0) {
      return utils.decode_row(row);
    }

    return rowCount + Number(row);
  },

  //行范围
  rowArea: (rowArea: string, rowCount: number) => {
    return typeMap.area(rowArea, rowCount);
  },

  //单元格变索引
  cell: (cell: string, rowCount: number) => {
    const col = cell.match(/[A-Z]+/)![0];

    const row = cell.match(/[-]?\d+/)![0];

    return {
      col: typeMap.col(col),
      row: typeMap.row(row, rowCount),
    };
  },

  //区域变索引
  area: (area: string, rowCount: number) => {
    let [start, end] = area.split(":");

    //处理A:B这种情况
    if (!/\d$/.test(start)) {
      start += 1;
      end += rowCount;
    }

    const cell1 = typeMap.cell(start, rowCount);
    const cell2 = typeMap.cell(end, rowCount);

    return {
      startCell: {
        row: Math.min(cell1.row, cell2.row),
        col: Math.min(cell1.col, cell2.col),
      },
      endCell: {
        row: Math.max(cell1.row, cell2.row),
        col: Math.max(cell1.col, cell2.col),
      },
    };
  },

  //表格
  table: (table: string) => {
    return table;
  },

  //模板
  template: (template: string) => {
    const ext = extname(template);

    return template + ext;
  },
};

export type TypeMap = typeof typeMap;

export type VarType = keyof TypeMap;

export type ValueType<T extends VarType> = ReturnType<TypeMap[T]>;
