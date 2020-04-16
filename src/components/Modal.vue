<template>
  <div class="modal">
    <form class="modal-content">
      <div class="tabs">
        <div class="tab">
          <input
            type="radio"
            v-model="selected"
            value="我是單選按鈕 1"
            neme="css-tab"
            checked
            class="tab-switch"
            id="tab-income"
          />
          <label for="tab-income" class="tab-label">收入</label>
          <div class="tab-content">
            <div class="modal-money">
              <p>金額</p>
              <input type="text" name="money" />
            </div>
            <div class="modal-cate">
              <p>類別</p>
              <select v-model="selected_category" v-on:change="onCategoryChange">
                <option value>請選擇</option>
                <option
                  v-for="(item,index) in modalCategory"
                  :value="item.categoryItem"
                  :key="index"
                >{{ item.categoryItem }}</option>
              </select>
            </div>
            <div class="modal-account">
              <p>帳戶</p>
              <select v-model="selected_accountCate" v-on:change="onAccountChange">
                <option value>請選擇</option>
                <option
                  v-for="(item,index) in modalAccount"
                  :value="item.accountCate"
                  :key="index"
                >{{ item.accountCate }}</option>
              </select>
            </div>
            <div class="modal-button">
              <router-link :to="AccountLink">
                <button class="add">新增</button>
              </router-link>
              <router-link :to="AccountLink">
                <button class="cancel">取消</button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="tab">
          <input
            type="radio"
            v-model="selected"
            value="我是單選按鈕 2"
            neme="css-tab"
            checked
            class="tab-switch"
            id="tab-outcome"
          />
          <label for="tab-outcome" class="tab-label">支出</label>
          <div class="tab-content">
            <div class="modal-money">
              <p>金額</p>
              <input type="text" name="money" />
            </div>
            <div class="modal-cate">
              <p>類別</p>
              <select v-model="selected_category" v-on:change="onCategoryChange">
                <option value>請選擇</option>
                <option
                  v-for="(item,index) in modalCategory"
                  :value="item.categoryItem"
                  :key="index"
                >{{ item.categoryItem }}</option>
              </select>
            </div>
            <div class="modal-account">
              <p>帳戶</p>
              <select v-model="selected_accountCate" v-on:change="onAccountChange">
                <option value>請選擇</option>
                <option
                  v-for="(item,index) in modalAccount"
                  :value="item.accountCate"
                  :key="index"
                >{{ item.accountCate }}</option>
              </select>
            </div>
            <div class="modal-button">
              <router-link :to="AccountLink">
                <button class="add">新增</button>
              </router-link>
              <router-link :to="AccountLink">
                <button class="cancel">取消</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
let data = {
  AccountLink: "/Account",
  selected: "尚未選擇任何一項",

  //   modal: true,

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
  methods: {
    onCategoryChange: f1,

    onAccountChange: function() {
      // reset!
      return this.selected_accountCate;
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  height: 60vh;
  width: 75vw;
  top: 16.7vh;
  left: 20vw;
  background-color: white;
  font-size: 20px;
}

.modal-content {
  margin: 5% 5%;
  /* border-color: blue;
    border-style: solid; */
}

/* style of the tabs area start */
.tabs {
  position: relative;
  margin: 3rem;
  height: 20rem;
  min-width: 55vw;
}

.tab {
  float: left;
}

.tab-switch {
  display: none;
}

.tab-label {
  position: relative;
  display: block;
  line-height: 2.75em;
  height: 3em;
  padding: 0 1.618em;
  background: #efcb16cc;
  border-right: 0.125rem solid #b99e16;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
  top: 0;
  transition: all 0.25s;
}

.tab-label:hover {
  top: -0.25rem;
  transition: top 0.25s;
}

.tab-content {
  height: 13.1rem;
  min-width: 49.65vw;
  position: absolute;
  z-index: 1;
  top: 2.75em;
  left: 0;
  padding: 1.618rem;
  background: #eee;
  color: #2c3e50;
  border-bottom: 0.25rem solid #bdc3c7;
  opacity: 0;
  transition: all 0.5s;
}

.tab-switch:checked + .tab-label {
  background: #eee;
  color: #2c3e50;
  border-bottom: 0;
  border-right: 0.125rem solid #eee;
  transition: all 0.35s;
  z-index: 1;
  top: -0.0625rem;
}

.tab-switch:checked + label + .tab-content {
  z-index: 2;
  opacity: 1;
  transition: all 0.35s;
}
/* style of the tabs area  end */

/* .modal-money  */
.modal-money p {
  display: inline-block;
  margin: 1%;
}

.modal-money input {
  width: 23vw;
  display: inline-block;
}

/* .modal-cate */
.modal-cate p {
  display: inline-block;
  margin: 1%;
}

.modal-cate select {
  display: inline-block;
  width: 23vw;
}

/* .modal-account  */
.modal-account p {
  display: inline-flex;
  margin: 1%;
}
.modal-account select {
  display: inline-flex;
  width: 23vw;
}

/* modal-button */
.modal-button button {
  width: 10vw;
  height: 5vh;
  border-style: none;
  border-radius: 10px;
  margin: 1% 2.5%;
  font-size: 15px;
  font-family: "Noto Sans TC", "微軟正黑體", Arial, Helvetica, sans-serif;
}
.add {
  background-color: #efcb16cc;
  cursor: pointer;
}
.cancel {
  background-color: #cccccc;
  cursor: pointer;
}
</style>