<template>
  <div class="account-down">
    <div class="account-item" v-for="(item,index) in accountData" :key="index">
      <img src="https://fakeimg.pl/30x30/efca16" class="categroyIcon" alt="categoryicon" />
      <h1 class="category">{{item.category}}</h1>
      <h1 class="money">{{item.money}}</h1>
      <h1 class="accountName">{{item.account}}</h1>
    </div>
    <!-- <a v-on:click="modal = !modal" href="##additem###" class="material-icons">add_circle</a> -->
    <router-link :to="modallink" class="material-icons">add_circle</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
let data = {
  modallink: "/Modal",
  accountData: [
    {
      src: "#",
      category: "收支項名",
      money: "金額",
      account: "帳戶",
      date: "2020-04-14"
    },
    { src: "#", category: "收支項名", money: "金額", account: "帳戶" },
    { src: "#", category: "收支項名", money: "金額", account: "帳戶" }
  ]
};

export default {
  name: "AccountDown",
  data() {
    return data;
  },
  // props: ['accountData'], //引入變數
  components: {},
  created() {
    //Vue開始生命週期
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
.account-down {
  height: 83vh;
}

.account-down .material-icons {
  color: #efca16;
  position: absolute;
  bottom: 20px;
  right: 30px;
  font-size: 48px;
  text-decoration: none;
}

.account-item {
  display: flex;
  border-bottom: 1.5px black solid;
  height: 8vh;
  margin: 0 3%;
}

.account-item h1 {
  font-weight: normal;
  font-size: 18px;
}

.account-item img {
  display: inline-block;
  margin: auto 15px;
  border-radius: 50%;
}

.category {
  margin: auto;
}

.money {
  margin: auto;
}

.accountName {
  margin: auto;
  width: 20%;
}
</style>