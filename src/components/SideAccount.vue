<template>
  <div class="side-account">
    <div class="account-upper">
      <div class="date-wrap">
        <i class="material-icons cursor-pointer" v-on:click="getYearMonthDate(-1)">arrow_left</i>
        <div class="date">{{getYearMonthDate}}</div>
        <i class="material-icons cursor-pointer" v-on:click="getYearMonthDate(1)">arrow_right</i>
      </div>
      <div class="point">
        <h1>累積點數</h1>
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
      <div class="account-item head">
        <img src="https://fakeimg.pl/30x30/efca16" class="categroyIcon" alt="categoryicon" />
        <h1 class="category">類別</h1>
        <h1 class="money">金額</h1>
        <h1 class="accountName">帳戶</h1>
      </div>
      <div class="account-item" v-for="(item,index) in accountData" :key="index">
        <img src="https://fakeimg.pl/30x30/efca16" class="categroyIcon" alt="categoryicon" />
        <h1 class="category">{{item.category}}</h1>
        <h1 class="money">{{item.money}}</h1>
        <h1 class="accountName">{{item.account}}</h1>
      </div>
      <i v-on:click="modal = !modal" class="material-icons cursor-pointer">add_circle</i>
    </div>

    <div v-if="modal" class="modal">
      <div class="modal-content">
        <div class="modal-flow">
          <!-- <input type="radio" id=income />支出
          <input type="radio"  id=expenses/>收入-->
          <input type="radio" v-model="form.recordType" value="income" />
          <label>收入</label>
          <input type="radio" v-model="form.recordType" value="expense" />
          <label>支出</label>
          <!-- <div>selected = ${ selected }</div> -->
        </div>

        <div class="modal-money">
          <p>金額</p>
          <input type="number" name="money" v-model="form.money" />
        </div>

        <div class="modal-cate">
          <p>類別</p>
          <select v-model="form.category" v-on:change="onCategoryChange">
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
          <select v-model="form.account" v-on:change="onAccountChange">
            <option value>請選擇</option>
            <option
              v-for="(item,index) in modalAccount"
              :value="item.accountCate"
              :key="index"
            >{{ item.accountCate }}</option>
          </select>
        </div>

        <div class="modal-button">
          <button v-on:click="createRecord" class="add">新增</button>
          <button v-on:click="modal = !modal" class="cancel">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let data = {
  accountData: [
    /*
    {
      src: "#",
      category: "收支項名",
      money: "金額",
      account: "帳戶",
      date: "2020-04-14"
    },
    { src: "#", category: "收支項名", money: "金額", account: "帳戶" },
    { src: "#", category: "收支項名", money: "金額", account: "帳戶" }
    */
  ],

  hello: "init",

  form: {
    category: "",
    account: "",
    recordType: "",
    money: 0
  },
  // selected: "尚未選擇任何一項",

  modal: false,

  // selected_category: "",
  modalCategory: [
    { categoryItem: "食物" },
    { categoryItem: "交通" },
    { categoryItem: "治裝" },
    { categoryItem: "娛樂" }
  ],

  // selected_accountCate: "",
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
    this.fetchRecords();
  },
  computed: {
    getYearMonthDate() {
      let t = new Date();
      return `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`;
    }
  },
  methods: {
    onCategoryChange: f1,
    resetForm() {
      this.form.accountCate = "";
      this.form.category = "";
      this.form.recordType = "";
      this.form.money = 0;
    },
    checkForm() {
      if (
        !this.form.account ||
        !this.form.category ||
        !this.form.recordType ||
        this.form.money < 0
      ) {
        alert("所有欄位請輸入正確資料");
        return false;
      }
      return true;
    },
    onAccountChange: function() {
      // reset!
      return this.selected_accountCate;
    },
    onclick() {
      // Vue.prototype.$http
      this.$http
        .get("http://ncku-courses.herokuapp.com/api/hello")
        .then(res => {
          this.hello = res.data; //更改hello的值
          console.log(res);
        });
    },
    fetchRecords() {
      this.$http
        .get("/record")
        .then(res => {
          this.accountData = res.data;
        })
        .catch(err => {
          console.log(err);
          alert("資料擷取失敗");
        });
    },
    createRecord() {
      if (!this.checkForm()) return;
      const body = Object.assign({}, this.form);

      this.$http
        .post("/record", body)
        .then(() => {
          this.fetchRecords();
          alert("新增成功");
          this.modal = false;
        })
        .catch(err => {
          alert("新增失敗");
          console.log(err);
        });
    }
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
  height: 10vh;
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

.account-item.head h1 {
  font-weight: bold;
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

/**/
/* modal */
/**/

.modal {
  position: fixed;
  height: 83vh;
  width: 83vw;
  top: 16.3vh;
  left: 16.9vw;
  background-color: #f0f0f0;
  font-size: 20px;
}

.modal-content {
  margin: 5% 5%;
  /* border-color: blue;
    border-style: solid;     */
}

.modal-flow {
  margin: 1%;
}

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
  cursor: pointer;
}
.add {
  background-color: #efca16;
}
.cancel {
  background-color: #cccccc;
}
</style>
