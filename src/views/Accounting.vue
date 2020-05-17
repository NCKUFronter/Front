<template>
  <v-container fluid>
    <!--v-card-title class="display-1">記帳管理</v-card-title-->
    <v-tabs v-model="tab" grow>
      <v-tab v-for="item in items" :key="item.title" :to="item.link">
        <v-icon dense class="pr-2">{{item.icon}}</v-icon>
        {{ item.title }}
      </v-tab>
    </v-tabs>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  name: "accounting",
  data() {
    return {
      tab: null,
      items: [
        { icon: "mdi-cash-multiple", title: "帳目管理", link: "/accounting" },
        {
          icon: "mdi-shape-outline",
          title: "管理類別",
          link: "/accounting/Category"
        },
        {
          icon: "mdi-book-multiple-outline",
          title: "管理帳本",
          link: "/accounting/Ledger"
        }
      ]
    };
  }
};
</script>
