import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import ApiService from "./utils/ApiService";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

//把component定義為global
// import SideAccount from './components/SideAccount.vue'
// Vue.component('account',SideAccount)
// ('component名稱',component object)

Vue.config.productionTip = false;

const baseURL = "http://localhost:3000/api";
//const baseURL = "https://uidd-backend.herokuapp.com/";
// const baseURL = "http://luffy.ee.ncku.edu.tw:5000/";
// const baseURL = "https://luffy.ee.ncku.edu.tw:5000/";
const axios_ins = axios.create({ baseURL, withCredentials: true });


import global_ from './components/Global'//引用檔案
Vue.prototype.GLOBAL = global_//掛載到Vue例項上面



Vue.use(VueAxios, axios_ins); // $http
Vue.use(ApiService, axios_ins); // $api

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
