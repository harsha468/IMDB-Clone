import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import locale from "view-design/dist/locale/en-US";
import { store } from "./store/";

Vue.use(ViewUI, { locale });
Vue;
axios.defaults.baseURL = "https://localhost:50011/";
Vue.config.productionTip = false;
export const eventBus = new Vue();

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");