<template>
  <transition name="fade">
    <v-show>
      <v-layout class="page">
        <img src="src\image\fronter\home\home_logo.svg" height="100%" class="img-background" />
      </v-layout>
    </v-show>
  </transition>
  <!-- <v-card class="mx-auto" v-if="login">
    <v-navigation-drawer
      v-model="drawer"
      hide-overlay
      :permanent="$vuetify.breakpoint.mdAndUp"
      :temporary="$vuetify.breakpoint.smAndDown"
      clipped
      app
      class="nav-drawer"
      style="top: 56px"
    >
      <v-list nav>
        <v-list-item
          class="side-menu"
          v-for="(item, index) in menu"
          :key="index"
          :class="{ 'menu-item': true, disabled: !item.link }"
        >
          <router-link :to="item.link">{{ item.title }}</router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-layout class="page">
      <img
        src="src\image\fronter\home\home_logo.svg"
        height="100%"
        class="img-background"
      />
    </v-layout>
  </v-card>-->
</template>

<script>
let data = {
  offset: true,
  menu: [
    { title: "帳目", link: "/accounting" },
    { title: "統記", link: "/summary" },
    { title: "類別", link: "/point" }
  ],
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
  computed: {}
};
</script>

<style lang="scss">
* {
  font-family: 微軟正黑體, Arial, Helvetica, sans-serif;
  background-color: #3d404e;
}
.page {
  margin: 0;
  padding: 0;
  height: 100%;
  /* width: 100vw; */
  overflow: hidden;
  position: relative;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
