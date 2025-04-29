//测试窗口高度
const _testWinHeight = ref(300);
export const testWinHeight = computed({
  get() {
    return _testWinHeight.value;
  },
  set(val) {
    const minHeight = 100;

    const maxHeight = window.innerHeight - 50;

    _testWinHeight.value = Math.min(Math.max(val, minHeight), maxHeight);
  },
});

//是否是测试环境
export const isTest = ref(false);

//测试窗口是否实现
export const testWinVisible = ref(false);

//进入测试环境
export const toTest = () => {
  isTest.value = true;
  testWinVisible.value = true;
};

//退出测试环境
export const exitTest = () => {
  ipcRenderer.send("restoreWorkarea");
  isTest.value = false;
  testWinVisible.value = false;
};
