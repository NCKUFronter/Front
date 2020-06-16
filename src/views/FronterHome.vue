<template style>
  <v-layout>
    <v-flex>
      <transition name="FH_fade">
        <img
          ref="element"
          v-show="vanish"
          id="maindiv"
          class="FH_page"
          src="../assets/fronter/home/home_logo.svg"
        />
      </transition>

      <!-- <v-flex v-if="vanish" class="FH_brand">FRONTER</v-flex> -->

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
  fullHeight: 0,
  fullWidth: 0
};

export default {
  name: "FronterHomeName",
  inject: ["$clear"],

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
    setTimeout(function() {
      self.show = !self.show;
    }, 2000);
    setTimeout(function() {
      self.$router.push("/accounting");
    }, 2500);
  },

  mounted: function() {
    this.$clear.animeOver = false;
    this.fullHeight = window.innerHeight;
    this.fullWidth = window.innerWidth;

    window.onresize = () => {
      this.fullHeight = window.innerHeight;
      this.fullWidth = window.innerWidth;
      var imgHeight = window.getComputedStyle(this.$refs.element).width;
      let root = document.documentElement;

      // main picture setting
      if (this.$vuetify.breakpoint.smAndDown) {
        root.style.setProperty("--img-width", this.fullWidth * 0.7 + "px");
      } else {
        root.style.setProperty("--img-width", this.fullWidth * 0.5 + "px");
      }

      if (this.$vuetify.breakpoint.smAndDown) {
        root.style.setProperty("--img-left", this.fullWidth * 0.15 + "px");
      } else {
        root.style.setProperty("--img-left", this.fullWidth * 0.22 + "px");
      }
      if (this.$vuetify.breakpoint.smAndDown) {
        root.style.setProperty("--img-height", this.fullHeight * 0.35 + "px");
      } else {
        root.style.setProperty("--img-height", this.fullHeight * 0.15 + "px");
      }

      // word setting

      root.style.setProperty("--slogan-top", imgHeight);
      root.style.setProperty("--slogan-right", this.fullWidth * 0.32 + "px");
      if (this.$vuetify.breakpoint.smAndDown) {
        root.style.setProperty("--slogan", this.fullHeight * 0.02 + "px");
      } else {
        root.style.setProperty("--slogan", this.fullHeight * 0.035 + "px");
      }

      // this.widthCenter = this.fullWidth * -0.09;
      // root.style.setProperty("--slogan-move", this.widthCenter + "px");
    };

    let root = document.documentElement;
    var imgHeight = window.getComputedStyle(this.$refs.element).width;

    //main picture setting
    if (this.$vuetify.breakpoint.smAndDown) {
      root.style.setProperty("--img-width", this.fullWidth * 0.7 + "px");
    } else {
      root.style.setProperty("--img-width", this.fullWidth * 0.5 + "px");
    }

    if (this.$vuetify.breakpoint.smAndDown) {
      root.style.setProperty("--img-left", this.fullWidth * 0.15 + "px");
    } else {
      root.style.setProperty("--img-left", this.fullWidth * 0.22 + "px");
    }
    if (this.$vuetify.breakpoint.smAndDown) {
      root.style.setProperty("--img-height", this.fullHeight * 0.35 + "px");
    } else {
      root.style.setProperty("--img-height", this.fullHeight * 0.15 + "px");
    }
    console.log(imgHeight);

    // word setting
    root.style.setProperty("--slogan-top", imgHeight);
    root.style.setProperty("--slogan-right", this.fullWidth * 0.32 + "px");
    if (this.$vuetify.breakpoint.smAndDown) {
      root.style.setProperty("--slogan", this.fullHeight * 0.02 + "px");
    } else {
      root.style.setProperty("--slogan", this.fullHeight * 0.035 + "px");
    }

    // this.widthCenter = this.fullWidth * -0.09;
    // root.style.setProperty("--slogan-move", this.widthCenter + "px");
  },
  computed: {}
};
</script>

<style scoped lang="scss">
img {
  width: var(--img-width);
  left: var(--img-left);
  top: var(--img-height);
}

.FH_logo {
  color: white;
  font-weight: 400;
}
.FH_page {
  margin: auto;
  overflow: hidden;
  position: absolute;
  z-index: 1;
}

.FH_brand {
  font-family: Calibri;
  left: 30%;
  font-size: 500%;
  top: 23%;

  color: #fff294;
  color: #fff294;
  background-color: #ffffff00;
  font-weight: bold;
  position: absolute;
  z-index: 2;
}
.FH_slogan {
  font-size: var(--slogan);
  right: var(--slogan-right);
  top: var(--slogan-top);
  color: #fff294;
  font-family: Calibri;
  background-color: #ffffff00;
  position: absolute;
  font-weight: bold;
  z-index: 2;
}
.brand_des {
  transform: translateX(10rem) translateY(5rem);
}
.brand_des.sm {
  transform: translateX(55%) translateY(60%);
}
.slogan_des {
  transform: translate(var(--slogan-move), 1rem);
}
.slogan_des.sm {
  transform: translateX(-35%, -110%);
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
  width: 17.3vw;
  left: 27.5%;
}

.FH_slogan_bar {
  right: 27.5%;
  width: 27.9vw;
}

.FH_fade-leave-active,
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
.FH_fade-leave-to {
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
  transition: all 0.8s;
  opacity: 0;
}
.slidedown-leave-active,
.slideup-leave-active,
.sloganmove-leave-active,
.brandmove-leave-active {
  transition: all 0.8s;
}
</style>
