import Vue from "vue";
import VueRouter from "vue-router";
import Accounting from "../views/Accounting.vue";
import SideAccount from "../views/SideAccount.vue";
import Category from "../views/Category.vue";
import LedgerManagement from "../views/LedgerManagement.vue";
import Summary from "../views/Summary.vue";
import pointManage from "../views/PointManage.vue";
import pointHistory from "../views/PointHistory.vue";
import pointDelivery from "../views/PointDelivery.vue";
import pointRedeem from "../views/PointRedeem.vue";
import personalAccount from "../views/PersonalAccount.vue";
import Vuetify from "vuetify/lib";
import VueRellax from 'vue-rellax';
 
Vue.use(VueRellax)

Vue.use(VueRouter);

//

import sunburst from "../components/sunbrust/sunburst";

//slots info
import nodeInfoDisplayer from "../components/sunbrust/nodeInfoDisplayer";
import breadcrumbTrail from "../components/sunbrust/breadcrumbTrail";
//slots behaviors
import highlightOnHover from "../components/behavior/highlightOnHover";
import zoomOnClick from "../components/behavior/zoomOnClick";

import { colorSchemes } from "../infra/colorSchemes";

export {
  breadcrumbTrail,
  colorSchemes,
  highlightOnHover,
  nodeInfoDisplayer,
  sunburst,
  zoomOnClick,
};

//

Vue.use(VueRouter);

const routes = [
  // 定義component對應的網址
  {
    path: "/accounting",
    name: "AcountingName",
    props: true,
    component: Accounting,
    children: [
      {
        path: "",
        name: "SideAccountName",
        component: SideAccount,
      },
      {
        path: "Category",
        name: "CategoryName",
        component: Category,
      },
      {
        path: "Ledger",
        name: "LedgerName",
        component: LedgerManagement,
      },
    ],

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
    path: "/personal",
    name: "PersonalAccountName",
    component: personalAccount,
  },
  {
    path: "/summary",
    name: "SummaryName",
    component: Summary,
  },
  {
    path: "/point",
    name: "PointManageName",
    component: pointManage,
    props: true,
    children: [
      {
        path: "",
        name: "PointRedeemName",
        component: pointRedeem,
      },
      {
        path: "delivery",
        name: "PointDeliveryName",
        component: pointDelivery,
      },
      {
        path: "history",
        name: "PointHistoryName",
        component: pointHistory,
      },
    ],
  },

];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
