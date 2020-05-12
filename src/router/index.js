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
