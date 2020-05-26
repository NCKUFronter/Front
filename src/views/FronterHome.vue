<template>
  <v-layout>
    <v-flex v-if="this.$vuetify.breakpoint.mdAndUp">
      <transition name="fade">
        <img v-show="vanish" class="FH_page" src="../assets/fronter/home/home_logo.svg" width="45%" />
      </transition>

      <v-flex v-if="vanish" class="FH_brand">FRONTER</v-flex>

      <v-flex v-if="vanish" class="FH_slogan">A Brand-New Spending App</v-flex>

      <v-flex @click="toToggle">
        <transition name="brandmove">
          <v-flex v-show="show" class="FH_brand brand_des">FRONTER</v-flex>
        </transition>
        <transition name="sloganmove">
          <v-flex v-show="show" class="FH_slogan slogan_des">A Brand-New Spending App</v-flex>
        </transition>
        <transition name="slidedown">
          <v-flex v-show="show" class="FH_bar FH_fronter_bar"></v-flex>
        </transition>
        <transition name="slideup">
          <v-flex v-show="show" class="FH_bar FH_slogan_bar"></v-flex>
        </transition>
      </v-flex>
    </v-flex>
    <v-flex v-if="this.$vuetify.breakpoint.smAndDown">
      <transition name="fade">
        <img
          v-show="vanish"
          class="FH_page sm"
          src="../assets/fronter/home/home_logo.svg"
          width="85%"
        />
      </transition>

      <v-flex v-if="vanish" class="FH_brand sm">FRONTER</v-flex>

      <v-flex v-if="vanish" class="FH_slogan sm">A Brand-New Spending App</v-flex>

      <v-flex @click="toToggle">
        <transition name="brandmove">
          <v-flex v-show="show" class="FH_brand brand_des sm">FRONTER</v-flex>
        </transition>
        <transition name="sloganmove">
          <v-flex v-show="show" class="FH_slogan slogan_des sm">A Brand-New Spending App</v-flex>
        </transition>
        <transition name="slidedown">
          <v-flex v-show="show" class="FH_bar FH_fronter_bar sm"></v-flex>
        </transition>
        <transition name="slideup">
          <v-flex v-show="show" class="FH_bar FH_slogan_bar sm"></v-flex>
        </transition>
      </v-flex>
    </v-flex>

    <v-app-bar transition="slide-y-transition" flat app v-if="$vuetify.breakpoint.mdAndUp">
      <h1 class="FH_logo d-flex align-lg-center justify-center">
        <div>FRONTER</div>
      </h1>
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <img v-if="open" @click="toOpen" src="../assets/fronter/home/user_outline_unclick.svg" />
            <img v-if="!open" @click="toOpen" src="../assets/fronter/home/user_outline_clicked.svg" />
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
  </v-layout>
</template>

<script>
let data = {
  menu: [
    { title: "帳目", link: "/accounting" },
    { title: "統記", link: "/summary" },
    { title: "類別", link: "/point" }
  ],
  show: false,
  vanish: true,
  open: true,
  login: false
};

export default {
  name: "FronterHomeName",

  data() {
    return data;
  },
  components: {
    // imageWidth() {
    //   switch (this.$vuetify.breakpoint.name) {
    //     case "xs":
    //       return "220px";
    //     case "sm":
    //       return "400px";
    //     case "md":
    //       return "500px";
    //     case "lg":
    //       return "45%";
    //     case "xl":
    //       return "50%";
    //   }
    // }
  },
  created() {
    var self = this;
    setTimeout(function() {
      self.vanish = !self.vanish;
      self.show = !self.show;
    }, 1000);
  },

  mounted: function() {},
  methods: {
    toToggle() {
      this.show = !this.show;
    },
    toOpen() {
      this.open = !this.open;
    }
  },
  computed: {}
};
</script>

<style scoped lang="scss">
.FH_logo {
  color: white;
  font-weight: 400;
}
.FH_page {
  left: 27.5vw;
  top: 13vh;
  overflow: hidden;
  position: absolute;
  z-index: 1;
}
.FH_page.sm {
  left: 8vw;
  top: 25vh;
}
.FH_brand {
  font-family: Calibri;
  left: 30%;
  color: #fff294;
  font-size: 500%;
  color: #fff294;
  background-color: #ffffff00;
  top: 28%;
  font-weight: bold;
  position: absolute;
  z-index: 2;
}
.FH_brand.sm {
  font-size: 200%;
  top: 35%;
  left: 16.5%;
}
.FH_slogan.sm {
  font-size: 90%;
  right: 12%;
  bottom: 45%;
}
.brand_des {
  transform: translateX(43%) translateY(46%);
}
.brand_des.sm {
  transform: translateX(55%) translateY(60%);
}
.slogan_des {
  transform: translateX(-41.5%) translateY(-90%);
}
.slogan_des.sm {
  transform: translateX(-35%) translateY(-110%);
}
.FH_slogan {
  color: #fff294;
  font-family: Calibri;
  background-color: #ffffff00;
  font-size: 155%;
  position: absolute;
  right: 30.9%;
  font-weight: bold;
  bottom: 33%;
  z-index: 2;
}
.FH_bar {
  position: absolute;
  background-color: #fff294;
  border-radius: 4px;
  top: 55%;
  z-index: 2;
  height: 6px;
}
.FH_bar.sm {
  border-radius: 4px;
  top: 47%;
  height: 3px;
}
.FH_fronter_bar {
  width: 17.3vw;
  left: 27.5%;
}
.FH_fronter_bar.sm {
  width: 40%;
  left: 8.3%;
}
.FH_slogan_bar {
  right: 27.5%;
  width: 27.9vw;
}
.FH_slogan_bar.sm {
  right: 7.2%;
  width: 45%;
}

.fade-leave-active,
.slidedown-enter-active,
.slideup-enter-active,
.sloganmove-enter-active,
.brandmove-enter-active {
  transition: all 0.8s;
}
.sloganmove-enter-active.sm,
.brandmove-enter-active.sm {
  transition: all 0.8s;
}
.sloganmove-enter.sm {
  transform: translateX(0%) translateY(0%);
}
.brandmove-enter.sm {
  transform: translateX(0%) translateY(0%);
}
.fade-leave-to {
  transform: translateY(-25px);
  opacity: 0;
}
.sloganmove-enter {
  transform: translateX(0%) translateY(0%);
}
.brandmove-enter {
  transform: translateX(0%) translateY(0%);
}

.slidedown-enter {
  transform: translateY(-880%);
}
.slideup-enter {
  transform-origin: center;
  transform: translateX(20%) translateY(1520%) scaleY(0.5) scaleX(0.6);
}

.slidedown-leave-to,
.slideup-leave-to,
.sloganmove-leave-to,
.brandmove-leave-to {
  opacity: 0;
}
.slidedown-leave-active,
.slideup-leave-active,
.sloganmove-leave-active,
.brandmove-leave-active {
  transition: all 0.2s;
}
</style>
