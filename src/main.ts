import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index";
import i18n from "@/i18n/index";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "virtual:uno.css";
import "./style.scss";

const app = createApp(App);

app.use(ElementPlus).use(i18n).use(router);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
