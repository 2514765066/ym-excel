import { ipcMain } from "./ipcMain";
import workarea from "@/utils/workarea";
import { basename, extname, join } from "path";
import { templatePath, macroPath, templateDirPath } from "./path";
import { existsSync } from "fs";
import { readFile, writeFile, copyFile, unlink } from "fs/promises";
import { openDir, openExcel, openMacro } from "@/utils/openDialog";
import { nanoid } from "nanoid";
import { shell } from "electron";
import { testMacro, runMacro } from "@/utils/operation/macro";

//读取宏
ipcMain.handle("readMacro", async () => {
  if (!existsSync(macroPath)) {
    return "";
  }

  const res = await readFile(macroPath);

  return res.toString();
});

//写入宏
ipcMain.on("writeMacro", async (_, data) => {
  await writeFile(macroPath, data);
});

//测试宏
ipcMain.on("testMacro", async (_, macro) => {
  testMacro(macro);
});

//运行宏
ipcMain.on("runMacro", (_, macro) => {
  runMacro(macro);
});

//导出宏
ipcMain.handle("exportConfig", async (_, name, data) => {
  const res = await openDir("选择导出到的文件夹");

  if (res.length == 0) return;

  const path = join(res[0], `${name || "新建宏"}.ye`);

  return await writeFile(path, btoa(data));
});

//导入宏
ipcMain.handle("importConfig", async () => {
  const res = await openMacro("选择导入的文件");

  if (res.length == 0) return "";

  const buffer = await readFile(res[0]);

  const data = atob(buffer.toString());

  const name = basename(res[0], ".ye");

  return data.replace(/"name":"(.*?)"/, `"name":"${name}"`);
});

//读取工作区
ipcMain.on("readWorkarea", async () => {
  const res = await openDir("请选择工作区");

  if (res.length == 0) return;

  workarea.read(res[0]);
});

//还原工作区
ipcMain.on("restoreWorkarea", () => {
  workarea.restore();

  workarea.update();
});

//读取模板
ipcMain.handle("readTemplate", async () => {
  if (!existsSync(templatePath)) {
    return "";
  }

  const res = await readFile(templatePath);

  return res.toString();
});

//写入模板
ipcMain.on("writeTemplate", async (_, data) => {
  await writeFile(templatePath, data);
});

//打开模板
ipcMain.on("openTemplate", (_, id) => {
  const ext = extname(id);

  const path = join(templateDirPath, id + ext);

  shell.openPath(path);
});

//删除模板
ipcMain.on("removeTemplate", async (_, id) => {
  const ext = extname(id);

  const path = join(templateDirPath, id + ext);

  await unlink(path);
});

//添加模板
ipcMain.handle("addTemplate", async () => {
  const filePaths = await openExcel("添加模板");

  if (filePaths.length == 0) return [];

  const p = filePaths.map(async path => {
    //拓展名
    const ext = extname(path);

    //唯一id
    const id = nanoid() + ext;

    //复制路径
    const copyPath = join(templateDirPath, id + ext);

    await copyFile(path, copyPath);

    return {
      name: basename(path, ext),
      id,
    };
  });

  return Promise.all(p);
});
