<template>
  <v-app>
    <v-app-bar
      transition="slide-y-transition"
      color="transparent"
      clipped-left
      :flat="!login"
      app
      dense
    >
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
            <v-icon large color="white">mdi-account-circle</v-icon>
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
          <v-btn outlined block @click="getPoints">
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
      style="top:56px"
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
      <!-- id="scroll-target" class="overflow-y-auto"  -->
      <!-- <v-app-bar class="mx-auto overflow-hidden" color="#efca16" elevate-on-scroll clipped-left app>
      </v-app-bar>-->
      <v-container id="scroll-target" class="all pa-0" fluid v-if="!login">
        <!-- class="overflow-y-auto" -->
        <!-- <div 
        v-scroll:#scroll-target="onScroll"
        align="center"
        class="all"
        >-->
        <v-layout class="page" style="margin-top: -48px">
          <!-- <v-parallax  src="./assets/home/p1/bookkeeping2.png" style="width:100%;height:100%;padding:0" > -->
          <v-img src="./assets/home/p1/background_block.svg" class="background"></v-img>
          <img src="./assets/home/p1/middle_block.png" height="120%" class="planet" />
          <!-- <img src="./assets/home/p1/rocket.png" height="100%" class="rocket" > -->
          <img
            src="./assets/home/p1/bookkeeping2.png"
            height="120%"
            class="book-keeping"
            v-rellax="{speed:-10,}"
          />
          <img src="./assets/home/p1/right_block_dark.svg" height="48.9%" class="right-block" />
          <div class="p1Text">
            <div class="p1rec"></div>
            <h1 class="p1t1">
              親子互動與
              <br />教育的新體驗
            </h1>
            <h1 class="p1t2">透過社群記帳與遊戲，讓父母從小培養孩子的金錢觀</h1>
            <button color="white" class="p1btn" outlined>開始使用</button>
          </div>

          <!-- </v-parallax> -->
        </v-layout>
        <v-layout class="page">
          <v-img src="./assets/home/p2/background_block.svg" class="background"></v-img>
          <transition name="cardfade">
            <v-card-title v-if="cardShow" class="p2t1">宇宙級服務與特色</v-card-title>
          </transition>
          <transition name="cardfade">
            <div v-if="cardShow" class="feature-block">
              <div class="home-card pos1">
                <img src="./assets/home/p2/feature_block_1.svg" height="100%" />
                <v-card-text class="p2t2">社群記帳功能，讓父母與小孩共同記下生活中的每樣精采事物。</v-card-text>
              </div>
              <div class="home-card pos2">
                <img src="./assets/home/p2/feature_block_2.svg" height="100%" />
                <v-card-text class="p2t2">藉由交易紀錄，讓孩子學習審視自己的金錢流，培養金錢進與出的觀念。</v-card-text>
              </div>
              <div class="home-card pos1">
                <img src="./assets/home/p2/feature_block_1.svg" height="100%" />
                <v-card-text class="p2t2">在遊戲中使用回饋點數，讓孩子更加參與其中。</v-card-text>
              </div>
              <div class="home-card pos2">
                <img src="./assets/home/p2/feature_block_2.svg" height="100%" />
                <v-card-text class="p2t2">綁定永豐銀行信用卡，自動登入每筆消費金額，記帳輕鬆無負擔。</v-card-text>
              </div>
            </div>
          </transition>
        </v-layout>

        <v-layout v-if="account" class="page">
          <v-img src="./assets/home/p3/background_block.svg" class="background"></v-img>

          <img src="./assets/home/p3/img_background.svg" height="115%" class="img-background" />
          <img src="./assets/home/p3/text_background.svg" height="100%" class="text-background" />
          <img src="./assets/home/p3/img.svg" height="88%" class="phone" />
          <div class="p3Text">
            <h1 class="p3t1">星 · 際帳</h1>
            <h1 class="p3t2">
              在這裡，你可以體驗由永豐提供的智慧生活，記下日常
              <br />消費的每筆帳目，並獲得回饋
            </h1>
            <button color="white" class="p3btn" outlined>創建帳戶</button>
            <button color="white" class="p3btn" outlined>登入</button>
          </div>
          <div class="p3bottom">
            <button @click="account=false" class="p3t3 p3b1" style="opacity:20%;">遊戲</button>
            <button @click="account=true" class="p3t3 p3b2" style="opacity:80%;">帳戶</button>
          </div>
        </v-layout>
        <v-layout v-if="!account" class="page">
          <v-img src="./assets/home/p4/background_block.svg" class="background"></v-img>
          <img src="./assets/home/p4/img_background.svg" height="115%" class="img4-background" />
          <img src="./assets/home/p4/text_background.svg" height="100%" class="text4-background" />
          <img src="./assets/home/p4/img.svg" height="50%" class="ship" />
          <div class="p3Text">
            <h1 class="p3t1">宇宙 · 戰艦</h1>
            <h1 class="p3t2">在遊戲中使用回饋點數，讓孩子也能樂於記帳</h1>
            <button color="white" class="p4btn" outlined>開啟你的星際探險</button>
          </div>
          <div class="p3bottom">
            <button @click="account=false" class="p3t3 p3b1" style="opacity:80%;">遊戲</button>
            <button @click="account=true" class="p3t3 p3b2" style="opacity:20%">帳戶</button>
          </div>
        </v-layout>
        <!-- </div> -->
      </v-container>

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
    <GlobalSnackBar
      bottom
      dismissible
      border="left"
      text
      left
      :state="$notification.snackbar.state"
    >
      <template v-slot="{ state }">
        <v-avatar v-if="state.data">
          <img :src="state.data.photo" />
        </v-avatar>
        <span class="black--text">{{state.message}}</span>
      </template>
    </GlobalSnackBar>
  </v-app>
</template>

<script>
import GlobalSnackBar, { initSnackbarData } from "./components/GlobalSnackBar";
import GlobalDialog, { initDialogData } from "./components/GlobalDialog";
import { ignoreNotLoginError } from "./utils";
import { NotificationService } from "./plugins/NotificationService";

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
  drawer: false,
  offsetTop: 0,
  cardShow: false,
  account: true
};

export default {
  name: "App",
  data() {
    this.$alert = initSnackbarData();
    this.$notification = new NotificationService(
      initSnackbarData(),
      this.$api.raw.defaults.baseURL
    );
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
    window.addEventListener("scroll", this.onScroll);
    this.$api.onNotLoginListener = () => {
      this.$alert.error("你登入過期，請重新登入。");
    };
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
      if (this.login) {
        this.$notification.connect();
      } else this.$notification.closeAll();

      if (this.login && this.$route.name == null) {
        this.$router.push("/accounting");
      }
    }
  },
  methods: {
    onScroll(e) {
      // console.log(e);
      var posY =
        (e.target.body || e.target.documentElement || e.target.body.parentNode)
          .scrollTop || e.currentTarget.pageYOffset;
      this.offsetTop = posY;
      if (this.offsetTop >= 400) {
        this.cardShow = true;
      } else {
        this.cardShow = false;
      }
      if (this.offsetTop > 1050) {
        this.cardShow = false;
      }
    },
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
    },
    getPoints() {
      this.$http
        .post("/user/pointCheck")
        .then(res => {
          let message = "";
          if (res.data.perLogin)
            message += `獲得每日登入點數: ${res.data.perLogin}點\n`;
          if (res.data.continueLogin)
            message += `獲得連續登入點數: ${res.data.continueLogin}點\n`;
          if (message) {
            this.$api.updateProfile();
            this.$alert.info(message);
          } else this.$alert.info("沒有點數QQ");
        })
        .catch(ignoreNotLoginError)
        .catch(err => {
          console.log(err);
          this.$alert.error("領取失敗");
        });
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
    this.$notification.closeAll();
  }
};
</script>

<style lang="scss">
html {
  margin: 0;
  padding: 0;
  overflow: visible !important;
}
// .app-header {
//   background-color: #efca16;
//   height: 6vh;
// }

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

/* width */
::-webkit-scrollbar {
  width: 10px;
  background-color: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

// new
/* .container{
    margin: 0;
    padding: 0;
    height: 100%;
} */
.all {
  height: 100vh;
  // height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  // border: hotpink 2px solid;
  // overflow-y: hidden;
}
.page {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  /* border: solid springgreen 2px; */
  /* background-color: springgreen; */
}
.left-block {
  position: absolute;
  left: 0;
  z-index: 6;
}
.right-block {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2;
}
.rocket {
  position: absolute;
  // top:5%;
  // right: 38.7%;
  z-index: 4;
}
.book-keeping {
  position: absolute;
  right: -24.9%;
  z-index: 3;
}

.parents {
  position: absolute;
}
.planet {
  position: absolute;
  top: -19%;
  z-index: 4;
}

.p1rec {
  height: 10px;
  width: 45%;
  background: #fff294;
  position: relative;
  right: 15%;
  margin-bottom: 8%;
}
.p1Text {
  position: absolute;
  z-index: 7;
  top: 30%;
  left: 10%;
  font-family: Microsoft YaHei UI, 微軟正黑體, Arial, Helvetica, sans-serif;
}
.p1t1 {
  color: #fff294;
  font-weight: bold;
  font-size: 55px;
  line-height: 120%;
  font-family: Microsoft YaHei UI, 微軟正黑體, Arial, Helvetica, sans-serif;
  text-align: left;
}
.p1t2 {
  color: white;
  font-weight: bold;
  font-size: 20px;
  margin: 8% 0%;
  text-align: left;
}

.p1btn {
  border: solid white 2px;
  width: 50%;
  padding: 2%;
  border-radius: 15px;
  font-size: 24px;
  color: white;
  font-weight: bold;
  font-family: Microsoft YaHei UI, 微軟正黑體, Arial, Helvetica, sans-serif;
  align-items: flex-start;
}

.p1btn:hover {
  color: #fff294;
  border: solid #fff294 2px;
}

/* p2 */
.v-card__title.p2t1 {
  margin-top: 8%;
  position: absolute;
  width: 100%;
  font-size: 2.9rem;
  font-weight: bold;
  color: #fff294;
  font-family: Microsoft YaHei UI, 微軟正黑體, Arial, Helvetica, sans-serif;
  justify-content: center;
  // top: 22%;
}

.feature-block {
  margin-top: 16%;
  padding: 0% 0%;
  position: absolute;
  display: flex;
  width: 100%;
  height: 50%;
  justify-content: space-evenly;
}

.v-card__text.p2t2 {
  position: absolute;
  top: 35%;
  width: 100%;
  height: 65%;
  color: white;
  font-size: 1.2rem;
  line-height: 140%;
  padding: 15%;
  // border: white 2px solid;
}

.home-card {
  position: relative;
  width: 14%;
  // border: white 2px solid;
}

.cardfade-enter-active,
.cardfade-leave-active {
  transition: all 2s ease;
}

.cardfade-enter {
  transform: translateY(15px);
  opacity: 0;
}

.cardfade-leave-to {
  transform: translateY(-15px);
  opacity: 0;
}

/* p3 */
.img-background {
  position: absolute;
  top: -16vh;
}
.text-background {
  position: absolute;
}
.phone {
  position: absolute;
  left: 10%;
  top: 18%;
  transition: 0.9s ease-in;
}

.p3Text {
  position: absolute;
  top: 30%;
  left: 50%;
  font-family: Microsoft YaHei UI, 微軟正黑體, Arial, Helvetica, sans-serif;
}
.p3t1 {
  color: #fff294;
  font-weight: bold;
  font-size: 40px;
  line-height: 120%;
  font-family: Microsoft YaHei UI, 微軟正黑體, Arial, Helvetica, sans-serif;
  text-align: left;
}
.p3t2 {
  color: white;
  font-weight: bold;
  font-size: 20px;
  margin: 8% 0%;
  text-align: left;
}

.p3btn {
  border: solid white 1px;
  width: 30%;
  border-radius: 20px;
  padding: 1%;
  font-size: 14px;
  color: white;
  font-family: Microsoft YaHei UI, 微軟正黑體, Arial, Helvetica, sans-serif;
  margin-left: 3%;
}

.p3btn:hover {
  color: #fff294;
  border: solid #fff294 2px;
}

.p3bottom {
  position: absolute;
  bottom: 4%;
  width: 100%;
}

.p3t3 {
  display: inline;
  font-size: 24px;
  color: white;
  font-family: Microsoft YaHei UI, 微軟正黑體, Arial, Helvetica, sans-serif;
}

.p3b1 {
  margin-left: 24%;
}
.p3b2 {
  margin-left: 49%;
}

/* p4 */
.img4-background {
  position: absolute;
  right: -3%;
  top: -34%;
}
.text4-background {
  position: absolute;
}
.ship {
  position: absolute;
  left: 10%;
  top: 15%;
}

.p4btn {
  border: solid white 1px;
  width: 50%;
  border-radius: 20px;
  padding: 1%;
  font-size: 14px;
  color: white;
  font-family: Microsoft YaHei UI, 微軟正黑體, Arial, Helvetica, sans-serif;
  margin-left: 3%;
}

.p4btn:hover {
  color: #fff294;
  border: solid #fff294 2px;
}
</style>
