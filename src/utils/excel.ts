import type { WorkSheet } from "xlsx";
import { set_fs, readFile, utils, writeFile } from "xlsx";
import fs from "fs";
import { basename } from "path";
import { Workbook } from "@/type";

set_fs(fs);

const getSheet = (worksheet: WorkSheet) => {
  const res = utils.sheet_to_json(worksheet, {
    header: 1,
    defval: "",
    raw: true,
  }) as any[][];

  if (res.length == 0) {
    return [[]];
  }

  return res;
};

//读取excel的内容
export const readExcel = (path: string): Workbook => {
  const workbook = readFile(path);

  const sheets = workbook.SheetNames.map(name => {
    return {
      name,
      data: getSheet(workbook.Sheets[name]),
    };
  });

  const name = basename(path);

  const res = {
    name,
    sheets,
  };

  return res;
};

//写入excel
export const writeExcel = (path: string, data: Workbook) => {
  const workbook = utils.book_new();

  data.sheets.forEach(sheet => {
    const worksheet = utils.aoa_to_sheet(sheet.data);

    utils.book_append_sheet(workbook, worksheet, sheet.name);
  });

  writeFile(workbook, path);
};
