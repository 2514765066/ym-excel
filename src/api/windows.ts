import { BrowserWindow } from "electron";

type Name = "manage";

export const browserWindows = new Map<Name, BrowserWindow>();
