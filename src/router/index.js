import Vue from "vue";
import VueRouter from "vue-router";
import Accounting from "../views/Accounting.vue";
import SideAccount from "../views/SideAccount.vue";
import Category from "../views/Category.vue";
import LedgerManagement from "../views/LedgerManagement.vue";
import Summary from "../views/SummaryManagement.vue";
import pointManage from "../views/PointManage.vue";
import pointHistory from "../views/PointHistory.vue";
import pointDelivery from "../views/PointDelivery.vue";
import pointRedeem from "../views/PointRedeem.vue";
import personalAccount from "../views/PersonalAccount.vue";
import fronterHome from "../views/FronterHome.vue";
import global_ from "../components/Global.vue";
import Vuetify from "vuetify/lib";
import VueRellax from "vue-rellax";
import webInfo from "../components/webInfo.vue";

Vue.use(VueRellax);

Vue.use(VueRouter);

const routes = [
  // 定義component對應的網址
  {
    path: "",
    meta: {
      title: "首頁",
    },
  },
  {
    path: "/empty",
    name: "globalName",
    component: global_,
  },
  {
    path: "/accounting",
    name: "SideAccountName",
    component: SideAccount,
    meta: {
      title: "帳目管理",
    },
  },
  {
    path: "/Category",
    name: "CategoryName",
    component: Category,
    meta: {
      title: "管理類別",
    },
  },
  {
    path: "/Ledger",
    name: "LedgerName",
    component: LedgerManagement,
    meta: {
      title: "管理帳本",
    },
  },
  // {
  //   path: "/accounting",
  //   // name: "AcountingName",
  //   props: true,
  //   component: Accounting,
  //   children: [
  //     {
  //       path: "",
  //       name: "SideAccountName",
  //       component: SideAccount,
  //       meta: {
  //         title: "帳目管理",
  //       },
  //     },
  //     {
  //       path: "Category",
  //       name: "CategoryName",
  //       component: Category,
  //       meta: {
  //         title: "管理類別",
  //       },
  //     },
  //     {
  //       path: "Ledger",
  //       name: "LedgerName",
  //       component: LedgerManagement,
  //       meta: {
  //         title: "管理帳本",
  //       },
  //     },
  //   ],
  // },
  { path: "/fronter_home", name: "FronterHomeName", component: fronterHome },
  { path: "/webInfo", name: "webInfoName", component: webInfo },
  {
    path: "/personal",
    name: "PersonalAccountName",
    component: personalAccount,
  },
  {
    path: "/summary",
    name: "SummaryName",
    component: Summary,
    meta: {
      title: "統計圖",
    },
  },
  {
    path: "/pointRedeem",
    name: "PointRedeemName",
    component: pointRedeem,
    meta: {
      title: "點數兌換",
    },
  },
  {
    path: "/pointDelivery",
    name: "PointDeliveryName",
    component: pointDelivery,
    meta: {
      title: "點數贈送",
    },
  },
  {
    path: "/pointHistory",
    name: "PointHistoryName",
    component: pointHistory,
    meta: {
      title: "歷史紀錄",
    },
    // {
    //   path: "/point",
    //   // name: "PointManageName",
    //   component: pointManage,
    //   props: true,
    //   children: [
    //     {
    //       path: "",
    //       name: "PointRedeemName",
    //       component: pointRedeem,
    //       meta: {
    //         title: "點數兌換",
    //       },
    //     },
    //     {
    //       path: "delivery",
    //       name: "PointDeliveryName",
    //       component: pointDelivery,
    //       meta: {
    //         title: "點數贈送",
    //       },
    //     },
    //     {
    //       path: "history",
    //       name: "PointHistoryName",
    //       component: pointHistory,
    //       meta: {
    //         title: "歷史紀錄",
    //       },
    //     },
    //   ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

/**
 * reference: https://juejin.im/post/5d355c3f6fb9a07eb15d9383
 */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + " - 星．際帳";
  }
  next();
});

export default router;
