<template>
  <v-layout>
    <v-app-bar transition="slide-y-transition" color="#26282d" flat clipped app></v-app-bar>
    <v-flex v-if="this.$vuetify.breakpoint.mdAndUp">
      <transition name="fade">
        <img v-show="vanish" class="FH_page" src="../assets/fronter/home/home_logo.svg" width="45%" />
      </transition>

      <v-flex v-if="vanish" class="FH_brand">FRONTER</v-flex>

      <v-flex v-if="vanish" class="FH_slogan">A Brand-New Spending App</v-flex>

      <v-flex>
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
  vanish: true
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
    setTimeout(function() {
      self.show = !self.show;
    }, 2000);
    setTimeout(function() {
      self.$router.push("/accounting");
    }, 3000);
  },

  mounted: function() {},
  methods: {},
  computed: {}
  // watch: {
  //   login(val) {
  //     if (this.login) {
  //       this.$notification.connect();
  //     } else this.$notification.closeAll();

  //     if (this.login && this.$route.name == "FronterHomeName") {
  //       this.$router.push("/accounting");
  //     }
  //   }
  // }
};
</script>

<style scoped lang="scss">
.FH_logo {
  color: white;
  font-weight: 400;
}
.FH_page {
  margin: auto;
  left: 27.5vw;
  top: 10vh;
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
  top: 23%;
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
  transform: translateX(43%) translateY(70%);
}
.brand_des.sm {
  transform: translateX(55%) translateY(60%);
}
.slogan_des {
  transform: translateX(-41.5%) translateY(-20%);
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
  bottom: 37%;
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
