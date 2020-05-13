<template>
  <v-container fluid>
    <!--v-card-title class="display-1">記帳管理</v-card-title-->
    <v-tabs v-model="tab" grow>
      <v-tab v-for="item in items" :key="item.title" :to="item.link">{{ item.title }}</v-tab>
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
        { title: "帳目管理", link: "/accounting" },
        { title: "管理類別", link: "/accounting/Category" },
        { title: "管理帳本", link: "/accounting/Ledger" }
      ]
    };
  }
};
</script>

<style scope lang="scss">
.side-account {
  /* border-color: chartreuse;
    border-style: solid; */
  width: 100vw;
  height: 94vh;
}
</style>
