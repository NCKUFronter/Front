<template>
  <v-app>
    <v-app-bar color="#efca16" clipped-left app dense>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-if="login && $vuetify.breakpoint.smAndDown"
      ></v-app-bar-nav-icon>

      <h1 class="logo">星．際帳</h1>
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
          <v-btn outlined block v-on:click="toLogin">登入</v-btn>
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
          <v-avatar size="128">
            <img :src="profile.photo" />
          </v-avatar>
          <v-card-title class="pb-1 justify-center">{{profile.name}}</v-card-title>
          <!--v-card-subtitle>{{profile._id}}</v-card-subtitle-->
          <v-card-text class="pb-0">{{profile.email}}</v-card-text>
          <v-btn outlined block color="#cccccc" disabled>
            <v-icon>mdi-file-edit-outline</v-icon>綁定信用卡
          </v-btn>
          <v-btn outlined block color="#cccccc">
            <v-icon>mdi-file-edit-outline</v-icon>每日點數
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
      <v-container fluid fill-height v-if="!login">
        <v-row align="center" class="notLoginPage">
          <v-flex xs12 sm6 md6 class="pa-6">
            <img src="./assets/homepage-phone.png" style="height: 100%; width: 100%" />
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
      <div v-else class="px-4">
        <router-view></router-view>
      </div>

      <v-dialog :value="false" width="unset" content-class="elevation-0 overflow-hidden">
        <v-progress-circular :width="7" :size="70" indeterminate color="primary"></v-progress-circular>
      </v-dialog>

      <GlobalSnackBar top name="alert" dismissible></GlobalSnackBar>
      <GlobalSnackBar bottom left name="notification"></GlobalSnackBar>
      <!--v-dialog :value="true" max-width="400px">
        <v-alert type="warning" class="mb-0">xxxxx</v-alert>
      </v-dialog-->
    </v-content>
  </v-app>
</template>

<script>
import GlobalSnackBar from "./components/GlobalSnackBar";

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
    return data;
  },
  components: {
    GlobalSnackBar
    //SideAccount  // 定義component
    // SideMenu
  },
  created() {
    this.$api.onNotLoginListener = () => {
      // this.$alert.open("你登入過期，請重新登入。", "error");
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
      this.$loading
        .insideLoading(this.$api.login(email, "0000"))
        .then(() => {
          // this.$alert.open("登入成功", "success");
        })
        .catch(console.log);
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
  padding-left: 10px;
}

.notLoginPage {
  padding: 5% 10% 0;
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
  }
}
</style>
