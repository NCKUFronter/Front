<template>
  <v-app>
    <v-app-bar
      v-if="!page1 || login"
      transition="slide-y-transition"
      color="transparent"
      clipped-left
      flat
      app
      dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="login"></v-app-bar-nav-icon>

      <h1 class="logo d-flex align-center">
        <img src="./assets/logo.png" class="pr-2" />
        <div v-if="login">星，際帳</div>
      </h1>
      <v-spacer />

      <!-- peraonal account -->
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" :v-on:click="accountClick()">
            <v-icon large color="white">mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-card flat v-if="!login" style="padding:5px ">
          <v-card-title class="justify-center">尚未登入</v-card-title>
          <v-btn outlined flat block color="#cccccc" style="padding:10px " v-on:click="toLogin">登入</v-btn>
        </v-card>
        <v-card flat v-if="login" class="text-center">
          <v-img
            :src="personal.img"
            style="border-radius: 50%; height:100px; width:100px; margin: auto; margin-top: 20px;"
          ></v-img>
          <v-card-title class="justify-center">{{personal.username}}</v-card-title>
          <v-card-subtitle>{{personal.ID}}</v-card-subtitle>
          <v-card-text>{{personal.email}}</v-card-text>
          <v-btn outlined block style="margin-bottom:10px " color="#cccccc">
            <v-icon>mdi-file-edit-outline</v-icon>綁定信用卡
          </v-btn>
          <v-btn outlined block color="#cccccc" v-on:click="toLogout">
            <v-icon>mdi-logout-variant</v-icon>登出
          </v-btn>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-card class="mx-auto" v-if="login">
      <v-navigation-drawer
        v-model="drawer"
        hide-overlay
        :permanent="$vuetify.breakpoint.mdAndUp"
        :temporary="$vuetify.breakpoint.smAndDown"
        clipped
        app
        class="nav-drawer"
        style="top: 56px"
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
    </v-card>

    <v-content style="padding: 0;">
      <!-- id="scroll-target" class="overflow-y-auto"  -->
      <!-- <v-app-bar class="mx-auto overflow-hidden" color="#efca16" elevate-on-scroll clipped-left app>
      </v-app-bar>-->
      <v-container id="scroll-target" class="all" fluid v-if="!login" style=" padding: 0;">
        <!-- class="overflow-y-auto" -->
        <!-- <div 
        v-scroll:#scroll-target="onScroll"
        align="center"
        class="all"
        >-->
        <v-layout class="page">
          <!-- <v-parallax  src="./image/home/p1/bookkeeping2.png" style="width:100%;height:100%;padding:0" > -->
          <v-img src="./image/home/p1/background_block.svg" class="background"></v-img>
          <img src="./image/home/p1/middle_block.png" height="120%" class="planet" />
          <!-- <img src="./image/home/p1/rocket.png" height="100%" class="rocket" > -->
          <img
            src="./image/home/p1/bookkeeping2.png"
            height="120%"
            class="book-keeping"
            v-rellax="{speed:-10,}"
          />
          <img src="./image/home/p1/right_block_dark.svg" height="48.9%" class="right-block" />
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
          <v-img src="./image/home/p2/background_block.svg" class="background"></v-img>
          <transition name="cardfade">
            <v-card-title v-if="cardShow" class="p2t1">宇宙級服務與特色</v-card-title>
          </transition>
          <transition name="cardfade">
            <div v-if="cardShow" class="feature-block">
              <div class="card pos1">
                <img src="./image/home/p2/feature_block_1.svg" height="100%" />
                <v-card-text class="p2t2">社群記帳功能，讓父母與小孩共同記下生活中的每樣精采事物。</v-card-text>
              </div>
              <div class="card pos2">
                <img src="./image/home/p2/feature_block_2.svg" height="100%" />
                <v-card-text class="p2t2">藉由交易紀錄，讓孩子學習審視自己的金錢流，培養金錢進與出的觀念。</v-card-text>
              </div>
              <div class="card pos1">
                <img src="./image/home/p2/feature_block_1.svg" height="100%" />
                <v-card-text class="p2t2">在遊戲中使用回饋點數，讓孩子更加參與其中。</v-card-text>
              </div>
              <div class="card pos2">
                <img src="./image/home/p2/feature_block_2.svg" height="100%" />
                <v-card-text class="p2t2">綁定永豐銀行信用卡，自動登入每筆消費金額，記帳輕鬆無負擔。</v-card-text>
              </div>
            </div>
          </transition>
        </v-layout>
        <v-layout v-if="account" class="page">
          <v-img src="./image/home/p3/background_block.svg" class="background"></v-img>

          <img src="./image/home/p3/img_background.svg" height="115%" class="img-background" />
          <img src="./image/home/p3/text_background.svg" height="100%" class="text-background" />
          <img src="./image/home/p3/img.svg" height="88%" class="phone" />
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
          <v-img src="./image/home/p4/background_block.svg" class="background"></v-img>
          <img src="./image/home/p4/img_background.svg" height="115%" class="img4-background" />
          <img src="./image/home/p4/text_background.svg" height="100%" class="text4-background" />
          <img src="./image/home/p4/img.svg" height="50%" class="ship" />
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
      <div v-if="login" class="px-4">
        <router-view></router-view>
      </div>
    </v-content>
  </v-app>
</template>

<script>
let data = {
  offset: true,
  menu: [
    { title: "統計圖產生", link: "/summary" },
    { title: "周/月帳目一覽", link: "/accounting" },
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
  drawer: false,
  login: false,
  page1: false,
  offsetTop: 0,
  cardShow: false,
  account: true
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
    window.addEventListener("scroll", this.onScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
  },
  computed: {},
  methods: {
    onScroll(e) {
      console.log(e);
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
    toLogin() {
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
          this.personal.img = res.data.photo;
          this.personal.username = res.data.name;
          this.personal.ID = res.data._id;
          this.personal.email = res.data.email;
          //   console.log(this.totalPoint)
        })
        .catch(console.log);
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

.text-center {
  margin: 10px;
}

.v-navigation-drawer__border {
  display: none;
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
  right: -59.5%;
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

.card {
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
