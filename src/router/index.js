import Vue from "vue";
import VueRouter from "vue-router";
import SideAccount from "../components/SideAccount.vue";
import Modal from "../components/Modal.vue";
// import SideAccount from '../views/SideAccount.vue'
// import AddIncome from '../views/AddIncome.vue'
// import AddExpense from '../views/AddExpense.vue'

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
  // path: '/sideAccount',
  // name: 'SideAccountName',
  // component: SideAccount,
  // children: [
  //   {
  //     path: 'addIncome',
  //     name: 'AddIncomeName',
  //     component: AddIncome
  //   },
  //   {
  //     path: 'addExpense',
  //     name: 'AddExpenseName',
  //     component: AddExpense
  //   }

  // ]
  //},

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
