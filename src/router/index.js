import Vue from "vue";
import VueRouter from "vue-router";
// import SideAccount from "../components/SideAccount.vue";
import Modal from "../components/Modal.vue";
import SideAccount from "../views/SideAccount.vue";
import AddIncome from "../views/AddIncome.vue";
import AddExpense from "../views/AddExpense.vue";

Vue.use(VueRouter);

const routes = [
  // 定義component對應的網址
  {
    path: "/sideAccount",
    name: "SideAccountName",
    component: SideAccount,
  },
  {
    path: "/addIncome",
    name: "AddIncomeName",
    component: AddIncome,
  },
  {
    path: "/addExpense",
    name: "AddExpenseName",
    component: AddExpense,
  },
  {
    path: "/Modal",
    name: "ModalName",
    component: Modal,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
