<template>
  <div id="app">
    <div class="header">
      <router-link :to="HomeLink" class="logo">記帳網</router-link>
    </div>
    <div class="container">
      <div class="side-menu">
        <div class="menu-item" v-for="(item,index) in menu" :key="index">
          <router-link :to="item.link" class="title">{{item.title}}</router-link>
          <!-- router-link只是表示換哪個component網址 -->
        </div>
      </div>
      <!-- 使用sideAccount這個component,並傳入變數accountData -->
      <!--SideAccount :accountData="accountData1" /-->
      <!-- :引入SideAccount變數名稱="在App的變數名稱" -->

      <router-view></router-view>
      <!-- 真正幫你引入component -->
    </div>
  </div>
</template>

<script>
// 定義component,不是global,只有APP知道
//import SideAccount from './components/SideAccount.vue'

let data = {
  //  accountData1:[
  //     {src:'#',category:'收支項名',money:'金額',account:'帳戶'},
  //     {src:'#',category:'收支項名',money:'金額',account:'帳戶'},
  //     {src:'#',category:'收支項名',money:'金額',account:'帳戶'}
  // ],
  HomeLink: "/",
  menu: [
    { title: "統計圖產生", link: "" },
    { title: "周/月帳目一覽", link: "/Account" },
    { title: "類別編輯", link: "" },
    { title: "帳戶管理", link: "" },
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
  },
  computed: {},
  methods: {}
};
</script>

<style>
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);
body {
  margin: 0;
  padding: 0;
  font-family: "Noto Sans TC", "微軟正黑體", Arial, Helvetica, sans-serif;
  font-weight: bold;
}

.header {
  background-color: #efca16;
  height: 6vh;
  position: relative;
}

.logo {
  display: inline-block;
  text-decoration: none;
  color: black;
  height: 6vh;
  margin: auto;
  font-size: 4vh;
  margin-left: 10px;
}

.container {
  display: flex;
}

.side-menu {
  border-right: 3px #cccccc solid;
  width: 18vw;
  height: 94vh;
}

.menu-item {
  border: solid #d9d1ba;
  border-radius: 10px;
  margin: 5%;
  height: fit-content;
  width: auto;
  padding: 20px;
}
.side-menu a {
  font-weight: normal;
  text-decoration: none;
  color: black;
}
</style>
