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
  </v-layout>
</template>

<script>
let data = {
  show: 0,
  vanish: 1,
  fullHeight: 0,
  fullWidth: 0,
  dialog: 1
};

export default {
  name: "FronterHomeName",
  inject: ["$clear"],

  data() {
    return data;
  },
  components: {},
  created: function() {},

  mounted: function() {
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
    this.$clear.animeOver = false;
    this.fullHeight = window.innerHeight;
    this.fullWidth = window.innerWidth;

    let root = document.documentElement;
    // mobile
    if (this.$vuetify.breakpoint.smAndDown) {
      console.log(this.fullWidth);
      //main picture setting
      root.style.setProperty("--img-width", this.fullWidth * 0.9 + "px");
      root.style.setProperty("--img-left", this.fullWidth * 0.05 + "px");
      root.style.setProperty("--img-height", this.fullHeight * 0.3 + "px");
      // word setting
      root.style.setProperty("--slogan", this.fullWidth * 0.04 + "px");
      root.style.setProperty("--slogan-top", this.fullHeight * 0.55 + "px");
      root.style.setProperty("--slogan-left", this.fullWidth * 0.45 + "px");
      root.style.setProperty("--brand", this.fullWidth * 0.1 + "px");
      root.style.setProperty("--brand-left", this.fullWidth * 0.15 + "px");
      root.style.setProperty("--brand-top", this.fullHeight * 0.37 + "px");
      //bar setting
      root.style.setProperty("--bar-top", this.fullHeight * 0.5 + "px");
      root.style.setProperty("--bar-height", this.fullHeight * 0.005 + "px");
      root.style.setProperty("--bar-left-right", this.fullWidth * 0.1 + "px");
      root.style.setProperty("--leftbar", this.fullWidth * 0.35 + "px");
      root.style.setProperty("--rightbar", this.fullWidth * 0.46 + "px");
      // move setting
      root.style.setProperty("--slogan-moveX", this.fullWidth * -0.17 + "px");
      root.style.setProperty("--slogan-moveY", this.fullHeight * -0.03 + "px");
      root.style.setProperty("--brand-moveX", this.fullWidth * 0.17 + "px");
      root.style.setProperty("--brand-moveY", this.fullHeight * 0.05 + "px");
      // transition setting
      root.style.setProperty("--slide-down", this.fullHeight * -0.032 + "px");
      root.style.setProperty("--slide-Up", this.fullHeight * 0.08 + "px");
      root.style.setProperty("--scaleX", "0.6");
      root.style.setProperty("--scaleY", "0.5");
    }
    //tablet & laptop
    else {
      //main picture setting
      root.style.setProperty("--img-width", this.fullWidth * 0.5 + "px");
      root.style.setProperty("--img-left", this.fullWidth * 0.25 + "px");
      root.style.setProperty("--img-height", this.fullHeight * 0.1 + "px");
      // word setting
      root.style.setProperty("--slogan", this.fullHeight * 0.035 + "px");
      root.style.setProperty("--slogan-top", this.fullHeight * 0.65 + "px");
      root.style.setProperty("--slogan-left", this.fullWidth * 0.52 + "px");
      root.style.setProperty("--brand", this.fullHeight * 0.12 + "px");
      root.style.setProperty("--brand-left", this.fullWidth * 0.27 + "px");
      root.style.setProperty("--brand-top", this.fullHeight * 0.27 + "px");
      //bar setting
      root.style.setProperty("--bar-top", this.fullHeight * 0.58 + "px");
      root.style.setProperty("--bar-height", this.fullHeight * 0.008 + "px");
      root.style.setProperty("--bar-left-right", this.fullWidth * 0.27 + "px");
      root.style.setProperty("--leftbar", this.fullWidth * 0.2 + "px");
      root.style.setProperty("--rightbar", this.fullWidth * 0.265 + "px");
      // move setting
      root.style.setProperty("--slogan-moveX", this.fullWidth * -0.12 + "px");
      root.style.setProperty("--slogan-moveY", this.fullHeight * -0.03 + "px");
      root.style.setProperty("--brand-moveX", this.fullWidth * 0.12 + "px");
      root.style.setProperty("--brand-moveY", this.fullHeight * 0.09 + "px");
      // transition setting
      root.style.setProperty("--slide-down", this.fullHeight * -0.13 + "px");
      root.style.setProperty("--slide-Up", this.fullHeight * 0.13 + "px");
      root.style.setProperty("--scaleX", "0.6");
      root.style.setProperty("--scaleY", "0.5");
    }
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

.FH_page {
  margin: auto;
  overflow: hidden;
  position: absolute;
  z-index: 1;
}

.FH_brand {
  font-family: Calibri;
  left: var(--brand-left);
  font-size: var(--brand);
  top: var(--brand-top);

  color: #fff294;
  background-color: #ffffff00;
  font-weight: bold;
  position: absolute;
  z-index: 2;
}
.FH_slogan {
  font-size: var(--slogan);
  left: var(--slogan-left);
  top: var(--slogan-top);
  color: #fff294;
  font-family: Calibri;
  background-color: #ffffff00;
  position: absolute;
  font-weight: bold;
  z-index: 2;
}
.brand_des {
  transform: translate(var(--brand-moveX), var(--brand-moveY));
}
.slogan_des {
  transform: translate(var(--slogan-moveX), var(--slogan-moveY));
}

.FH_bar {
  position: absolute;
  background-color: #fff294;
  border-radius: 4px;
  top: var(--bar-top);
  z-index: 2;
  height: var(--bar-height);
}
.FH_fronter_bar {
  width: var(--leftbar);
  left: var(--bar-left-right);
}

.FH_slogan_bar {
  right: var(--bar-left-right);
  width: var(--rightbar);
}

.FH_fade-leave-active {
  transition: all 0.7s;
}
.slidedown-enter-active,
.slideup-enter-active,
.sloganmove-enter-active,
.brandmove-enter-active {
  transition: all 0.8s;
}

.FH_fade-leave-to {
  transform: translateY(-25px);
  opacity: 0;
}
.sloganmove-enter {
  transform: translateX(0) translateY(0);
}
.brandmove-enter {
  transform: translateX(0) translateY(0);
}

.slidedown-enter {
  transform: translateY(var(--slide-down));
}
.slideup-enter {
  transform-origin: center;
  transform: translate(var(--slide-Up), var(--slide-Up))
    scale(var(--scaleX), var(--scaleY));
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
