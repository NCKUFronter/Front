<template>
  <v-content>
    <v-container fluid style="width: 960px">
      <v-card flat>
        <v-card-title>點數管理</v-card-title>
        <v-tabs v-model="tab">
          <v-tab v-for="item in items" :key="item.title" :to="item.link">{{ item.title }}</v-tab>
        </v-tabs>
        <router-view></router-view>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      items: [
        { title: "點數兌換", link: "" },
        { title: "點數贈送", link: "/point/delivery" },
        { title: "歷史紀錄", link: "/point/history" }
      ]
    };
  }
};
</script>

<style>
</style>