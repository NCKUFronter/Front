<<<<<<< HEAD
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
=======
import Vue from 'vue'
import VueRouter from 'vue-router'
import SideAccount from '../views/SideAccount.vue'
import Category from '../views/Category.vue'
import AddIncome from '../views/AddIncome.vue'
import AddExpense from '../views/AddExpense.vue'



Vue.use(VueRouter)

  const routes = [

    // 定義component對應的網址
>>>>>>> 53adafeb7042ae01f26044dd749579c79fcef44d
  {
    path: "/sideAccount",
    name: "SideAccountName",
    component: SideAccount,
<<<<<<< HEAD
=======
    /*
    children: [
      {
        path: 'addIncome',
        name: 'AddIncomeName',
        component: AddIncome
      },
      {
        path: 'addExpense',
        name: 'AddExpenseName',
        component: AddExpense
      }
     ]
     */
  },
  {
    path: '/category',
    name: 'CategoryName',
    component: Category,

>>>>>>> 53adafeb7042ae01f26044dd749579c79fcef44d
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
