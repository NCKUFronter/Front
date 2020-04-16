import Vue from "vue";
import VueRouter from "vue-router";
import SideAccount from "../components/SideAccount.vue";
import Modal from "../components/Modal.vue";
// import HelloWorld from "../components/HelloWorld.vue";

Vue.use(VueRouter);

const routes = [
  // 定義component對應的網址
  {
    path: "/Account",
    name: "SideAccountName",
    component: SideAccount,
  },
  {
    path: "/Modal",
    name: "ModalName",
    component: Modal,
  },

  // {
  //   path: "/HelloWorld",
  //   name: "HelloWorldName",
  //   component: HelloWorld,
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
