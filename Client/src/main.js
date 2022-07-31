import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import globalComponents from "./global-components";
import utils from "./utils";
import "./assets/css/app.css";
import instance from "./axios.config";

const app = createApp(App).use(router).use(createPinia());
app.config.globalProperties.$axios = instance
globalComponents(app);
utils(app);

app.mount("#app");
