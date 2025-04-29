import { FSWatcher, watch } from "chokidar";
import { extname, basename } from "path";

const map = ["xlsx", "xls"];

export const useWatchDir = () => {
  let watcher: FSWatcher | undefined;

  const watchDir = async (path: string) => {
    if (watcher) {
      await watcher.close();
    }

    watcher = watch(path, {
      depth: 0,

      ignored: (path, stats) => {
        //判断是否是文件
        const isFile = Boolean(stats?.isFile());

        //判断是否是excel文件
        const isExcel = map.includes(extname(path).slice(1));

        //判断是否是编辑文件
        const isEidtFile = basename(path).startsWith("~$");

        return isFile && !(isExcel && !isEidtFile);
      },
    });

    return watcher;
  };

  return {
    watchDir,
  };
};
