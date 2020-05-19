<template>
  <v-app>
    <!-- <v-app-bar class="mx-auto overflow-hidden" color="#efca16" elevate-on-scroll clipped-left app>
    </v-app-bar>-->
    <v-layout class="page">
      <v-img src="./image/home/p1/background_block.svg" class="background"></v-img>

      <div class="background-top" height="100%">
        <img src="./image/home/p1/left_block.svg" height="100%" class="left-block" />
        <div class="right-block">
          <img src="./image/home/p1/right_block.svg" height="100%" />
          <img src="./image/home/p1/bookkeeping.svg" height="100%" class="book-keeping" />
        </div>
      </div>

      <div class="content">
        <v-card-title class="ml-0 pl-0">
          親子互動與
          <br />教育的新體驗
        </v-card-title>
        <v-card-text class="ml-0 pl-0">透過社群記帳與遊戲，讓父母從小培養孩子的金錢觀</v-card-text>
        <v-btn outlined>開始使用</v-btn>
      </div>

      <img src="./image/home/p1/parents.svg" height="100%" class="parents" />

      <img
        src="./image/home/p1/rocket_with_kid.svg"
        height="100%"
        class="rocket"
        v-rellax="{ speed: 10 }"
      />
      <img src="./image/home/p1/planet.svg" height="100%" class="planet" v-rellax="{ speed: 10 }" />
    </v-layout>
    <v-layout class="page">
      <v-img src="./image/home/p1/background_block.svg" class="background"></v-img>
      <div class="feature-block">
        <img src="./image/home/p2/feature_block_1.svg" height="100%" />
        <img src="./image/home/p2/feature_block_2.svg" height="100%" />
        <img src="./image/home/p2/feature_block_1.svg" height="100%" />
        <img src="./image/home/p2/feature_block_2.svg" height="100%" />
      </div>
    </v-layout>
    <v-layout class="page">
      <v-img src="./image/home/p1/background_block.svg" class="background"></v-img>
      <img src="./image/home/p3/img_background.svg" height="115%" class="img-background" />
      <img src="./image/home/p3/text_background.svg" height="100%" class="text-background" />
      <img src="./image/home/p3/img.svg" height="88%" class="phone" />
    </v-layout>
    <v-layout class="page">
      <v-img src="./image/home/p1/background_block.svg" class="background"></v-img>
      <img src="./image/home/p4/img_background.svg" height="115%" class="img4-background" />
      <img src="./image/home/p4/text_background.svg" height="100%" class="text4-background" />
      <img src="./image/home/p4/img.svg" height="50%" class="ship" />
    </v-layout>
    <router-view></router-view>
  </v-app>
</template>
<script>
// import Parallax from "vue-parallaxy";
export default {
  name: "App",
  data() {},
  components: {
    // Parallax
  }
};
// var rellax = new VueRellax('.rellax', {
//     speed: -2,
//     center: false,
//     wrapper: null,
//     round: true,
//     vertical: true,
//     horizontal: false
//  });
</script>
<style scoped>
/* .container{
    margin: 0;
    padding: 0;
    height: 100%;
} */

.page {
  margin: 0;
  padding: 0;
  height: 100%;
  /* width: 100vw; */
  overflow: hidden;
  position: relative;
  /* background-color: springgreen; */
}

.left-block {
  position: absolute;
  left: 0;
}
.right-block {
  height: 100%;
  position: absolute;
  right: 0;
}
.rocket {
  position: absolute;
  top: 5%;
  right: 34%;
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
  right: 7.6%;
  top: -17.8%;
}

.content {
  position: absolute;
}

/* p2 */
.feature-block {
  margin-top: 12%;
  position: absolute;
  display: flex;
  width: 100%;
  height: 60%;
  justify-content: space-evenly;
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
</style>
