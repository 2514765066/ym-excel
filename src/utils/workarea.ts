import { basename, join } from "path";
import { existsSync } from "fs";
import { Workbook } from "@/type";
import { browserWindows } from "../api/windows";
import { debounce } from "@/utils/debounce";
import { useWatchDir } from "@/hooks/useWatchDir";
import { naturalSort } from "@/utils/sort";
import { readExcel, writeExcel } from "./excel";

const { watchDir } = useWatchDir();

class WorkArea {
  private path = "";

  private data = new Map<string, Workbook>();

  private raw = new Map<string, Workbook>();

  //更新渲染进程的工作区
  public update = debounce(() => {
    const win = browserWindows.get("manage")!;

    const res = this.getAllExcel();

    win.webContents.send("updateWorkarea", res);
  });

  //更新数据
  private updateData() {
    this.data = structuredClone(this.raw);
  }

  //读取更新表格
  public updateExcel(path: string) {
    //存在读取
    if (existsSync(path)) {
      const res = readExcel(path);

      this.raw.set(res.name, res);
    } else {
      //不存在删除
      const name = basename(path);

      this.raw.delete(name);
    }

    //更新数据
    this.updateData();

    //更新渲染进程
    this.update();
  }

  //获取表格
  public getExcel(name: string) {
    return this.data.get(name);
  }

  //创建表格
  public createExcel(wb: Workbook) {
    //添加到工作区
    this.data.set(wb.name, wb);

    //更新渲染进程
    this.update();
  }

  //获取工作区所有内容
  public getAllExcel() {
    const res = Array.from(this.data.values());

    naturalSort(res).asc(a => a.name);

    return res;
  }

  //读取工作区
  public async read(path: string) {
    this.path = path;

    this.raw.clear();

    //监视器
    const watcher = await watchDir(this.path);

    // 添加文件
    watcher.on("add", path => {
      this.updateExcel(path);
    });

    // 修改文件
    watcher.on("change", path => {
      this.updateExcel(path);
    });

    // 删除文件
    watcher.on("unlink", path => {
      this.updateExcel(path);
    });
  }

  //还原工作区
  public restore() {
    this.updateData();
  }

  //写入工作区
  public write() {
    if (!this.path) {
      return;
    }

    this.data.forEach((value, key) => {
      //如果是源数据
      if (
        this.raw.has(key) &&
        JSON.stringify(value) == JSON.stringify(this.raw.get(key))
      ) {
        return;
      }

      //写入
      const path = join(this.path, value.name);

      writeExcel(path, value);
    });
  }
}

export default new WorkArea();
