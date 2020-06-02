<template>
  <v-content style="padding:0;">
    <v-container fluid style="position: relative;">
      <v-card-title class="justify-center" style="margin:1%">帳目</v-card-title>

      <v-layout row style="padding: 0% 5% 0% 5%;">
        <v-flex xs12 sm2 md2 style="position: relative; ">
          <v-card max-width="160" min-width="160" flat>
            <!-- class="ml-auto " -->
            <v-list style="padding: 0;">
              <v-list-item-group v-model="item">
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  :to="item.link"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-flex>
        <v-flex xs12 sm10 md10 class="accounting-right">
          <router-view></router-view>
        </v-flex>
      </v-layout>
      <!-- <img class="background1" src="../assets/fronter/account/first_block1.png"/> -->

      <!-- <v-tabs v-model="tab" grow>
      <v-tab v-for="item in items" :key="item.title" :to="item.link">
        <v-icon dense class="pr-2">{{item.icon}}</v-icon>
        {{ item.title }}
      </v-tab>
    </v-tabs> -->
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: "accounting",
  inject: ["$clear"],
  data() {
    return {
      tab: null,
      items: [
        { icon: "mdi-cash-multiple", title: "帳目管理", link: "/accounting" },
        {
          icon: "mdi-shape-outline",
          title: "管理類別",
          link: "/accounting/Category",
        },
        {
          icon: "mdi-book-multiple-outline",
          title: "管理帳本",
          link: "/accounting/Ledger",
        },
      ],
    };
  },
};
</script>
<style scoped>
.accounting-right {
  background-color: #3d404e;
  border-radius: 50px;
  min-height: 72vh;
}
.theme--dark.v-sheet {
  background-color: transparent;
}

/* .background1{
  height:100vh;
  position: absolute;
  top: 0;
} */
</style>
