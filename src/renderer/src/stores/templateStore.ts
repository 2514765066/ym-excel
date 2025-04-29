import { watchDebounced } from "@vueuse/core";
import { Template } from "@type/index";

export const useTemplateStore = defineStore("template", () => {
  const data = ref<Template[]>([]);

  //添加模板
  const add = async () => {
    const res = await ipcRenderer.invoke("addTemplate");

    data.value.push(...res);
  };

  //删除模板
  const remove = (id: string) => {
    ipcRenderer.send("removeTemplate", id);

    const index = data.value.findIndex(item => item.id == id);

    data.value.splice(index, 1);
  };

  //初始化
  const init = async () => {
    const res = await ipcRenderer.invoke("readTemplate");

    if (res) {
      data.value = JSON.parse(res);
    }

    //监视内容写入数据
    watchDebounced(
      data,
      val => {
        ipcRenderer.send("writeTemplate", JSON.stringify(val));
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
    add,
    remove,
  };
});
