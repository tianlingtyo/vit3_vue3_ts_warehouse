import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import i18n from "@/i18n";
import { setByKey } from "@/utils/auth";
import { Language } from "@/enum";
// 解决跳转到hrom时 菜单显示的语言和系统不匹配的问题
if (location.href.includes("language")) {
  const lang = location.href.split("?")?.[1]?.split("=")[1];
  i18n.global.locale.value = lang as Language;
  setByKey("lang", lang);
}
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    children: [
      {
        path: "/",
        name: "User",
        component: () => {
          return import("@/views/index.vue");
        },
      },
    ],
  },
];
export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => {
    return { left: 0, top: 0 };
  },
});
