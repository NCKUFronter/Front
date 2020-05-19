<template>
  <transition name="fade">
    <v-layout class="page" v-if="show" justify-center>
      <img src="../assets/fronter/home/home_logo.svg" class="translogo" width="45%" />
      <div class="name">FRONTER</div>
      <div class="slogan">A Brand-New Spending App</div>
    </v-layout>
  </transition>
</template>

<script>
let data = {
  offset: true,
  menu: [
    { title: "帳目", link: "/accounting" },
    { title: "統記", link: "/summary" },
    { title: "類別", link: "/point" }
  ],
  show: true,
  drawer: false,
  login: false
};

export default {
  name: "PersonalAccountName",

  data() {
    return data;
  },
  components: {},
  created() {},
  methods: {
    stopanima() {
      let counter = 0;
      if (counter < 3) {
        counter = counter + 1;
        console.log(counter);
      } else {
        self.show = !self.show;
      }
    },
    function() {
      var self = this;
      setInterval(function() {
        self.show = !self.show;
      }, 1000);
    }
  },
  computed: {}
};
</script>

<style scoped lang="scss">
.page {
  margin-top: 20vh;
  overflow: hidden;
  position: relative;
}
.translogo {
  z-index: 1;
}
.name {
  font-family: Calibri;
  left: 30%;
  color: #fff294;
  font-size: 500%;
  color: #fff294;
  background-color: #ffffff00;
  top: 20%;
  font-weight: bold;
  position: absolute;
  z-index: 2;
}
.slogan {
  color: #fff294;
  background-color: #ffffff00;
  font-size: 150%;
  position: absolute;
  right: 30%;
  bottom: 28%;
  z-index: 2;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s;
}
.fade-enter {
  transform: translateY(-25px);
  opacity: 0;
}
.fade-leave-to {
  transform: translateY(-25px);
  opacity: 0;
}
</style>
