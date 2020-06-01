<template>
  <v-container fluid>
    <!--v-card-title>點數管理</v-card-title-->
    <v-tabs v-model="tab" grow>
      <v-tab v-for="item in items" :key="item.title" :to="item.link">
        <v-icon dense class="mr-2">{{item.icon}}</v-icon>
        {{ item.title }}
      </v-tab>
    </v-tabs>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  name: "point-manage",
  data() {
    return {
      tab: null,
      items: [
        { icon: "mdi-cart-outline", title: "點數兌換", link: "/point" },
        { icon: "mdi-gift-outline",title: "點數贈送",link: "/point/delivery"},
        { icon: "mdi-history", title: "歷史紀錄", link: "/point/history" }
      ]
    };
  }
};
</script>
