import { dialog } from "electron";
import { browserWindows } from "@/api/windows";

//打开文件夹
export const openDir = async (title: string) => {
  const win = browserWindows.get("manage")!;

  const res = await dialog.showOpenDialog(win, {
    title,
    properties: ["openDirectory"],
  });

  if (res.canceled) {
    return [];
  }

  return res.filePaths;
};

//打开文件
export const openExcel = async (title: string) => {
  const win = browserWindows.get("manage")!;

  const res = await dialog.showOpenDialog(win, {
    title,
    properties: ["openFile", "multiSelections"],
    filters: [{ name: "表格", extensions: ["xlsx", "xls"] }],
  });

  if (res.canceled) {
    return [];
  }

  return res.filePaths;
};

//打开文件
export const openMacro = async (title: string) => {
  const win = browserWindows.get("manage")!;

  const res = await dialog.showOpenDialog(win, {
    title,
    properties: ["openFile", "multiSelections"],
    filters: [{ name: "宏", extensions: ["ye"] }],
  });

  if (res.canceled) {
    return [];
  }

  return res.filePaths;
};
