import Vue from 'vue'
import VueRouter from 'vue-router'
import SideAccount from '../views/SideAccount.vue'
import Category from '../views/Category.vue'
import Summary from '../views/Summary.vue'
import AddIncome from '../views/AddIncome.vue'
import AddExpense from '../views/AddExpense.vue'
import pointManage from '../views/PointManage.vue'
import pointHistory from '../views/PointHistory.vue'
import pointDelivery from '../views/PointDelivery.vue'
import Vuetify from 'vuetify/lib'

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
  zoomOnClick
};

//


Vue.use(VueRouter)

  const routes = [

    // 定義component對應的網址
  {
    path: "/sideAccount",
    name: "SideAccountName",
    component: SideAccount,
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
    path: "/category",
    name: "CategoryName",
    component: Category,
  },
  {
    path: '/summary',
    name: 'SummaryName',
    component: Summary,
  },
  {
    path: '/point',
    name: 'PointManageName',
    component: pointManage,
    props: true,
    children: [
      {
        path: 'delivery',
        name: 'PointDeliveryName',
        component: pointDelivery
      },
      {
        path: 'history',
        name: 'PointHistoryName',
        component: pointHistory,
      }
    ] 
    
  },

  

]

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#cccccc',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
        a:'#cccccc'
      },
    },
  },
})

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
