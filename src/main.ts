import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "element-plus/dist/index.css"; //element-plus样式
import "@/styles/index.scss"; // 自定义样式
//SVG图标
import svgIcon from "@/components/SvgIcon/index.vue";
import "virtual:svg-icons-register";

createApp(App)
  .use(createPinia())
  .use(router)
  .component("svg-icon", svgIcon)
  .mount("#app");
