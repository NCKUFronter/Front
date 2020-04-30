<template>
  <v-app>
    <v-app-bar class="mx-auto" color="#efca16" elevate-on-scroll app>
      <v-menu bottom :offset-y="offset" transition="slide-x-transition" right>
        <template v-slot:activator="{ on }">
          <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
        </template>
        <v-list width="17vw" color="balck">
          <v-list-item
            class="side-menu"
            v-for="(item, index) in menu"
            :key="index"
            :class="{ 'menu-item': true, disabled: !item.link }"
          >
            <router-link :to="item.link">{{ item.title }}</router-link>
          </v-list-item>
        </v-list>
      </v-menu>
      <h1 class="logo">記帳網</h1>
    </v-app-bar>

    <!-- <SideMenu /> -->

    <!-- router-link只是表示換哪個component網址 -->
    <!-- 使用sideAccount這個component,並傳入變數accountData -->
    <!--SideAccount :accountData="accountData1" /-->
    <!-- :引入SideAccount變數名稱="在App的變數名稱" -->

    <!-- router真正幫你引入component -->
    <router-view></router-view>
  </v-app>
</template>

<script>
// 定義component,不是global,只有APP知道
//import SideAccount from './components/SideAccount.vue'
// import SideMenu from './components/SideMenu.vue'
let data = {
  //  accountData1:[
  //     {src:'#',category:'收支項名',money:'金額',account:'帳戶'},
  //     {src:'#',category:'收支項名',money:'金額',account:'帳戶'},
  //     {src:'#',category:'收支項名',money:'金額',account:'帳戶'}
  // ],
  offset: true,
  menu: [
    { title: "統計圖產生", link: "/summary" },
    { title: "周/月帳目一覽", link: "/sideAccount" },
    { title: "類別編輯", link: "/category" },
    { title: "帳戶管理", link: "" },
    { title: "點數管理", link: "/point" },
    { title: "雲端備分", link: "" },
    { title: "統一發票", link: "" }
  ]
};

export default {
  name: "App",

  data() {
    return data;
  },
  components: {
    //SideAccount  // 定義component
    // SideMenu
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss">
*{
  font-family: 微軟正黑體, Arial, Helvetica, sans-serif;
}
body {
  margin: 0;
  padding: 0;
}
// .app-header {
//   background-color: #efca16;
//   height: 6vh;
// }
a {
  color: black !important;
}
.logo {
  display: inline-block;
  font-weight: normal;
  text-decoration: none;
  color: black;
  font-size: 4vh;
  padding: 10px;
}
.side-menu {
  /* border-color: chartreuse;
      border-style: solid;  */
  color: black;
  a {
    font-weight: normal;
    text-decoration: none;
  }
}
.menu-item {
  border: solid #d9d1ba;
  border-radius: 10px;
  margin: 5%;
  height: fit-content;
  width: auto;
  padding: 20px;
  color: black;
  &.disabled {
    cursor: not-allowed;
    a {
      cursor: not-allowed;
    }
  }
}
</style>
