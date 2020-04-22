import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'


//把component定義為global
// import SideAccount from './components/SideAccount.vue'
// Vue.component('account',SideAccount)
// ('component名稱',component object)

Vue.config.productionTip = false

Vue.use(VueAxios, axios) // $http

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
