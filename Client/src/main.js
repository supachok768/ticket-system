import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import globalComponents from "./global-components";
import utils from "./utils";
import "./assets/css/app.css";
import axios from 'axios';

const baseUrl = 'http://localhost:3001'
const devInstance = createInstance(baseUrl);

function createInstance(baseURL) {
    return axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        }
    });
}

const app = createApp(App).use(router).use(createPinia());
app.config.globalProperties.$axios = devInstance
globalComponents(app);
utils(app);

app.mount("#app");
