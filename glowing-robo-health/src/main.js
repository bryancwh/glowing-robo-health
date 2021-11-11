import { createApp } from "vue";
import Antd from "ant-design-vue";

import App from "./App.vue";
import "ant-design-vue/dist/antd.css";

import router from "./router/routes.js";
import "./assets/global.css";
import { Vue } from "vue-class-component";

import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";

// createApp(App).use(router).mount('#app')
const app = createApp(App);
app
  .use(Antd)
  .use(VueChartkick)
  .use(router)
  .mount("#app");
