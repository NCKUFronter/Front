<template>
  <v-content>
    <v-container fluid style="width: 960px">
      <v-card flat>
        <v-card-title class="display-1">記帳管理</v-card-title>
        <v-tabs v-model="tab" grow>
          <v-tab v-for="item in items" :key="item.title" :to="item.link">{{ item.title }}</v-tab>
        </v-tabs>
        <router-view></router-view>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: "accounting",
  data() {
    return {
      tab: null,
      items: [
        { title: "帳目管理", link: "/accounting/SideAccount" },
        { title: "管理類別", link: "/accounting/Category" },
        { title: "管理帳本", link: "" }
      ]
    };
  }
};
</script>

<style scope lang="scss">
* {
  font-family: 微軟正黑體, Arial, Helvetica, sans-serif;
}
.side-account {
  /* border-color: chartreuse;
    border-style: solid; */
  width: 100vw;
  height: 94vh;
}
</style>