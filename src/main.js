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

const baseURL = "http://localhost:3000";
// const baseURL = "https://uidd-backend.herokuapp.com/";
const axios_ins = axios.create({ baseURL });

Vue.use(VueAxios, axios_ins); // $http
Vue.use(ApiService, axios_ins); // $api

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
