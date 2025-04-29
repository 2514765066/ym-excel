import { Workbook } from "@type/index";

export const useTableStore = defineStore("table", () => {
  const data = ref<Workbook[]>([]);

  //当前选中excel的id
  const selectedName = ref("");

  //当前选中的excel
  const selectedTable = computed(() => {
    return data.value.find(item => item.name == selectedName.value);
  });

  //当前选中的sheet名称
  const selectedSheetIndex = ref(0);

  //当前选中的excel的sheet
  const selectedSheet = computed(() => {
    return selectedTable.value?.sheets[selectedSheetIndex.value];
  });

  //选择工作区
  const selectWorkarea = () => {
    ipcRenderer.send("readWorkarea");
  };

  //更新工作区
  ipcRenderer.on("updateWorkarea", (_, table) => {
    data.value = table;
  });

  return {
    data,
    selectedName,
    selectedTable,
    selectedSheetIndex,
    selectedSheet,
    selectWorkarea,
  };
});
