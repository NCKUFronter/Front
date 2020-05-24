<template>
  <v-layout>
    <v-flex>
      <transition name="fade">
        <img v-show="vanish" class="FH_page" src="../assets/fronter/home/home_logo.svg" width="45%" />
      </transition>

      <v-flex v-if="vanish" class="FH_brand">FRONTER</v-flex>

      <v-flex v-if="vanish" class="FH_slogan">A Brand-New Spending App</v-flex>

      <v-flex @click="toToggle">
        <transition name="brandmove">
          <v-flex v-if="show" class="FH_brand brand_des">FRONTER</v-flex>
        </transition>
        <transition name="sloganmove">
          <v-flex v-if="show" class="FH_slogan slogan_des">A Brand-New Spending App</v-flex>
        </transition>
        <transition name="slidedown">
          <v-flex v-show="show" class="FH_bar FH_fronter_bar"></v-flex>
        </transition>
        <transition name="slideup">
          <v-flex v-show="show" class="FH_bar FH_slogan_bar"></v-flex>
        </transition>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
let data = {
  offset: true,
  menu: [
    { title: "帳目", link: "/accounting" },
    { title: "統記", link: "/summary" },
    { title: "類別", link: "/point" }
  ],
  show: false,
  vanish: true,
  drawer: false,
  login: false
};

export default {
  name: "FronterHomeName",

  data() {
    return data;
  },
  components: {},
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
    }
  },
  computed: {}
};
</script>

<style scoped lang="scss">
.FH_page {
  left: 22.5vw;
  top: 20vh;
  overflow: hidden;
  position: absolute;
  z-index: 1;
}
.FH_brand {
  font-family: Calibri;
  left: 30%;
  color: #fff294;
  font-size: 500%;
  color: #fff294;
  background-color: #ffffff00;
  top: 30%;
  font-weight: bold;
  position: absolute;
  z-index: 2;
}
.brand_des {
  transform: translateX(30%) translateY(60%);
}
.slogan_des {
  transform: translateX(-38%) translateY(-110%);
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

.FH_fronter_bar {
  width: 17.3%;
  left: 27%;
}
.FH_slogan_bar {
  right: 28%;
  width: 358px;
}

.fade-leave-active,
.slidedown-enter-active,
.slideup-enter-active,
.sloganmove-enter-active,
.brandmove-enter-active {
  transition: all 0.8s;
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
