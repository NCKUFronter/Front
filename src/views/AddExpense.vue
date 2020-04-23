<template>
  <v-card class="modal mx-auto">
    <!-- <div class="modal-flow">
      <h1 class="expense">支出</h1>
      <router-link to="/addIncome" class="income">收入</router-link>
    </div> -->
    <v-tabs fixed-tabs background-color="efca16" dark>
      <router-link to="/addIncome" class="expense">
        <v-tab>收入</v-tab>
      </router-link>
      <h1 class="income"><v-tab>支出</v-tab></h1>
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
      <router-link to="/sideAccount" type="button" class="add"
        ><v-btn large class="add">新增</v-btn></router-link
      >
      <router-link to="/sideAccount" type="button" class="cancel"
        ><v-btn large class="cancel">取消</v-btn></router-link
      >
      <!-- <button  class="add">新增</button>
                <button  class="cancel">取消</button> -->
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

.modal-flow {
  display: flex;
  width: 83vw;
  height: fit-content;
  margin: 0 auto;
}

.expense {
  display: inline-flex;
  margin: 0 2%;
  font-size: 20px;
  font-weight: bolder;
  width: 46%;
  color: #efca16;
  border-bottom-style: solid;
  border-bottom-color: #efca16;
  padding: 0 20%;
}

.income:hover {
  /* color:#efca16;
    border-bottom-color: #efca16; */
  opacity: 50%;
}

.income {
  display: inline-flex;
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
