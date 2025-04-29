import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/Home/index.vue";
import Macro from "@/views/Macro/index.vue";
import Table from "@/views/Table/index.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "",
      redirect: "/home",
    },
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/macro",
      component: Macro,
    },
    {
      path: "/table",
      component: Table,
    },
  ],
});

export default router;
