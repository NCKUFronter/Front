import Vue from 'vue'
import VueRouter from 'vue-router'
import SideAccount from '../components/SideAccount.vue'
import HelloWorld from '../components/HelloWorld.vue'

Vue.use(VueRouter)

  const routes = [

    // 定義component對應的網址
  {
    path: '/',
    name: 'SideAccountName',
    component: SideAccount
  },
  {
    path: '/HelloWorld',
    name: 'HelloWorldName',
    component: HelloWorld

  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
