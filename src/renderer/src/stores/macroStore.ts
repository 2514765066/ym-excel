import { Macro } from "@type/index";
import { nanoid } from "nanoid";
import { watchDebounced } from "@vueuse/core";
import eventEmitter from "@/hooks/eventEmitter";

export const useMacroStore = defineStore("macro", () => {
  const router = useRouter();

  const data = ref<Macro[]>([]);

  //当前选中宏的名称
  const selectedID = ref("");

  //当前选中宏
  const selectedMacro = computed<Macro | undefined>(() => {
    return data.value.find(item => item.id == selectedID.value);
  });

  //选择宏
  const select = (id: string) => {
    const index = data.value.findIndex(item => item.id == id);

    const item = data.value.splice(index, 1);

    data.value.unshift(...item);

    selectedID.value = id;

    router.push("/macro");
  };

  //添加宏
  const add = () => {
    const id = nanoid();

    data.value.unshift({
      name: "",
      id,
      workbook: [],
      worksheet: [],
    });

    selectedID.value = id;

    router.push("/macro");
  };

  //删除宏
  const remove = (id: string) => {
    //如果删除宏是当前宏就跳转页面
    if (id == selectedID.value) {
      router.push("/home");
    }

    const index = data.value.findIndex(item => item.id == id);

    data.value.splice(index, 1);
  };

  //测试宏
  const test = (id: string) => {
    const macro = data.value.find(item => item.id == id);

    const str = JSON.stringify(macro);

    if (validate(str)) {
      ipcRenderer.send("testMacro", str);
      return true;
    }

    return false;
  };

  //运行宏
  const run = (id: string) => {
    const macro = data.value.find(item => item.id == id);

    const str = JSON.stringify(macro);

    if (validate(str)) {
      ipcRenderer.send("runMacro", str);
      return true;
    }

    return false;
  };

  //验证宏是否可以运行
  const validate = (macro: string) => {
    if (macro.includes(`"validate":false`)) {
      return false;
    }

    return true;
  };

  //导出
  const exportConfig = async (id: string) => {
    const res = data.value.find(item => item.id == id)!;

    await ipcRenderer.invoke("exportConfig", res.name, JSON.stringify(res));

    eventEmitter.emit("success:show", "导出成功");
  };

  //导入
  const importConfig = async () => {
    const res = await ipcRenderer.invoke("importConfig");

    if (!res) return;

    try {
      const importData: Macro = JSON.parse(res);

      const requiredKeys = ["name", "id", "workbook", "worksheet"];

      const allExist = requiredKeys.every(key => key in importData);

      if (allExist) {
        importData.id = nanoid();

        data.value.unshift(importData);

        eventEmitter.emit("success:show", "导入成功");
        return;
      }
      eventEmitter.emit("error:show", "导入失败:内容不合法");
    } catch {
      eventEmitter.emit("error:show", "导入失败:内容不合法");
    }
  };

  //初始化
  const init = async () => {
    const res = await ipcRenderer.invoke("readMacro");

    if (res) {
      data.value = JSON.parse(res);
    }

    //监视内容写入数据
    watchDebounced(
      data,
      val => {
        ipcRenderer.send("writeMacro", JSON.stringify(val, null, 2));
      },
      {
        debounce: 1000,
        deep: true,
      }
    );
  };

  init();

  return {
    data,
    selectedID,
    selectedMacro,
    remove,
    select,
    add,
    test,
    run,
    validate,
    exportConfig,
    importConfig,
  };
});
