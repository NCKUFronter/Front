<template>
  <v-container flat>
    <!--v-card-title>點數管理</v-card-title-->
    <v-tabs v-model="tab" grow>
      <v-tab v-for="item in items" :key="item.title" :to="item.link">{{ item.title }}</v-tab>
    </v-tabs>
    <router-view></router-view>
  </v-container>
</template>

<script>
// import PointHistory from '../components/PointHistory.vue'
export default {
  data() {
    return {
      tab: null,
      items: [
        { title: "點數兌換", link: "/point" },
        { title: "點數贈送", link: "/point/delivery" },
        { title: "歷史紀錄", link: "/point/history" }
      ]
    };
  }
  // components:{
  //   PointHistory
  // }
};
</script>

<style>
</style>
