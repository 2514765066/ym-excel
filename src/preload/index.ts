import { contextBridge, shell } from "electron";
import { ipcRenderer } from "../api/ipcRenderer";

const api = {
  //打开网页
  openUrl(url: string) {
    shell.openExternal(url);
  },
};

export type Api = typeof api;

contextBridge.exposeInMainWorld("api", api);
contextBridge.exposeInMainWorld("ipcRenderer", {
  send: ipcRenderer.send,
  on: ipcRenderer.on,
  invoke: ipcRenderer.invoke,
});
