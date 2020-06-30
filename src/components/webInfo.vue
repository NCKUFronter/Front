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
        style="z-index:6;position:absolute;color:#ffffff;width:200px;left:10px;top:10px;"
        v-if="toggle1"
      >FRONTER</h1>
    </transition>
    <transition name="info_fade">
      <v-card
        :style="($vuetify.breakpoint.smAndUp)?'top:35%;left:40%;':'top:48%;left:22%;'"
        flat
        outlined
        style="z-index:6;background-color:#ffffff00;border:none;position:absolute;"
        v-if="toggle1"
      >
        <v-card-text
          :style="($vuetify.breakpoint.smAndUp)?'font-size:50px;':'font-size:25px;'"
          style="text-align:center;font-weight:bold;color:#ffffff;"
        >認識星記帳</v-card-text>
        <v-card-text
          :style="($vuetify.breakpoint.smAndUp)?'font-size:14px;':'font-size:12px;'"
          style="text-align:center;font-weight:bold;color:#ffffff;"
        >
          星記帳
          <br />是全新的記帳體驗
          <br />共享帳本、點數紅利、統計圖表
          <br />三位一體，實現劃時代的星記帳
        </v-card-text>
      </v-card>
    </transition>
    <transition name="info_fade">
      <v-img
        v-if="toggle0"
        class="infoImg"
        :style="($vuetify.breakpoint.smAndUp)?'width:70vw;left:13.5%;':'width:80vw;left:10%;top:25%;'"
        style="z-index:5;position:fixed;"
        src="../assets/knowFronter.svg"
      ></v-img>
    </transition>
    <v-card
      flat
      outlined
      style="z-index:6;background-color:#ffffff00;border:none;width:100%;height:100%;"
      @click="nextSlide1()"
      v-if="toggle1"
    ></v-card>
    <v-card
      flat
      outlined
      style="z-index:6;background-color:#ffffff00;border:none;width:100%;height:100%;"
      @click="nextSlide2()"
      v-if="toggle2"
    ></v-card>
    <transition name="info_fade">
      <v-card
        flat
        outlined
        :style="($vuetify.breakpoint.smAndUp)?'top:33.3%;left:18.4%;':'top:20%;left:7%;'"
        style="z-index:4;background-color:#ffffff00;border:none;position:absolute;"
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
        v-if="toggle2"
        flat
        class="infoImg"
        src="../assets/01.svg"
        :style="($vuetify.breakpoint.smAndUp)?'width:20vw;left: 12%; bottom: 40%;':'width:30vw; left: 4%; top:12%;'"
        style="z-index:2;position:absolute;"
      ></v-img>
    </transition>
    <transition name="info_fade">
      <v-img
        class="infoImg"
        v-if="toggle2"
        flat
        src="../assets/firstPlant.svg"
        :style="($vuetify.breakpoint.smAndUp)?'width:75vw;left: 48%; bottom: 12%;':'width:80vw; left: 45%; top:0%;'"
        style="z-index:2;position:fixed;"
      ></v-img>
    </transition>
    <v-card
      flat
      outlined
      style="z-index:5;background-color:#ffffff00;border:none;width:100%;height:100%;"
      @click="nextSlide3()"
      v-if="toggle3"
    ></v-card>

    <transition name="info_fade">
      <v-card
        flat
        outlined
        :style="($vuetify.breakpoint.smAndUp)?'bottom:30%;right:20%;':'top:27%;right:4%;'"
        style="z-index:6;background-color:#ffffff00;border:none;position:absolute;"
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
        v-if="toggle3"
        flat
        class="infoImg"
        src="../assets/02.svg"
        :style="($vuetify.breakpoint.smAndUp)?'width:20vw;right: 12%; bottom:30%;':'width:30vw;right: 4%; top:20%;'"
        style="z-index:2;position:absolute;"
      ></v-img>
    </transition>
    <transition name="info_fade">
      <v-img
        v-if="toggle3"
        flat
        class="infoImg"
        src="../assets/secondPlant.svg"
        :style="($vuetify.breakpoint.smAndUp)?'width:60vw;right: 50%; bottom: 20%;':'width:70%; right:40%; top:10%;'"
        style="z-index:2;position:absolute;"
      ></v-img>
    </transition>
    <v-card
      flat
      outlined
      style="position:absolute;z-index:6;background-color:#ffffff00;border:none;width:100%;height:100%;"
      @click="nextSlide4()"
      v-if="toggle4"
    ></v-card>
    <transition name="info_fade">
      <v-card
        flat
        outlined
        :style="($vuetify.breakpoint.smAndUp)?'top:33%;left:18%;':'top:16%;left:10%;'"
        style="z-index:4;background-color:#ffffff00;border:none;position:absolute;"
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
          :style="($vuetify.breakpoint.smAndUp)?'height:3px;':'height:2px;'"
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
        v-if="toggle4"
        class="infoImg"
        src="../assets/03.svg"
        :style="($vuetify.breakpoint.smAndUp)?'width:25vw;left: 12%; bottom: 40%;':'width:30vw; left: 15%; top:10%;'"
        style="z-index:2;position:absolute;"
      ></v-img>
    </transition>
    <transition name="info_fade">
      <v-img
        v-if="toggle4"
        class="infoImg"
        src="../assets/chart.png"
        :style="($vuetify.breakpoint.smAndUp)?'width:60vw;left: 50%; bottom: 2%;':'width:80vw; left: 34%; top:40%;'"
        style="z-index:4;position:fixed;"
      ></v-img>
    </transition>
    <transition name="info_fade">
      <v-card
        flat
        outlined
        :style="($vuetify.breakpoint.smAndUp)?'top:30%;left:32%;':'top:25%;left:16%;'"
        style="background-color:#ffffff00;border:none;position:absolute;"
        v-if="toggle5"
      >
        <v-card-text
          :style="($vuetify.breakpoint.smAndUp)?'font-size:50px;':'font-size:25px;'"
          style="text-align:center;font-weight:700;color:#ffffff;"
        >立即登入使用星記帳</v-card-text>
      </v-card>
    </transition>
    <transition name="info_fade">
      <v-btn
        v-on:click="doLogin('father@gmail.com')"
        v-if="toggle5"
        rounded
        color="#ffffff00"
        :style="($vuetify.breakpoint.smAndUp)?'left:47%;top: 50%;':'left: 43%;top: 35%;'"
        style="color:#ffffff;position:absolute;border: 2px solid #ffffff;"
      >登入</v-btn>
    </transition>
  </v-card>
</template>

<script>
import { ignoreNotLoginError } from "../utils";
let data = {
  toggle0: true,
  toggle1: false,
  toggle2: false,
  toggle3: false,
  toggle4: false,
  toggle5: false,
};
export default {
  name: "webInfoName",
  inject: ["$clear"],
  data() {
    return data;
  },
  mounted: function() {
    this.$clear.animeOver = false;
    this.toggle0 = true;
    this.toggle5 = false;
    let self = this;
    setTimeout(function() {
      self.toggle1 = true;
    }, 1000);
  },
  computed:{
    login() {
      return this.$api.user.login;
    },
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
      if(this.login == false){
      this.toggle4 = !this.toggle4;
      this.toggle5 = !this.toggle5;
      }
      else{
        this.$router.push('/accounting');
      }
    },
    doLogin(email) {
      this.$api
        .login(email, "0000")
        .then(() => {

          this.$alert.success("登入成功");
          this.$router.push("/");

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