import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";

//把component定義為global
// import SideAccount from './components/SideAccount.vue'
// Vue.component('account',SideAccount)
// ('component名稱',component object)

Vue.config.productionTip = false;

// const baseURL = "http://localhost:3000";
const baseURL = "https://uidd-backend.herokuapp.com/"

Vue.use(VueAxios, axios.create({ baseURL })); // $http

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
