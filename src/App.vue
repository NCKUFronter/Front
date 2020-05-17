<template>
  <v-app>
    <v-app-bar color="#efca16" clipped-left :elevate-on-scroll="!login" app dense>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-if="login && $vuetify.breakpoint.smAndDown"
      ></v-app-bar-nav-icon>

      <h1 class="logo d-flex align-center">
        <img src="./assets/logo.png" class="pr-2" />
        <div v-if="login">星，際帳</div>
      </h1>
      <v-spacer />

      <!-- peraonal account -->
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon large>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-card flat v-if="!login" class="pa-2">
          <v-card-title class="justify-center">尚未登入</v-card-title>
          <v-btn outlined block v-on:click="toLogin">
            <v-icon small>mdi-google</v-icon>登入
          </v-btn>
          <v-btn outlined block v-on:click="doLogin('father@gmail.com')">
            <v-icon>mdi-login-variant</v-icon>爸爸登入
          </v-btn>
          <v-btn outlined block v-on:click="doLogin('mother@gmail.com')">
            <v-icon>mdi-login-variant</v-icon>媽媽登入
          </v-btn>
          <v-btn outlined block v-on:click="doLogin('child@gmail.com')">
            <v-icon>mdi-login-variant</v-icon>小孩登入
          </v-btn>
        </v-card>
        <v-card flat v-else class="pa-2 text-center">
          <v-avatar size="128" class="elevation-4">
            <img :src="profile.photo" />
          </v-avatar>
          <v-card-title class="pb-1 justify-center">{{profile.name}}</v-card-title>
          <!--v-card-subtitle>{{profile._id}}</v-card-subtitle-->
          <v-card-text class="pb-0">{{profile.email}}</v-card-text>
          <v-btn outlined block color="#cccccc" disabled>
            <v-icon>mdi-file-edit-outline</v-icon>綁定信用卡
          </v-btn>
          <v-btn outlined block color="#cccccc">
            <v-icon>mdi-alpha-p-circle-outline</v-icon>每日點數
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
          v-for="(item, index) in menu"
          :key="index"
          :class="{ 'menu-item': true, disabled: !item.link }"
          :to="item.link"
          active-class="active"
        >
          <v-icon class="mr-2">{{item.icon}}</v-icon>
          {{ item.title }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid fill-height v-if="!login" style="background-color:#efca16">
        <v-row class="notLoginPage" justify="center" align="center">
          <v-flex xs12 sm12 md5>
            <img src="./assets/main.png" class="main-img" />
          </v-flex>
          <v-flex xs12 sm12 md5 offset-1>
            <h1 class="title1">星．際帳</h1>
            <h3 class="subtitle">
              在這裡，你可以體驗由永豐提供的智慧生活，
              <br />記下日常消費的每筆帳目，並獲得回饋點數
            </h3>
            <!--v-btn outlined color="#414141" class="mr-3">創建帳戶</v-btn-->
            <v-btn outlined color="#414141" class="text-capitalize" @click="toLogin">Google登入</v-btn>
            <v-row>
              <div class="square" style="background:#ccc;">
                <!-- <v-icon class="icon" color="white" large>mdi-playlist-edit</v-icon> -->
              </div>
              <div class="square" style="background:#706e6d;">
                <!-- <v-icon class="icon" color="white" large>mdi-chevron-right</v-icon> -->
              </div>
              <div class="square" style="background:#26282d;">
                <!-- <v-icon class="icon" color="white" large>mdi-alpha-p-circle-outline</v-icon> -->
              </div>
              <div class="square" style="background:#ccc;">
                <!-- <v-icon class="icon" color="white" large>mdi-chevron-right</v-icon> -->
              </div>
              <div class="square" style="background:#706e6d;">
                <!-- <v-icon class="icon" color="white" large>mdi-gamepad-variant-outline</v-icon> -->
              </div>
            </v-row>
          </v-flex>
        </v-row>
      </v-container>

      <!-- <SideMenu /> -->

      <!-- router-link只是表示換哪個component網址 -->
      <!-- 使用sideAccount這個component,並傳入變數accountData -->
      <!--SideAccount :accountData="accountData1" /-->
      <!-- :引入SideAccount變數名稱="在App的變數名稱" -->

      <!-- router真正幫你引入component -->
      <div v-else class="px-4">
        <router-view></router-view>
      </div>
    </v-content>

    <v-dialog
      :value="loading"
      width="unset"
      persistent
      overlay-opacity="0.2"
      content-class="elevation-0 overflow-hidden"
    >
      <v-progress-circular :width="7" :size="70" indeterminate color="primary"></v-progress-circular>
    </v-dialog>

    <GlobalDialog
      :state="$confirm.state"
      prominent
      persistent
      outlined
      border="top"
      icon="mdi-help"
    ></GlobalDialog>
    <GlobalSnackBar dismissible top :state="$alert.state"></GlobalSnackBar>
    <GlobalSnackBar bottom left :state="$notification.state"></GlobalSnackBar>
  </v-app>
</template>

<script>
import GlobalSnackBar, { initSnackbarData } from "./components/GlobalSnackBar";
import GlobalDialog, { initDialogData } from "./components/GlobalDialog";

// 定義component,不是global,只有APP知道
//import SideAccount from './components/SideAccount.vue'
// import SideMenu from './components/SideMenu.vue'
let data = {
  offset: true,
  menu: [
    { icon: "mdi-chart-arc", title: "統計圖產生", link: "/summary" },
    { icon: "mdi-calculator", title: "記帳管理", link: "/accounting" },
    // { title: "帳戶管理", link: "/personal" },
    { icon: "mdi-alpha-p-circle", title: "點數管理", link: "/point" }
    // { title: "雲端備分", link: "" },
    // { title: "統一發票", link: "" }
  ],
  drawer: false
};

export default {
  name: "App",
  data() {
    this.$alert = initSnackbarData();
    this.$notification = initSnackbarData();
    this.$confirm = initDialogData();
    return data;
  },
  components: {
    GlobalSnackBar,
    GlobalDialog
    //SideAccount  // 定義component
    // SideMenu
  },
  provide() {
    return {
      $alert: this.$alert,
      $notification: this.$notification,
      $confirm: this.$confirm
    };
  },
  created() {
    this.$api.onNotLoginListener = () => {
      this.$alert.error("你登入過期，請重新登入。");
    };
  },
  mounted() {
    // this.$notification.open("我很吵~~~~", "info");
  },
  computed: {
    login() {
      return this.$api.user.login;
    },
    profile() {
      return this.$api.user.profile;
    },
    loading() {
      return this.$loading.status.isRunning;
    }
  },
  watch: {
    login(val) {
      if (this.login && this.$route.name == null) {
        this.$router.push("/accounting");
      }
    }
  },
  methods: {
    toLogin() {
      // this.$api.login("father@gmail.com", "0000").catch(console.log);
      window.location = "/api/login/auth/google";
    },
    doLogin(email) {
      this.$api
        .login(email, "0000")
        .then(() => {
          this.$alert.success("登入成功");
        })
        .catch(err => {
          console.log(err);
          this.$alert.error("登入失敗");
        });
    },
    toLogout() {
      this.$api
        .logout()
        .then(res => {
          if (this.$route.name != null) this.$router.push("/");
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
  overflow: visible;
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
  color: #fff;
  font-size: 1.6rem;

  img {
    opacity: 0.8;
    height: 30px;
  }
}

.notLoginPage {
  padding: 0% 5% 0;
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
  &.active {
    background-color: #fff !important; /** not working */
  }
  &.disabled {
    cursor: not-allowed;
    a {
      cursor: not-allowed;
    }
  }
}

.v-navigation-drawer__border {
  display: none;
}

.v-menu__content {
  button.v-btn {
    margin-top: 10px;
    margin-bottom: 5px;

    i {
      padding-right: 5px;
    }
  }
}
.title1 {
  /*font-family: 微軟正黑體, Arial, Helvetica, sans-serif;*/
  color: white;
  font-size: 50px;
}

.subtitle {
  color: #414141;
  /*font-family: 微軟正黑體, Arial, Helvetica, sans-serif;*/
  margin: 1.5% 0%;
  line-height: 180%;
}

.square {
  width: 80px;
  height: 80px;
  margin: 1%;
  margin-top: 5%;
}

.main-img {
  height: 100%;
  width: 100%;
}
// .icon{
//   color:white;
//   margin: 35%;
//   opacity: 50%;

// }
</style>
