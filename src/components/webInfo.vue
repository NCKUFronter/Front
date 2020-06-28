<template>
  <v-card
    class="introPage"
    flat
    outlined
    style="z-index:5;width:100vw;height:100vh;background-color:#000019; border:none;border-radius:0px;"
  >
    <transition name="info_fade">
      <h1
        :style="($vuetify.breakpoint.smAndUp)?'font-size:40px;':'font-size:24px;'"
        style="z-index:5;position:absolute;color:#ffffff;width:200px;left:10px;top:10px;"
        @click="nextSlide1()"
        v-if="toggle1"
      >FRONTER</h1>
    </transition>
    <transition name="info_fade">
      <v-card
        :style="($vuetify.breakpoint.smAndUp)?'top:35%;left:37%;':'top:48%;left:5%;'"
        flat
        outlined
        style="z-index:2;background-color:#ffffff00;border:none;position:absolute;"
        @click="nextSlide1()"
        v-if="toggle1"
      >
        <v-card-text
          :style="($vuetify.breakpoint.smAndUp)?'font-size:50px;':'font-size:25px;'"
          style="text-align:center;font-weight:700;color:#ffffff;"
        >認識星記帳</v-card-text>
        <v-card-text
          :style="($vuetify.breakpoint.smAndUp)?'font-size:14px;':'font-size:12px;'"
          style="text-align:center;font-weight:normal;color:#ffffff;"
        >
          星記帳是全新的記帳體驗，
          <br />與你的家人共享帳本，
          <br />從現實的消費中積攢星記帳中的虛擬點數，
          <br />兌換點數將為您在《宇宙戰艦》中提升更好的遊戲體驗，
          <br />
        </v-card-text>
      </v-card>
    </transition>
    <transition name="info_fade">
      <v-img
        @click="nextSlide1()"
        v-if="toggle0"
        class="infoImg"
        :style="($vuetify.breakpoint.smAndUp)?'width:69vw;left:13.5%;':'width:80vw;left:10%;top:25%;'"
        style="z-index:1;"
        src="../assets/knowFronter.svg"
      ></v-img>
    </transition>

    <transition name="info_fade">
      <v-card
        flat
        outlined
        :style="($vuetify.breakpoint.smAndUp)?'top:33.3%;left:18.4%;':'top:15%;left:7%;'"
        style="z-index:4;background-color:#ffffff00;border:none;position:absolute;"
        @click="nextSlide2()"
        v-if="toggle2"
      >
        <br :style="($vuetify.breakpoint.smAndUp)?'':'display:none;'" />
        <v-card-text
          :style="($vuetify.breakpoint.smAndUp)?'font-size:40px;':'font-size:20px;'"
          style="text-align:left;font-weight:700;color:#ffffff;"
        >社群帳本</v-card-text>
        <br :style="($vuetify.breakpoint.smAndUp)?'':'display:none;'" />
        <hr
          style="background-color:#ffffff;border:none;"
          :style="($vuetify.breakpoint.smAndUp)?'height:3px;width:14vw;':'height:2px;width:35vw;'"
        />
        <br :style="($vuetify.breakpoint.smAndUp)?'':'display:none;'" />
        <v-card-text
          :style="($vuetify.breakpoint.smAndUp)?'font-size:20px;':'font-size:13px;'"
          style="text-align:left;font-weight:700;color:#ffffff;"
        >
          打破資產階級的高牆
          <br />
          <br />你的錢就是我的錢
          <br />
          <br />我的錢還是我的錢
          <br />
          <br />社會主義萬歲
          <br />
          <br />火箭隊萬歲
          <br />
          <br />搜難油
          <br />
          <br />哈哈哈哈哈哈哈哈哈
        </v-card-text>
      </v-card>
    </transition>
    <transition name="info_fade">
      <v-img
        @click="nextSlide4()"
        v-if="toggle2"
        flat
        class="infoImg"
        src="../assets/01.svg"
        :style="($vuetify.breakpoint.smAndUp)?'width:20vw;left: 12%; bottom: 40%;':'width:70vw; height:60vh; left: 15%; top:25%;'"
        style="z-index:2;position:absolute;"
      ></v-img>
    </transition>
    <transition name="info_fade">
      <v-img
        @click="nextSlide4()"
        v-if="toggle2"
        flat
        class="infoImg"
        src="../assets/firstPlant.svg"
        :style="($vuetify.breakpoint.smAndUp)?'width:75vw;left: 48%; bottom: 12%;':'width:70vw; height:60vh; left: 15%; top:25%;'"
        style="z-index:2;position:absolute;"
      ></v-img>
    </transition>
    <transition name="info_fade">
      <v-card
        flat
        outlined
        :style="($vuetify.breakpoint.smAndUp)?'bottom:30%;right:20%;':'top:15%;left:7%;'"
        style="z-index:4;background-color:#ffffff00;border:none;position:absolute;"
        @click="nextSlide3()"
        v-if="toggle3"
      >
        <br :style="($vuetify.breakpoint.smAndUp)?'':'display:none;'" />
        <v-card-text
          :style="($vuetify.breakpoint.smAndUp)?'font-size:40px;':'font-size:20px;'"
          style="text-align:left;font-weight:700;color:#ffffff;"
        >點數紅利</v-card-text>
        <br :style="($vuetify.breakpoint.smAndUp)?'':'display:none;'" />
        <hr
          style="background-color:#ffffff;border:none;"
          :style="($vuetify.breakpoint.smAndUp)?'height:3px;width:14vw;':'height:2px;width:35vw;'"
        />
        <br :style="($vuetify.breakpoint.smAndUp)?'':'display:none;'" />
        <v-card-text
          :style="($vuetify.breakpoint.smAndUp)?'font-size:20px;':'font-size:13px;'"
          style="text-align:left;font-weight:700;color:#ffffff;"
        >
          不會玩遊戲？
          <br />
          <br />三個字
          <br />
          <br />「你沒有童年」
        </v-card-text>
      </v-card>
    </transition>
    <transition name="info_fade">
      <v-img
        @click="nextSlide4()"
        v-if="toggle3"
        flat
        class="infoImg"
        src="../assets/02.svg"
        :style="($vuetify.breakpoint.smAndUp)?'width:20vw;right: 12%; bottom:30%;':'width:70vw; height:60vh; left: 15%; top:25%;'"
        style="z-index:2;position:absolute;"
      ></v-img>
    </transition>
    <transition name="info_fade">
      <v-img
        @click="nextSlide4()"
        v-if="toggle3"
        flat
        class="infoImg"
        src="../assets/secondPlant.svg"
        :style="($vuetify.breakpoint.smAndUp)?'width:60vw;right: 50%; bottom: 20%;':'width:70vw; height:60vh; left: 15%; top:25%;'"
        style="z-index:2;position:absolute;"
      ></v-img>
    </transition>
    <transition name="info_fade">
      <v-card
        flat
        outlined
        :style="($vuetify.breakpoint.smAndUp)?'top:33%;left:18%;':'top:15%;left:7%;'"
        style="z-index:4;background-color:#ffffff00;border:none;position:absolute;"
        @click="nextSlide4()"
        v-if="toggle4"
      >
        <br :style="($vuetify.breakpoint.smAndUp)?'':'display:none;'" />
        <v-card-text
          :style="($vuetify.breakpoint.smAndUp)?'font-size:40px;':'font-size:20px;'"
          style="text-align:left;font-weight:700;color:#ffffff;"
        >統計圖</v-card-text>
        <br :style="($vuetify.breakpoint.smAndUp)?'':'display:none;'" />
        <hr
          style="background-color:#ffffff;border:none;"
          :style="($vuetify.breakpoint.smAndUp)?'height:3px;':'height:2px;width:35vw;'"
        />
        <br :style="($vuetify.breakpoint.smAndUp)?'':'display:none;'" />
        <v-card-text
          :style="($vuetify.breakpoint.smAndUp)?'font-size:20px;':'font-size:13px;'"
          style="text-align:left;font-weight:700;color:#ffffff;"
        >
          宇宙中數不清的星宇塵埃
          <br />
          <br />如何才能細數出星河之間
          <br />
          <br />我們仍能相遇的可能性？
        </v-card-text>
      </v-card>
    </transition>
    <transition name="info_fade">
      <v-img
        @click="nextSlide4()"
        v-if="toggle4"
        flat
        class="infoImg"
        src="../assets/03.svg"
        :style="($vuetify.breakpoint.smAndUp)?'width:25vw;left: 12%; bottom: 40%;':'width:70vw; height:60vh; left: 15%; top:25%;'"
        style="z-index:2;position:absolute;"
      ></v-img>
    </transition>
    <transition name="info_fade">
      <v-img
        @click="nextSlide4()"
        v-if="toggle4"
        flat
        class="infoImg"
        src="../assets/chart.png"
        :style="($vuetify.breakpoint.smAndUp)?'width:60vw;left: 50%; bottom: 2%;':'width:70vw; height:60vh; left: 15%; top:25%;'"
        style="z-index:2;position:absolute;"
      ></v-img>
    </transition>
  </v-card>
</template>

<script>
let data = {
  toggle0: true,
  toggle1: false,
  toggle2: false,
  toggle3: false,
  toggle4: false
};
export default {
  name: "webInfoName",
  inject: ["$clear"],
  data() {
    return data;
  },
  mounted: function() {
    var self = this;
    self.$clear.animeOver = false;
    setTimeout(function() {
      self.toggle1 = true;
    }, 1000);
  },
  methods: {
    nextSlide1() {
      this.toggle0 = !this.toggle0;
      this.toggle1 = !this.toggle1;
      this.toggle2 = !this.toggle2;
    },
    nextSlide2() {
      this.toggle2 = !this.toggle2;
      this.toggle3 = !this.toggle3;
    },
    nextSlide3() {
      this.toggle3 = !this.toggle3;
      this.toggle4 = !this.toggle4;
    },
    nextSlide4() {
      if (this.toggle4) {
        this.toggle4 = !this.toggle4;
        this.$router.push("/accounting");
      } else if (this.toggle2) {
        this.nextSlide2();
      } else if (this.toggle3) {
        this.nextSlide3();
      }
    }
  }
};
</script>

<style>
.infoImg:hover {
  cursor: pointer;
}
.info_fade-enter-active {
  transition: all 0.8s;
}
.info_fade-leave-active {
  transition: all 0.4s;
}
.info_fade-leave-to {
  opacity: 0;
}
.picCard {
  z-index: 6;
  width: 1000px;
  height: 600px;
  left: 25%;
  top: 10%;
}
.loginBtn {
  left: 45%;
  top: 50%;
}
</style>