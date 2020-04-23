<template>
  <v-card class="modal">
    <!-- <v-tabs v-model="tab" background-color="transparent" color="yellow" grow>
      <router-link to="/sideAccount/addExpense" class="expense"
        >支出</router-link
      >
      <h1 class="income">收入</h1>

    </v-tabs> -->
    <!-- 
    <v-card class="modal">
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card
          color="basil"
          flat
        >
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card> 
  -->
    <v-tabs fixed-tabs background-color="efca16" dark>
      <v-tab
        ><router-link to="/addExpense" class="expense">支出</router-link></v-tab
      >

      <v-tab><h1 class="income">收入</h1></v-tab>
    </v-tabs>
    <!-- <tabs>
                        <tab name="expense" :selected="true">
                            <h1>expense</h1>
                        </tab>
                        <tab name="income" :selected="true">
                            <h1>income</h1>
                        </tab>
                    </tabs> -->
    <form class="modal-content">
      <div class="modal-money">
        <p>金額</p>
        <input type="text" name="money" />
      </div>

      <div class="modal-cate">
        <p>類別</p>
        <select v-model="selected_category" v-on:change="onCategoryChange">
          <option value="">請選擇</option>
          <option
            v-for="(item, index) in modalCategory"
            :value="item.categoryItem"
            :key="index"
          >
            {{ item.categoryItem }}
          </option>
        </select>
      </div>

      <div class="modal-account">
        <p>帳戶</p>
        <select v-model="selected_accountCate" v-on:change="onAccountChange">
          <option value="">請選擇</option>
          <option
            v-for="(item, index) in modalAccount"
            :value="item.accountCate"
            :key="index"
          >
            {{ item.accountCate }}
          </option>
        </select>
      </div>

      <div class="modal-button">
        <router-link to="/sideAccount" type="button" class="add">
          新增
        </router-link>
        <router-link to="/sideAccount" type="button" class="cancel">
          取消
        </router-link>
        <!-- <button  class="add">新增</button>
                            <button  class="cancel">取消</button>  -->
      </div>
    </form>
    <router-view></router-view>
  </v-card>
</template>

<script>
let data = {
  selected_category: "",
  modalCategory: [
    { categoryItem: "食物" },
    { categoryItem: "交通" },
    { categoryItem: "治裝" },
    { categoryItem: "娛樂" },
  ],

  selected_accountCate: "",
  modalAccount: [
    { accountCate: "Main Account" },
    { accountCate: "Bank SinoPac" },
  ],

  editedIndex: -1,
  editedItem: {
    category: "",
    itemDetail: "",
    money: 0,
    account: 0,
    flow: 0,
    accDate: 0,
  },
  defaultItem: {
    category: "",
    itemDetail: "",
    money: 0,
    account: 0,
    flow: 0,
    accDate: 0,
  },
};

export default {
  name: "AddIncome",
  data() {
    return data;
  },
  computed: {},
  methods: {
    onCategoryChange: f1,

    onAccountChange: function() {
      // reset!
      return this.selected_accountCate;
    },
  },
};

function f1() {
  // reset!

  return this.selected_category;
}
</script>

<style scoped>
.modal {
  position: fixed;
  height: 60vh;
  width: 60vw;
  top: 16.5vh;
  left: 20vw;
  background-color: white;
  font-family: 微軟正黑體, Arial, Helvetica, sans-serif;
  font-size: 20px;
}

.modal-content {
  margin: 0 auto;
  width: 34vw;
}

/* .modal-flow {
  display: flex;
  width: 83vw;
  height: fit-content;
  margin: 0 auto;
} */

.expense {
  /* display: inline-flex; */
  margin: 0 2%;
  font-size: 20px;
  font-weight: normal;
  color: #cccccc;
  text-decoration: none;
  width: 46%;
  border-bottom-style: solid;
  border-bottom-color: #cccccc;
  padding: 0 20%;
}

.expense:hover {
  /* color:#efca16;
    border-bottom-color: #efca16; */
  opacity: 50%;
}

.income {
  /* display: inline-flex;  */
  margin: 0 2%;
  font-size: 20px;
  font-weight: bolder;
  width: 46%;
  color: #efca16;
  border-bottom-style: solid;
  border-bottom-color: #efca16;
  padding: 0 20%;
}

/* .modal-money  */
.modal-money p {
  display: inline-block;
  margin: 5%;
}

.modal-money input {
  width: 23vw;
  display: inline-block;
}

/* .modal-cate */
.modal-cate p {
  display: inline-block;
  margin: 5%;
}

.modal-cate select {
  display: inline-block;
  width: 23vw;
}

/* .modal-account  */
.modal-account p {
  display: inline-flex;
  margin: 5%;
}
.modal-account select {
  display: inline-flex;
  width: 23vw;
}

/* modal-button */
.add {
  margin: 5% 10%;
  font-size: 15px;
  text-decoration: none;
  color: black;
  border-style: none;
  border-radius: 10px;
  background-color: #efca16;
  font-family: 微軟正黑體, Arial, Helvetica, sans-serif;
}

.add:hover {
  opacity: 70%;
}

.cancel {
  width: 30vw;
  margin: 5% 10%;
  font-size: 15px;
  text-decoration: none;
  color: black;
  border-style: none;
  border-radius: 10px;
  background-color: #cccccc;
  font-family: 微軟正黑體, Arial, Helvetica, sans-serif;
}

.cancel:hover {
  opacity: 70%;
}
</style>
