<template>
  <v-app>
    <v-app-bar
      transition="slide-y-transition"
      color="#ffffff00"
      flat
      clipped
      fixed
      v-if="!login"
      style="z-index:8;width:100vw;"
    >
      <h1 :style="($vuetify.breakpoint.smAndUp)?'font-size:40px;':'font-size:24px;'">FRONTER</h1>
      <v-spacer />
      <v-menu offset-y v-if="clear.animeOver">
        <template v-slot:activator="{ on }">
          <v-btn
            width="fit-content"
            height="fit-content"
            v-on="on"
            color="transparent"
            class="elevation-0"
            :class="($vuetify.breakpoint.smAndUp)?'pa-5':'pa-2'"
            style="font-weight:bold"
            :style="($vuetify.breakpoint.smAndUp)?'font-size:18px;':'font-size:15px;'"
          >星．際帳</v-btn>
        </template>
        <v-card flat color="#dddee2" class="pa-2">
          <!-- <v-card-title class="justify-center">尚未登入</v-card-title> -->
          
          <v-btn block class="elevation-0" color="transparent" style="color:#26282D;font-weight:bold">
            <v-icon small>mdi-book-open-page-variant</v-icon>認識星際帳
          </v-btn>
          <v-btn block v-on:click="toLogin" class="elevation-0" color="transparent" style="color:#26282D;font-weight:bold">
            <v-icon small>mdi-google</v-icon>進入星際帳
          </v-btn>
          <v-btn block class="elevation-0" color="transparent" style="color:#26282D;font-weight:bold" v-on:click="doLogin('father@gmail.com') ">
            <v-icon>mdi-login-variant</v-icon>進入星際帳|爸
          </v-btn>
          <v-btn block class="elevation-0" color="transparent" style="color:#26282D;font-weight:bold" v-on:click="doLogin('mother@gmail.com')">
            <v-icon>mdi-login-variant</v-icon>進入星際帳|媽
          </v-btn>
          <v-btn block class="elevation-0" color="transparent" style="color:#26282D;font-weight:bold" v-on:click="doLogin('child@gmail.com')">
            <v-icon>mdi-login-variant</v-icon>進入星際帳|孩
          </v-btn>
        </v-card>
      </v-menu>
      <v-menu offset-y v-if="clear.animeOver">
        <template v-slot:activator="{ on }">
          <v-btn
            width="fit-content"
            height="fit-content"
            v-on="on"
            color="transparent"
            class="elevation-0"
            :class="($vuetify.breakpoint.smAndUp)?'pa-5':'pa-2'"
            style="font-weight:bold"
            :style="($vuetify.breakpoint.smAndUp)?'font-size:18px;':'font-size:15px;'"
          >宇宙．戰艦</v-btn>
        </template>
        <v-card flat color="#dddee2" class="pa-2">
          <!-- <v-card-title class="justify-center">尚未登入</v-card-title> -->
          <v-btn block class="elevation-0" color="transparent" style="color:#26282D;font-weight:bold">
            <v-icon small>mdi-airplane-takeoff</v-icon>登艦準備
          </v-btn>
          <v-btn block class="elevation-0" color="transparent" style="color:#26282D;font-weight:bold">
            <v-icon>mdi-account-tie</v-icon>成為艦長
          </v-btn>
          <v-btn block class="elevation-0" color="transparent" style="color:#26282D;font-weight:bold">
            <v-icon>mdi-airplane</v-icon>開始遨遊
          </v-btn>
        </v-card>
      </v-menu>

      <v-btn
        width="fit-content"
        height="fit-content"
        color="transparent"
        class="elevation-0"
        :class="($vuetify.breakpoint.smAndUp)?'pa-5':'pa-2'"
        style="font-weight:bold"
        :style="($vuetify.breakpoint.smAndUp)?'font-size:18px;':'font-size:15px;'"
      >關於我們</v-btn>
      <!-- <v-btn width="fit-content" height="fit-content" color="transparent" class="elevation-0 pa-1" :class="($vuetify.breakpoint.smAndUp)?'pa-5':'pa-2'" style="font-weight:bold" :style="($vuetify.breakpoint.smAndUp)?'font-size:25px;':'font-size:15px;'">聯絡我們</v-btn> -->
    </v-app-bar>
    <v-app-bar
      transition="slide-y-transition"
      :color="(login && this.$route.name != 'FronterHomeName') ? '#26282d' : '#ffffff00'"
      flat
      clipped
      fixed
      class="pa-2"
      v-else
    >
      <!-- <v-layout row style="height:100%"> -->
      <!-- <v-flex xs1 sm1 md1 v-if="clear.animeOver && $vuetify.breakpoint.smAndDown"> -->
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-if="login && clear.animeOver && $vuetify.breakpoint.smAndDown"
        class="px-4"
        style="height:100%"
      ></v-app-bar-nav-icon>
      <!-- </v-flex> -->
      <!-- <v-flex xs3 sm3 md3 v-if="login && clear.animeOver" class="pa-4"> -->
      <router-link to="/fronter_home">
        <h1 class="logo px-8" v-if="login && clear.animeOver">FRONTER</h1>
      </router-link>
      <!-- </v-flex> -->
      <!-- v-if="login && $vuetify.breakpoint.smAndDown" -->

      <!-- <v-app-bar transition="slide-y-transition" color="transparent" clipped-left flat app dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="login"></v-app-bar-nav-icon>

      <h1 class="logo d-flex align-center">
        <img src="./assets/Fronter.png" class="mt-2"/>
        <div v-if="login">星，際帳</div>
      </h1>-->
      <!-- <v-flex xs4 sm5 md5 v-if="login && clear.animeOver  && $vuetify.breakpoint.smAndUp" class="px-4"> -->
      <v-spacer />
      <v-form style="height:100%;width:45%" class="px-8">
        <v-text-field
          width="500px"
          background-color="#3d404e"
          color="#fff"
          dense
          prepend-inner-icon="mdi-magnify"
          label="Search here"
          filled
          shaped
          hide-details
          v-if="login && clear.animeOver  && $vuetify.breakpoint.smAndUp"
        ></v-text-field>
      </v-form>
      <!-- </v-flex> -->
      <!-- <v-col v-if="login && clear.animeOver" class="d-flex align-center justify-end">
      </v-col>-->
      <!-- <v-flex xs3 sm3 md3 v-if="login && clear.animeOver" class="pa-4 mr-auto" > -->
      <v-spacer />
      <v-spacer />
      <!-- bell notification -->
      <v-menu :close-on-content-click="true" offset-y v-if="login && clear.animeOver">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="ring"
            outlined
            style="border:none;width:100px;"
            fab
            max-height="40px"
            max-width="40px"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon class="px-1" v-if="login && clear.animeOver" size="30px">mdi-bell-outline</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in messageNotification" :key="index" @click="ring">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- user's name -->

      <v-card-title
        class="pa-0 pr-8"
        v-if="login && clear.animeOver && $vuetify.breakpoint.smAndUp"
        style="font-size:22px;font-weight:bold;"
      >{{ profile.name }}</v-card-title>

      <!-- </v-flex> -->
      <!-- <v-flex xs1 sm1 md1 class="pa-4" v-if="clear.animeOver"> -->

      <!-- peraonal account -->
      <v-menu offset-y v-if="clear.animeOver">
        <template v-slot:activator="{ on }">
          <v-btn width="fit-content" height="fit-content" v-on="on" fab>
            <v-img :src="profile.photo" style="width:30px;height:30px;border-radius:50%;"></v-img>
            <!-- <v-icon large color="white">mdi-account-circle</v-icon> -->
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
          <v-card-title class="pb-1 justify-center">{{ profile.name }}</v-card-title>
          <!--v-card-subtitle>{{profile._id}}</v-card-subtitle-->
          <v-card-text class="pb-0">{{ profile.email }}</v-card-text>
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
      <!-- </v-flex> -->
      <!-- </v-layout> -->
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      hide-overlay
      class="nav-drawer"
      style="top:15%;width:220px; border-top-right-radius: 4em; background-color:#3D404E"
      app
      width="200px"
      v-if="login && clear.animeOver"
      :permanent="$vuetify.breakpoint.mdAndUp"
      :temporary="$vuetify.breakpoint.smAndDown"
    >
      <v-btn
        to="/accounting"
        @click="setRecordModal(true, null)"
        class="elevation-0 mt-10 ml-8"
        style="font-weight:bold;width:65%;color:#3D404E;background-color:white;border-radius:2em;"
      >新增帳目</v-btn>
      <!-- @click="global_.newRecordModal=true" -->
      <!-- :permanent="$vuetify.breakpoint.mdAndUp"
      :temporary="$vuetify.breakpoint.smAndDown"-->
      <v-list-item-group mandatory>
        <v-list shaped nav class="pa-0">
          <v-list-group
            v-for="(item, index) in menuWithChild"
            :key="'menu_' + index"
            :class="{ 'menu-item': true, disabled: !item.link }"
            class="pl-0"
            @click="(item.title=='帳目'?($router.push(item.link) && setRecordModal(false)):$router.push(item.link))"
          >
            <!-- v-model="item.active" -->
            <template v-slot:activator>
              <v-list-item-content class="pl-8">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="(child, index) in item.child"
              :key="'menu_child_' + index"
              :class="{ 'menu-item': true, disabled: !child.link }"
              class="pl-10"
              :to="child.link"
              @click="(child.title=='帳目一覽'?setRecordModal(false):null)"
              active-class="active"
            >
              <v-list-item-title class="pl-8">{{ child.title }}</v-list-item-title>
            </v-list-item>
            <!-- <v-icon class="mr-2 pl-10">{{item.icon}}</v-icon> -->
          </v-list-group>

          <v-list-item
            v-for="(item, index) in menu"
            :key="'menu_item' + index"
            :class="{ 'menu-item': true, disabled: !item.link }"
            class="pl-10"
            :to="item.link"
            active-class="active"
          >{{ item.title }}</v-list-item>
        </v-list>
      </v-list-item-group>
    </v-navigation-drawer>

    <!-- for computer and tablet -->
    <v-content style="max-width:100vw;" v-if="$vuetify.breakpoint.smAndUp">
      <!-- id="scroll-target" class="overflow-y-auto"  -->
      <!-- <v-app-bar class="mx-auto overflow-hidden" color="#efca16" elevate-on-scroll clipped-left app>
      </v-app-bar>-->
      <v-container id="scroll-target" class="all pa-0" fluid v-if="!login" style="margin-top:50px">
        <!-- class="overflow-y-auto" -->
        <!-- <div
        v-scroll:#scroll-target="onScroll"
        align="center"
        class="all"
        >-->
        <v-layout class="page" style="margin-top: -48px; overflow: hidden;">
          <!-- <v-parallax  src="./assets/home/p1/bookkeeping2.png" style="width:100%;height:100%;padding:0" > -->
          <v-img src="./assets/home/p1/background_block.svg" class="background"></v-img>
          <img src="./assets/home/p1/middle_block.png" height="120%" class="planet" />
          <!-- <img src="./assets/home/p1/rocket.png" height="100%" class="rocket" > -->
          <img
            src="./assets/home/p1/bookkeeping2.png"
            height="120%"
            class="book-keeping"
            v-rellax="{ speed: -10 }"
          />
          <img src="./assets/home/p1/right_block_dark.svg" height="48.9%" class="right-block" />
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
        <v-layout>
          <transition name="fade">
            <img
              v-if="parents"
              src="./assets/home/p1/parents.svg"
              height="65%"
              class="parents"
              v-rellax="{ speed: -6 }"
            />
          </transition>
        </v-layout>
        <v-layout class="page">
          <v-img src="./assets/home/p2/background_block.svg" class="background"></v-img>
          <transition name="cardfade">
            <v-card-title v-if="cardShow" class="p2t1">宇宙級服務與特色</v-card-title>
          </transition>
          <transition name="cardfade">
            <div v-if="cardShow" class="feature-block">
              <div class="home-card pos1">
                <img src="./assets/home/p2/feature_block_1.svg" height="100%" />
                <img src="./assets/home/p2/1.svg" height="30%" class="p2Icon" />
                <v-card-text class="p2t2">社群記帳功能，讓父母與小孩共同記下生活中的每樣精采事物。</v-card-text>
              </div>
              <div class="home-card pos2">
                <img src="./assets/home/p2/feature_block_2.svg" height="100%" />
                <img src="./assets/home/p2/2.svg" height="30%" class="p2Icon" />
                <v-card-text class="p2t2">藉由交易紀錄，讓孩子學習審視自己的金錢流，培養金錢進與出的觀念。</v-card-text>
              </div>
              <div class="home-card pos1">
                <img src="./assets/home/p2/feature_block_1.svg" height="100%" />
                <img src="./assets/home/p2/3.svg" height="30%" class="p2Icon" />
                <v-card-text class="p2t2">在遊戲中使用回饋點數，讓孩子更加參與其中。</v-card-text>
              </div>
              <div class="home-card pos2">
                <img src="./assets/home/p2/feature_block_2.svg" height="100%" />
                <img src="./assets/home/p2/4.svg" height="30%" class="p2Icon" />
                <v-card-text class="p2t2">綁定永豐銀行信用卡，自動登入每筆消費金額，記帳輕鬆無負擔。</v-card-text>
              </div>
            </div>
          </transition>
        </v-layout>
        <v-layout class="page" style="background-color: #26282d;">
          <!-- <v-img src="./assets/home/p3/background_block.svg"  class="background"></v-img> -->
          <transition name="fade">
            <div class="account">
              <!-- v-if="account" -->
              <transition name="leftIn">
                <img
                  v-if="accountContent"
                  src="./assets/home/p3/img_background.svg"
                  height="115%"
                  class="img-background"
                />
              </transition>
              <transition name="rightIn">
                <img
                  v-if="accountContent"
                  src="./assets/home/p3/text_background.svg"
                  height="100%"
                  class="text-background"
                />
              </transition>
              <transition name="rightIn">
                <img
                  v-if="accountContent"
                  src="./assets/home/p3/img.svg"
                  height="88%"
                  class="phone"
                />
              </transition>
              <transition name="cardfade">
                <div v-if="accountContent" class="p3Text">
                  <h1 class="p3t1">星 · 際帳</h1>
                  <h1 class="p3t2">
                    在這裡，你可以體驗由永豐提供的智慧生活，記下日常
                    <br />消費的每筆帳目，並獲得回饋
                  </h1>
                  <button color="white" class="p3btn" outlined>創建帳戶</button>
                  <button color="white" class="p3btn" outlined>登入</button>
                </div>
              </transition>
              <transition name="cardfade">
                <div v-if="accountContent" class="p3bottom">
                  <button class="p3t3 p3b1" style="opacity:20%;">遊戲</button>
                  <!-- @click="account=false;accountContent=false;gameContent=true;" -->
                  <button class="p3t3 p3b2" style="opacity:80%;">帳戶</button>
                  <!-- @click="account=true;accountContent=true;gameContent=false;" -->
                </div>
              </transition>
            </div>
          </transition>
        </v-layout>
        <v-layout class="page" style="background-color: #26282d;">
          <transition name="fade">
            <div class="game">
              <transition name="rightIn">
                <img
                  v-if="gameContent"
                  src="./assets/home/p4/img_background.svg"
                  height="115%"
                  class="img4-background"
                />
              </transition>
              <transition name="leftIn">
                <img
                  v-if="gameContent"
                  src="./assets/home/p4/text_background.svg"
                  height="100%"
                  class="text4-background"
                />
              </transition>
              <transition name="leftIn">
                <img v-if="gameContent" src="./assets/home/p4/img.svg" height="50%" class="ship" />
              </transition>
              <transition name="cardfade">
                <div v-if="gameContent" class="p3Text">
                  <h1 class="p3t1">宇宙 · 戰艦</h1>
                  <h1 class="p3t2">在遊戲中使用回饋點數，讓孩子也能樂於記帳</h1>
                  <button color="white" class="p4btn" outlined>開啟你的星際探險</button>
                </div>
              </transition>
              <transition name="cardfade">
                <div v-if="gameContent" class="p3bottom">
                  <button class="p3t3 p3b1" style="opacity:80%;">遊戲</button>
                  <!-- @click="account=false;accountContent=false;gameContent=true;" -->
                  <button class="p3t3 p3b2" style="opacity:20%">帳戶</button>
                  <!-- @click="account=true;accountContent=true;gameContent=false;"  -->
                </div>
              </transition>
            </div>
          </transition>
        </v-layout>

        <v-layout class="footer">
          <v-flex xs4 sm4 md4 style="margin:auto;padding-left:8%;">
            <v-card-title
              class="pa-0 mb-8"
              style="font-weight:bold; font-size:16px"
            >UIDD-FRONTER x Bank SinoPac</v-card-title>
            <v-card-title
              class="pa-0 mb-4"
              style="font-weight:bold; font-size:16px; line-height:130%"
            >
              Copyright 2020,
              <br />National Cheng Kung University
            </v-card-title>
          </v-flex>
          <v-flex xs2.5 sm2.5 md2.5 style="margin:auto;padding-left:2%;">
            <v-card-title class="pa-0 mb-6" style="font-weight:bold;font-size:24px;">星際帳</v-card-title>

            <v-card-text
              v-for="(item, index) in footerAccount"
              :key="'footerAccount_' + index"
              :to="item.link"
              active-class="active"
              dense
              class="footerAccount ma-0 pa-0"
            >{{ item.title }}</v-card-text>
          </v-flex>
          <v-flex xs2.5 sm2.5 md2.5 style="margin:auto;">
            <v-card-title class="pa-0 mb-6" style="font-weight:bold;font-size:24px;">宇宙戰艦</v-card-title>
            <v-card-text
              v-for="(item, index) in footerGame"
              :key="'footerGame_' + index"
              :to="item.link"
              active-class="active"
              dense
              class="footerAccount ma-0 pa-0"
            >{{ item.title }}</v-card-text>
          </v-flex>
          <v-flex xs3 sm3 md3 class="text-center" style="margin:auto;border-left:3px white solid;">
            <v-card-text
              v-for="(item, index) in footerLink"
              :key="'footerLink_' + index"
              :to="item.link"
              active-class="active"
              dense
              class="footerLink"
            >{{ item.title }}</v-card-text>
          </v-flex>
        </v-layout>
        <!-- </div> -->
      </v-container>

      <div v-else>
        <!-- class="px-4" -->
        <router-view></router-view>
      </div>
      <!-- <div class="account-edit"  v-if="modalOpen">
        <EditRecord
            @close="modalOpen = false"
        ></EditRecord>
      </div>-->
    </v-content>

    <!-- for mobile -->
    <v-content id="scroll-target" style="max-width:100vw" v-else>
      <v-container class="pa-0" fluid v-if="!login" style="height:100vh;weight:50vw;">
        <!-- <v-card v-scroll:#scroll-target="onScroll"> -->

        <!-- <swiper class="swiper" :options="swiperOption"> -->
        <!-- mobile-page1 -->
        <!-- <swiper-slide> -->
        <v-card color="#26282D" flat style="width:50%;height:100vh;overflow:hidden;position:fixed;">
        <!-- <v-flex xs6 style="height:100%;background-color:#26282D;position:relative"> -->
            <img
              src="./assets/home-mobile/ledger.png"
              height="35%"
              style="position:absolute;right:0;top:10%"
            />
            <v-card-title
              class="pa-2"
              style="position:absolute;right:0;bottom:35%;color:#FFF294;font-weight:bold;line-height:1.1;font-size:2rem;text-align:right"
            >
              社群記帳×
              <br />RPG遊戲
            </v-card-title>
            <v-card-title
              class="pa-2"
              style="position:absolute;right:0;bottom:30%;color:white;font-weight:bold;line-height:1.2;font-size:0.8rem;text-align:right"
            >
              透過記帳與遊戲
              <br />讓父母從小培養孩子的金錢觀
            </v-card-title>
          <!-- </v-flex> -->
        </v-card>

        <swiper class="swiper" :options="swiperOption" style="height:100%">
        <swiper-slide style="height:100%">
        <v-layout row style="height:100vh;overflow:hidden;position:relative">
          <v-flex xs6 style="height:100%;background-color:transparent;position:relative"></v-flex>
          <v-flex xs6 style="height:100%;background-color:#3D404E;position:relative">
                <img
                  src="./assets/home-mobile/game.png"
                  height="50%"
                  style="position:absolute;left:0;bottom:10%"
                />
                <v-card-title
                  class="pa-2"
                  style="position:absolute;left:0;top:24%;color:#FFF294;font-weight:bold;line-height:1.1;font-size:2.4rem;text-align:left"
                >FRONTER</v-card-title>
                <v-card-title
                  class="pa-2"
                  style="position:absolute;left:0;top:30%;color:white;font-weight:bold;line-height:1.3;font-size:0.9rem;text-align:left"
                >
                  創造親子互動與教育
                  <br />的新體驗
                </v-card-title>
          </v-flex>
          <img src="./assets/home-mobile/star.png" height="100%" style="position:absolute;top:0;left:0" />
        </v-layout>
        </swiper-slide>
      

        <!-- mobile-page2 -->
        <swiper-slide style="height:100%">
        <v-layout row style="height:100%;overflow:hidden;position:relative">
          <v-flex xs6 style="height:100%;background-color:transparent;position:relative" >
            <!-- <img src="./assets/home-mobile/ledger.png" height="35%" style="position:absolute;right:0;top:10%" />
            <v-card-title class="pa-2" style="position:absolute;right:0;bottom:35%;color:#FFF294;font-weight:bold;line-height:1.1;font-size:2rem;text-align:right">社群記帳×<br/>RPG遊戲</v-card-title>
            <v-card-title class="pa-2" style="position:absolute;right:0;bottom:30%;color:white;font-weight:bold;line-height:1.2;font-size:0.8rem;text-align:right">透過記帳與遊戲<br/>讓父母從小培養孩子的金錢觀</v-card-title> -->
          </v-flex>
          <v-flex xs6 style="height:100%;background-color:#3D404E;position:relative;overflow-x:hidden" >
            <img src="./assets/home-mobile/fronter-1.png" height="50%" style="position:absolute;left:-85%;bottom:16%" />
            <v-card-title class="pa-2" style="position:absolute;left:0;top:24%;color:#FFF294;font-weight:bold;line-height:1.1;font-size:2.4rem;text-align:left">星．際帳</v-card-title>
            <v-card-title class="pa-2" style="position:absolute;left:0;top:31%;color:white;font-weight:bold;line-height:1.3;font-size:1rem;text-align:left">透過共享帳本<br/>讓家庭管理金流更方便</v-card-title>
          </v-flex>
          <img src="./assets/home-mobile/star.png" height="100%" style="position:absolute;top:0;left:0" />
          <v-btn class="py-1 px-8" color="#50989E" style="height:fit-content;font-size:0.8rem;font-weight:bold;border-radius:50px;position:absolute;bottom:8%;left:35%" >創建帳戶</v-btn>
        </v-layout>
        </swiper-slide>

        <!-- mobile-page3 -->
        <swiper-slide style="height:100%">
        <v-layout row style="height:100%;overflow:hidden;position:relative">
          <v-flex xs6 style="height:100%;background-color:transparent;position:relative" >
            <!-- <img src="./assets/home-mobile/ledger.png" height="35%" style="position:absolute;right:0;top:10%" />
            <v-card-title class="pa-2" style="position:absolute;right:0;bottom:35%;color:#FFF294;font-weight:bold;line-height:1.1;font-size:2rem;text-align:right">社群記帳×<br/>RPG遊戲</v-card-title>
            <v-card-title class="pa-2" style="position:absolute;right:0;bottom:30%;color:white;font-weight:bold;line-height:1.2;font-size:0.8rem;text-align:right">透過記帳與遊戲<br/>讓父母從小培養孩子的金錢觀</v-card-title> -->
          </v-flex>
          <v-flex xs6 style="height:100%;background-color:#3D404E;position:relative;overflow-x:hidden" >
            <img src="./assets/home-mobile/armada-2.png" height="50%" style="position:absolute;left:-85%;bottom:16%" />
            <v-card-title class="pa-2" style="position:absolute;left:0;top:25%;color:#FFF294;font-weight:bold;line-height:1.1;font-size:2.1rem;text-align:left">宇宙．戰艦</v-card-title>
            <v-card-title class="pa-2" style="position:absolute;left:0;top:31%;color:white;font-weight:bold;line-height:1.3;font-size:1rem;text-align:left">在遊戲中使用回饋點數<br/>讓孩子也能樂於記帳</v-card-title>
          </v-flex>
          <img src="./assets/home-mobile/star.png" height="100%" style="position:absolute;top:0;left:0" />
          <v-btn class="py-1 px-8" color="#DF764C" style="height:fit-content;font-size:0.8rem;font-weight:bold;border-radius:50px;position:absolute;bottom:8%;left:28%" >開啟你的星際探險</v-btn>
        </v-layout>
        </swiper-slide>
        

        <!-- mobile-page4 -->
        <swiper-slide style="height:100%">
        <v-layout row style="height:100%;overflow:hidden;position:relative">
          <v-flex xs6 style="height:100%;background-color:#26282D;position:relative">
            <div class="px-8" style="margin-top:100%">
              <img class="pa-2" src="./assets/home/p2/1.svg" width="50%" style="margin:auto;display:block;" />
              <v-card-text class="pa-2" style="font-size:0.9rem;">社群記帳功能，讓父母與小孩共同記下生活中的每樣精采事物。</v-card-text>
            </div>
            <div class="px-8" style="margin-top:10%">
              <img class="pa-2" src="./assets/home/p2/3.svg" width="50%" style="margin:auto;display:block;"/>
              <v-card-text class="pa-2" style="font-size:0.9rem;">在遊戲中使用回饋點數，讓孩子更加參與其中。</v-card-text>
            </div>
          </v-flex>
          <v-flex
            xs6
            style="height:100%;background-color:#3D404E;position:relative;overflow-x:hidden"
          >
            <div class="px-8" style="margin-top:100%">
              <img class="pa-2" src="./assets/home/p2/2.svg" width="50%" style="margin:auto;display:block;"/>
              <v-card-text class="pa-2" style="font-size:0.9rem;">藉由交易紀錄，讓孩子學習審視自己的金錢流，培養金錢進與出的觀念。</v-card-text>
            </div>
            <div class="px-8" style="margin-top:10%">
              <img class="pa-2" src="./assets/home/p2/4.svg" width="50%" style="margin:auto;display:block;"/>
              <v-card-text class="pa-2" style="font-size:0.9rem;">綁定永豐銀行信用卡，自動登入每筆消費金額，記帳輕鬆無負擔。</v-card-text>
            </div>
          </v-flex>
          <v-card
            class="pa-2"
            flat
            color="transparent"
            style="position:absolute;top:8%;left:19%;width:fit-content"
          >
            <v-card-title
              class="pa-0 justify-center"
              style="color:#FFF294;font-weight:bold;line-height:1.1;font-size:2.6rem;"
            >FRONTER</v-card-title>
            <v-card-title
              class="pa-0 justify-center"
              style="color:white;font-weight:bold;line-height:1.3;font-size:1.2rem;"
            >創造親子互動與教育的新體驗</v-card-title>
          </v-card>
          <v-btn class="py-1 px-8" color="#FFF294" style="height:fit-content;font-size:0.8rem;font-weight:bold;border-radius:50px;position:absolute;bottom:8%;left:35%;color:#26282D" >關於我們</v-btn>
          <!-- <img
            src="./assets/home-mobile/star.png"
            height="100%"
            style="position:absolute;top:0;left:0"
          /> -->
        </v-layout>
        </swiper-slide>
        <!-- </swiper> -->
        <!-- </v-card> -->
        </swiper>
      </v-container>

      <div v-else>
        <!-- class="px-4" -->
        <router-view></router-view>
      </div>
    </v-content>

    <!-- loading circle -->
    <v-dialog
      :value="loading"
      width="unset"
      persistent
      overlay-opacity="0.2"
      content-class="elevation-0 overflow-hidden"
    >
      <v-progress-circular :width="7" :size="70" indeterminate color="primary"></v-progress-circular>
    </v-dialog>

    <GlobalDialog
      :state="$confirm.state"
      prominent
      persistent
      outlined
      border="top"
      icon="mdi-help"
    ></GlobalDialog>
    <GlobalSnackBar dismissible top :state="$alert.state"></GlobalSnackBar>
    <GlobalSnackBar
      bottom
      dismissible
      border="left"
      text
      left
      :state="$notification.snackbar.state"
    >
      <template v-slot="{ state }">
        <v-avatar v-if="state.data">
          <img :src="state.data.photo" />
        </v-avatar>
        <span class="black--text">{{ state.message }}</span>
      </template>
    </GlobalSnackBar>
  </v-app>
</template>

<script>
// import EditRecord from "./components/EditRecord.vue";
import global_ from "./components/Global";
import GlobalSnackBar, { initSnackbarData } from "./components/GlobalSnackBar";
import GlobalDialog, { initDialogData } from "./components/GlobalDialog";
import { ignoreNotLoginError } from "./utils";
import { NotificationService } from "./plugins/NotificationService";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

// 定義component,不是global,只有APP知道
//import SideAccount from './components/SideAccount.vue'
// import SideMenu from './components/SideMenu.vue'
let data = {
  // modalOpen: false,
  offset: true,
  menuWithChild: [
    {
      child: [
        { icon: "mdi-chart-arc", title: "帳目一覽", link: "/accounting" },
        { icon: "mdi-chart-arc", title: "帳本管理", link: "/Ledger" },
        { icon: "mdi-chart-arc", title: "自訂類別", link: "/Category" }
      ],
      icon: "mdi-cash-multiple",
      title: "帳目",
      link: "/accounting",
      active: true
    },
    {
      child: [
        { icon: "mdi-cart-outline", title: "點數兌換", link: "/pointRedeem" },
        { icon: "mdi-gift-outline", title: "點數贈送", link: "/pointDelivery" },
        { icon: "mdi-history", title: "歷史紀錄", link: "/pointHistory" }
      ],
      icon: "mdi-alpha-p-circle",
      title: "點數",
      link: "/pointRedeem",
      active: true
    }
  ],
  menu: [
    { child: [], icon: "mdi-chart-arc", title: "統計", link: "/summary" },
    { child: [], icon: "", title: "認識星際帳", link: "" },
    { child: [], icon: "", title: "如何使用", link: "" }
  ],
  footerAccount: [
    { title: "認識星際帳", link: "" },
    { title: "如何使用", link: "" },
    { title: "記下你的第一筆精彩", link: "" }
  ],
  footerGame: [
    { title: "做好登艦準備", link: "" },
    { title: "如何成為一位優良艦長", link: "" },
    { title: "開始星際航行", link: "" }
  ],
  footerLink: [
    { title: "facebook", link: "" },
    { title: "instagram", link: "" },
    { title: "twitter", link: "" }
  ],
  messageNotification: [
    { title: "Click Me" },
    { title: "Click Me" },
    { title: "Click Me" },
    { title: "Click Me" }
  ],
  clear: { animeOver: true },

  bellRing: false,
  drawer: false,
  offsetTop: 0,
  cardShow: false,
  parents: true,
  account: true,
  accountContent: false,
  gameContent: false,
  swiperOption: {
    notNextTick: true,
    direction: "vertical",
    grabCursor: true,
    setWrapperSize: true,
    autoHeight: true,
    slidesPerView: 1,
    mousewheel: true,
    mousewheelControl: true,
    height: window.innerHeight,
    resistanceRatio: 0,
    observeParents: true
  }
};

export default {
  name: "App",
  data() {
    this.$alert = initSnackbarData();
    this.$notification = new NotificationService(
      initSnackbarData(),
      this.$api.raw.defaults.baseURL
    );
    this.$confirm = initDialogData();
    return data;
  },
  components: {
    GlobalSnackBar,
    GlobalDialog,
    Swiper,
    SwiperSlide
    // EditRecord,
    //SideAccount  // 定義component
    // SideMenu
  },
  provide() {
    return {
      $alert: this.$alert,
      $notification: this.$notification,
      $confirm: this.$confirm,
      $clear: this.clear
    };
  },
  created() {
    window.addEventListener("scroll", this.onScroll);
    this.$api.onNotLoginListener = () => {
      this.$alert.error("你登入過期，請重新登入。");
    };
    this.clear.animeOver = true;
  },
  computed: {
    login() {
      return this.$api.user.login;
    },
    profile() {
      return this.$api.user.profile;
    },
    loading() {
      return this.$loading.status.isRunning;
    }
  },
  watch: {
    login(val) {
      if (this.login) {
        // 加$表自己定義
        this.$notification.connect();
      } else this.$notification.closeAll();
      console.log(this.$route.name);
      if (this.login && this.$route.name == null) {
        this.$router.push("/fronter_home");
      }
    }
  },
  methods: {
    onScroll(e) {
      // console.log(e);
      var posY =
        (e.target.body || e.target.documentElement || e.target.body.parentNode)
          .scrollTop || e.currentTarget.pageYOffset;
      this.offsetTop = posY;
      if (this.offsetTop >= 1000) {
        // this.cardShow=false;
        this.parents = false;
      } else if (this.offsetTop >= 250) {
        this.cardShow = true;
        this.parents = true;
      } else {
        this.cardShow = false;
        this.parents = true;
      }

      if (this.offsetTop >= 950) {
        this.accountContent = true;
        // if(this.account){
        //   this.accountContent=true;
        // }else{
        //   this.gameContent=true;
        // }
      } else {
        this.accountContent = false;
        // this.gameContent=false;
      }

      if (this.offsetTop >= 1700) {
        this.gameContent = true;
        // if(this.account){
        //   this.accountContent=true;
        // }else{
        //   this.gameContent=true;
        // }
      } else {
        this.gameContent = false;
        // this.gameContent=false;
      }
    },
    childList(item) {
      this.$router.push(item.link);
    },
    toLogin() {
      // this.$api.login("father@gmail.com", "0000").catch(console.log);
      window.location = "/api/login/auth/google";
    },
    doLogin(email) {
      this.$api
        .login(email, "0000")
        .then(() => {
          this.$alert.success("登入成功");
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
    getPoints() {
      this.$http
        .post("/user/pointCheck")
        .then(res => {
          let message = "";
          if (res.data.perLogin)
            message += `獲得每日登入點數: ${res.data.perLogin}點\n`;
          if (res.data.continueLogin)
            message += `獲得連續登入點數: ${res.data.continueLogin}點\n`;
          if (message) {
            this.$api.updateProfile();
            this.$alert.info(message);
          } else this.$alert.info("沒有點數QQ");
        })
        .catch(ignoreNotLoginError)
        .catch(err => {
          console.log(err);
          this.$alert.error("領取失敗");
        });
    },
    ring() {
      console.log("ring");
      this.bellRing = !this.bellRing;
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
    this.$notification.closeAll();
  }
};
</script>

<style lang="scss">
// .theme--dark.v-app-bar.v-toolbar.v-sheet {
//   background-color: #26282d !important;
// }
html {
  margin: 0;
  padding: 0;
  // overflow: visible !important;
  scroll-behavior: smooth;
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
    opacity: 1;
    height: 35px;
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
  font-weight: bold;
  font-size: 1.1em;
  margin: 8% 12% 8% 0%;
  height: fit-content;
  width: auto;
  &.disabled {
    cursor: not-allowed;
    a {
      cursor: not-allowed;
    }
  }
}

.v-navigation-drawer__border {
  display: none;
}

.v-menu__content {
  button.v-btn {
    margin-top: 10px;
    margin-bottom: 5px;

    i {
      padding-right: 5px;
    }
  }
}

/* width */
::-webkit-scrollbar {
  // width: 10px;
  // padding: 0;
  // margin: 0;
  // background-color: transparent;
  display: none;
}

/* Handle */
// ::-webkit-scrollbar-thumb {
//   background: #888;
// }

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
  // overflow: hidden;
  position: relative;
  /* border: solid springgreen 2px; */
  /* background-color: springgreen; */
}

.footer {
  height: 30%;
  background-color: #26282d;
}

.footerAccount {
  display: block;
  line-height: 130%;
}

.footerLink {
  display: block;
  font-weight: bold;
  line-height: 250%;
  align-self: center;
}

.right-block {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2;
}

.book-keeping {
  position: absolute;
  right: -24.9%;
  z-index: 3;
}

.parents {
  position: absolute;
  z-index: 4;
  top: 65%;
  left: 12%;
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
.mobileP1rec {
  height: 5px;
  width: 40%;
  background: #fff294;
  position: relative;
  left: -7%;
  margin-bottom: 8%;
}
.p1Text {
  position: absolute;
  z-index: 7;
  top: 25%;
  left: 10%;
  font-family: Microsoft YaHei UI, 微軟正黑體, Arial, Helvetica, sans-serif;
}
.mobileP1Text {
  position: absolute;
  z-index: 7;
  top: 25%;
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
.mobileP1t1 {
  color: #fff294;
  font-weight: bold;
  font-size: 30px;
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
.mobileP1t2 {
  color: white;
  width: 75%;
  font-size: 12px;
  margin: 6% 0%;
  text-align: left;
  font-family: Microsoft YaHei UI, 微軟正黑體, Arial, Helvetica, sans-serif;
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

.mobileP1btn {
  border: solid white 1.5px;
  width: 40%;
  padding: 2%;
  border-radius: 15px;
  font-size: 14px;
  color: white;
  font-weight: bold;
  font-family: Microsoft YaHei UI, 微軟正黑體, Arial, Helvetica, sans-serif;
  align-items: flex-start;
}

.p1btn:hover {
  color: #fff294;
  border: solid #fff294 2px;
}

.mobileP1btn:hover {
  color: #fff294;
  border: solid #fff294 1.5px;
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
  margin-top: 18%;
  padding: 0% 0%;
  position: absolute;
  display: flex;
  width: 100%;
  height: 50%;
  justify-content: space-evenly;
  z-index: 5;
}

.p2Icon {
  position: absolute;
  top: 12%;
  left: 0;
  width: 100%;
  padding-right: 7%;
}

.v-card__text.p2t2 {
  position: absolute;
  top: 45%;
  width: 100%;
  height: 55%;
  color: white;
  font-size: 1.2rem;
  line-height: 140%;
  padding: 15%;
  // border: white 2px solid;
}

.home-card {
  position: relative;
  width: 14%;
  // border: white 2px solid;
}

// transition

.cardfade-enter-active,
.cardfade-leave-active {
  transition: all 3s ease;
}

.cardfade-enter {
  transform: translateY(20px);
  opacity: 0;
}

.cardfade-leave-to {
  transform: translateY(-20px);
  //leftIn
  .leftIn-enter-active,
  .leftIn-leave-active,
  .rightIn-enter-active,
  .rightIn-leave-active {
    transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
  }
}
.leftIn-enter,
.leftIn-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}

.rightIn-enter,
.rightIn-leave-t {
  transform: translateX(100px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* p3 */
.img-background {
  position: absolute;
  top: -16vh;
}
.text-background {
  position: absolute;
  right: 0;
}
.phone {
  position: absolute;
  left: 10%;
  top: 18%;
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
.mobileP3t2 {
  color: white;
  font-weight: bold;
  font-size: 14px;
  margin: 6% 0%;
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

.mobileP3btn {
  border-radius: 20px;
  padding: 1%;
  font-size: 14px;
  color: white;
  font-family: Microsoft YaHei UI, 微軟正黑體, Arial, Helvetica, sans-serif;
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
  top: -33.5%;
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

.v-text-field .v-input__control {
  color: #6d6b6b;
}
.v-text-field--filled.v-input--dense > .v-input__control > .v-input__slot {
  min-height: 10px;
}
.theme--dark.v-input,
.theme--dark.v-input input,
.theme--dark.v-input textarea {
  color: #6d6b6b;
}
.bellBtn:hover {
  cursor: pointer;
  background-color: #b3b2b2;
}
</style>
