<template>
  <div class="side-account">
    <div class="account-upper">
      <div class="date-wrap">
        <a class="material-icons arrow" v-on:click="getYearMonthDate(-1)">arrow_left</a>
        <div class="date">{{getYearMonthDate}}</div>
        <a class="material-icons arrow" v-on:click="getYearMonthDate(1)">arrow_right</a>
      </div>
      <div class="point">
        <h1 v-on:click="onclick">累積點數</h1>
        <!-- {{ hello }} -->
      </div>
      <div class="total">
        <div class="income">
          <h1>總收入</h1>
        </div>
        <div class="expenses">
          <h1>總支出</h1>
        </div>
      </div>
    </div>
    <div class="account-down">
      <div class="account-item" v-for="(item,index) in accountData" :key="index">
        <img src="https://fakeimg.pl/30x30/efca16" class="categroyIcon" alt="categoryicon" />
        <h1 class="category">{{item.category}}</h1>
        <h1 class="money">{{item.money}}</h1>
        <h1 class="accountName">{{item.account}}</h1>
      </div>
      <!-- <a v-on:click="modal = !modal" href="##additem###" class="material-icons">add_circle</a> -->
      <router-link :to="modallink" class="material-icons">add_circle</router-link>
    </div>
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
  ],

  // hello: "init",

  selected: "尚未選擇任何一項",

  selected_category: "",
  modalCategory: [
    { categoryItem: "食物" },
    { categoryItem: "交通" },
    { categoryItem: "治裝" },
    { categoryItem: "娛樂" }
  ],

  selected_accountCate: "",
  modalAccount: [
    { accountCate: "Main Account" },
    { accountCate: "Bank SinoPac" }
  ]
};

function f1() {
  // reset!
  return this.selected_category;
}

export default {
  name: "SideAccount",
  data() {
    return data;
  },
  // props: ['accountData'], //引入變數
  components: {},
  created() {
    //Vue開始生命週期
  },
  computed: {
    getYearMonthDate() {
      let t = new Date();
      return `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`;
    }
  },
  methods: {
    onCategoryChange: f1,

    onAccountChange: function() {
      // reset!
      return this.selected_accountCate;
    }
    // onclick() {
    //   // Vue.prototype.$http
    //   this.$http
    //     .get("http://ncku-courses.herokuapp.com/api/hello")
    //     .then(res => {
    //       this.hello = res.data; //更改hello的值
    //       console.log(res);
    //     });
    // }
  }
};
</script>

<style scoped>
.side-account {
  /* border-color: chartreuse;
    border-style: solid; */
  width: 90vw;
  height: 94vh;
}

.account-upper {
  height: 13vh;
  border-bottom: 3px #cccccc solid;
  display: flex;
  /* justify-content: center; */
  /* border-color: red;
    border-style: solid; */
}

.date-wrap {
  margin: auto;
  margin-left: 3%;
  align-items: center;
  display: flex;
}

.account-upper .material-icons {
  color: #cccccc;
  font-size: 48px;
  display: inline-flex;
}

.date {
  display: inline-flex;
  margin: 0 5%;
}

.arrow {
  cursor: pointer;
}

.account-upper h1 {
  font-size: 20px;
  font-weight: normal;
}

.point {
  margin: auto;
}

.total {
  margin: auto;
}

.account-down {
  height: 83vh;
}

.account-down .material-icons {
  color: #fe4e00;
  position: fixed;
  bottom: 20px;
  right: 30px;
  font-size: 48px;
  text-decoration: none;
  transition: all 0.5s;
}
.account-down .material-icons:hover {
  font-size: 80px;
  transition: all 0.5s;
}

.account-item {
  display: flex;
  border-bottom: 3px #ccc solid;
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