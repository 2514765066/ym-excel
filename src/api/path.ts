import { join } from "path";
import { app } from "electron";
import { isDev } from "ym-electron.js";

//资源
export const resources = isDev()
  ? join(__dirname, "../../resources")
  : app.getPath("userData");

//宏json
export const macroPath = join(resources, "macro.json");

//模板json
export const templatePath = join(resources, "template.json");

//模板文件夹
export const templateDirPath = join(resources, "template");
