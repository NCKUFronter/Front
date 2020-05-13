<template>
  <v-app>
    <v-app-bar color="#efca16" clipped-left app dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="login"></v-app-bar-nav-icon>
      <!-- <v-menu bottom :offset-y="offset" transition="slide-x-transition" right>
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
      </v-menu>-->

      <h1 class="logo">記帳網</h1>
      <v-spacer />

      <!-- peraonal account -->
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon large>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-card flat v-if="!login" style="padding:5px ">
          <v-card-title class="justify-center">尚未登入</v-card-title>
          <v-btn outlined block v-on:click="toLogin">登入</v-btn>
        </v-card>
        <v-card flat v-if="login" class="text-center">
          <v-img
            :src="profile.photo"
            style="border-radius: 50%; height:100px; width:100px; margin: auto; margin-top: 20px;"
          ></v-img>
          <v-card-title class="justify-center">{{profile.name}}</v-card-title>
          <v-card-subtitle>{{profile._id}}</v-card-subtitle>
          <v-card-text>{{profile.email}}</v-card-text>
          <v-btn outlined block style="margin-bottom:10px " color="#cccccc">
            <v-icon>mdi-file-edit-outline</v-icon>綁定信用卡
          </v-btn>
          <v-btn outlined block v-on:click="toLogout">
            <v-icon>mdi-logout-variant</v-icon>登出
          </v-btn>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      hide-overlay
      :permanent="$vuetify.breakpoint.mdAndUp"
      :temporary="$vuetify.breakpoint.smAndDown"
      class="nav-drawer"
      app
      v-if="login"
    >
      <v-list nav>
        <v-list-item
          class="side-menu"
          v-for="(item, index) in menu"
          :key="index"
          :class="{ 'menu-item': true, disabled: !item.link }"
        >
          <router-link :to="item.link">{{ item.title }}</router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid fill-height v-if="!login">
        <v-row align="center" class="notLoginPage">
          <v-flex xs12 sm6 md6 class="pa-6">
            <v-img src="./assets/homepage-phone.png"></v-img>
          </v-flex>
          <v-flex xs12 sm6 md6 class="pa-6">
            <v-card-title color="#efca16" class="font-weight-bold">星．際帳</v-card-title>
            <v-card-text>在這裡，你可以體驗由永豐提供的智慧生活，記下日常消費的每筆帳目，並獲得回饋點數</v-card-text>
            <v-btn outlined color="#414141" class="ma-3">創建帳戶</v-btn>
            <v-btn outlined color="#414141" class="ma-3">登入</v-btn>
          </v-flex>
        </v-row>
      </v-container>

      <!-- <SideMenu /> -->

      <!-- router-link只是表示換哪個component網址 -->
      <!-- 使用sideAccount這個component,並傳入變數accountData -->
      <!--SideAccount :accountData="accountData1" /-->
      <!-- :引入SideAccount變數名稱="在App的變數名稱" -->

      <!-- router真正幫你引入component -->
      <div v-else>
        <router-view></router-view>
      </div>
    </v-content>
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
    { title: "記帳管理", link: "/accounting" },
    // { title: "帳戶管理", link: "/personal" },
    { title: "點數管理", link: "/point" }
    // { title: "雲端備分", link: "" },
    // { title: "統一發票", link: "" }
  ],
  personal: {
    img: "",
    username: "",
    ID: "",
    email: ""
  },
  profile: null,
  drawer: false,
  login: false
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
  created() {
    // var that = this;
    // this.$set(that, 'login', this.GLOBAL.loginStatus)
    // console.log(this.GLOBAL.loginStatus)
    // console.log(this.login)
    this.$api.loginListener = login => {
      this.login = login;
      this.profile = this.$api.profile;
      if(this.$route.name == null) {
        this.$router.push("/accounting");
      }
    };
  },
  computed: {},
  methods: {
    /*
    accountClick() {
      this.$http
        .get("/user/profile")
        .then(res => {
          this.GLOBAL.loginStatus = true;
          this.login = this.GLOBAL.loginStatus;
          this.personal.img = res.data.photo;
          this.personal.username = res.data.name;
          this.personal.ID = res.data._id;
          this.personal.email = res.data.email;
        })
        .catch(err => {
          this.GLOBAL.loginStatus = false;
          this.login = this.GLOBAL.loginStatus;
        });
    },
    */
    toLogin() {
      /*
      this.$http
        .post(
          "/user/login",
          { email: "father@gmail.com", password: "0000" },
          { withCredentials: true }
        )
        .then(res => {
          // this.login=true;
          this.GLOBAL.loginStatus = true;
          this.login = this.GLOBAL.loginStatus;
          console.log(this.GLOBAL.loginStatus);
          this.$router.push("/accounting");
          // console.log(this.login)
          return this.$http.get("/user/profile");
        })
        .then(res => {
          this.profile = res.data;
          this.personal.img = res.data.photo;
          this.personal.username = res.data.name;
          this.personal.ID = res.data._id;
          this.personal.email = res.data.email;
          //   console.log(this.totalPoint)
        })
        .catch(console.log);
        */
      this.$api.userLogin("father@gmail.com", "0000").catch(console.log);
    },

    toLogout() {
      this.$http
        .post("/user/logout", { withCredentials: true })
        .then(res => {
          // this.login=false;
          this.GLOBAL.loginStatus = false;
          this.login = this.GLOBAL.loginStatus;
          this.$router.push("");
        })
        .catch(console.log);
    }
  }
};
</script>

<style lang="scss">
html {
  margin: 0;
  padding: 0;
  overflow: hidden !important;
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
  font-weight: bold;
  text-decoration: none;
  color: black;
  font-size: 1.6rem;
  padding-left: 10px;
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

.notLoginPage {
  padding: 5% 10% 0;
}

.v-content {
  overflow-x: auto;
  // background-color: #fafafa !important;
}

.nav-drawer {
  background-color: #fafafa !important;
  margin-top: 56px;
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

.text-center {
  margin: 10px;
}

.v-navigation-drawer__border {
  display: none;
}
</style>
