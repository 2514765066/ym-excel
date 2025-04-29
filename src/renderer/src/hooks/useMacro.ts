import { useMacroStore } from "@/stores/macroStore";
import { ElMessageBox } from "element-plus";
import eventEmitter from "./eventEmitter";
import { toTest } from "./useTest";

export const useMacro = () => {
  const { run, test } = useMacroStore();

  //运行宏
  const runMacro = async (id: string) => {
    try {
      await ElMessageBox.confirm("确定要运行宏吗，运行后无法撤销", "提示", {
        type: "warning",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showCancelButton: false,
      });

      const res = run(id);

      if (res) {
        eventEmitter.emit("success:show", "运行成功");
        return;
      }

      eventEmitter.emit("error:show", "请处理错误");
    } catch {}
  };

  //测试宏
  const testMacro = async (id: string) => {
    const res = test(id);

    if (res) {
      toTest();

      eventEmitter.emit("success:show", "运行成功");
      return;
    }

    eventEmitter.emit("error:show", "请处理错误");
  };

  return {
    runMacro,
    testMacro,
  };
};
