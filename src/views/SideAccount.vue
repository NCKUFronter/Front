<template>
  <div class="side-account">
    <div class="account-upper">
      <div data-app class="ledgerSelect">
        <v-container fluid>
          <v-select
            v-model="ledgerSelected"
            :items="ledger"
            menu-props="auto"
            label="Select"
            hide-details
            prepend-icon="book"
            single-line
            dense
            full-width
          ></v-select>
        </v-container>
      </div>

      <div class="date-wrap">
        <i class="material-icons" v-on:click="getYearMonthDate(-1)">arrow_left</i>
        <div class="date" v-on:click="dataPickerModal = !dataPickerModal">{{userDate}}</div>
        <v-date-picker
          v-if="dataPickerModal"
          class="dataPicker"
          v-model="userDate"
          color="#efca16"
          header-color="#efca16"
          v-on:click.native="dataPickerModal = !dataPickerModal"
          transition="scroll-y-transition"
        ></v-date-picker>
        <i class="material-icons" v-on:click="getYearMonthDate(1)">arrow_right</i>
      </div>

      <div class="point">
        <h6>累積點數</h6>
        <!-- {{ hello }} -->
      </div>
      <div class="total">
        <div class="income">
          <h6>總收入</h6>
        </div>
        <div class="expenses">
          <h6>總支出</h6>
        </div>
      </div>
    </div>

    <div class="account-down">
      <RecordTable
        :accountData="accountData"
        :userDate="userDate"
        :ledgerSelected="ledgerSelected"
        @delete="fetchRecords"
      />
      <!-- <div class="account-item" v-for="(item,index) in filterAccountData" :key="index">
                        <img src="https://fakeimg.pl/30x30/efca16" class="categroyIcon" alt="categoryicon">
                        <h1 class="category">{{item.category}}</h1>
                        <h1 class="money">{{item.money}}</h1>
                        <h1 class="accountName">{{item.account}}</h1>
      </div>-->

      <!-- 原本用v-on:click控制modal變數，顯示modal，現在改以不同view -->
      <!-- <a v-on:click="modal = !modal" href="##additem###" class="material-icons">add_circle</a> -->
      <button @click="modalOpen = true" class="material-icons">add_circle</button>
      <AddRecord
        v-if="modalOpen"
        @close="modalOpen = false"
        @add="fetchRecords"
        :recordDate="userDate"
      ></AddRecord>
    </div>

    <!--router-view></router-view-->
  </div>
</template>

<script>
import RecordTable from "../components/RecordTable.vue";
import AddRecord from "../components/AddRecord.vue";

let data = {
  modalOpen: false,
  ledgerSelected: "All",
  ledger: ["All", "Main Account", "Bank SinoPac"],

  userDate: "2020-04-20",
  accountData: [
    {
      _id: "1",
      recordId: 1,
      categoryId: "5ea06d246b04b818d4d3c79b",
      detail: "0421的收入",
      money: "187",
      ledger: "Main Account",
      recordType: "income",
      date: "2020-04-21"
    },
    {
      _id: "2",
      recordId: 2,
      categoryId: "5ea06d246b04b818d4d3c79c",
      detail: "0421的支出",
      money: "200",
      ledger: "Main Account",
      recordType: "expense",
      date: "2020-04-21"
    },
    {
      _id: "3",
      recordId: 3,
      categoryId: "5ea06d246b04b818d4d3c79e",
      detail: "0420的收入",
      money: "36",
      ledger: "Bank SinoPac",
      recordType: "income",
      date: "2020-04-20"
    },
    {
      _id: "4",
      recordId: 4,
      categoryId: "5ea06d246b04b818d4d3c79b",
      detail: "0419的收入",
      money: "187",
      ledger: "Main Account",
      recordType: "income",
      date: "2020-04-19"
    },
    {
      _id: "5",
      recordId: 5,
      categoryId: "5ea06d246b04b818d4d3c79c",
      detail: "0419的支出",
      money: "200",
      ledger: "Bank SinoPac",
      recordType: "expense",
      date: "2020-04-19"
    },
    {
      _id: "6",
      recordId: 6,
      categoryId: "5ea06d246b04b818d4d3c79e",
      detail: "0418的收入",
      money: "36",
      ledger: "Bank SinoPac",
      recordType: "income",
      date: "2020-04-18"
    }
  ],
  dataPickerModal: false

  //後端連接變數方法
  // hello: 'init',

  // modal: false,
};

export default {
  name: "SideAccount",
  data() {
    return data;
  },
  // props: ['accountData'], //引入變數
  components: {
    AddRecord,
    RecordTable
  },
  created() {
    //Vue開始生命週期

    this.initialDate();
    this.fetchRecords();
  },

  computed: {},
  methods: {
    fetchRecords() {
      this.$api
        .getAllRecords()
        .then(res => {
          this.accountData = res.data;
        })
        .catch(err => {
          console.log(err);
          alert("資料擷取失敗");
        });
    },
    initialDate() {
      let t = new Date();

      this.userDate = t.toISOString().substr(0, 10);
    },

    getYearMonthDate(index) {
      if (index == 1 || index == -1) {
        let t = new Date(this.userDate);
        t.setDate(t.getDate() + index);
        this.userDate = t.toISOString().substr(0, 10);
      }
    },

    click() {
      this.dataPickerModal = false;
      console.log(this.dataPickerModal);
    }

    // dataPicker(){
    //     this.dataPickerModal=true
    // }

    // onclick() {
    //     // Vue.prototype.$http
    //     this.$http.get('http://ncku-courses.herokuapp.com/api/hello').then((res) => {
    //     this.hello = res.data; //更改hello的值
    //     //res.data[0].name
    //     console.log(res)
    //     })
    // }
  }
};
</script>

<style scoped lang="scss">
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

  h6 {
    font-size: 20px;
    font-weight: normal;
  }

  .material-icons {
    color: #cccccc;
    font-size: 48px;
    display: inline-flex;
  }
}

.ledgerSelect {
  margin: auto;
  /* border: steelblue solid 2px; */
  padding: 0;
  width: 20%;
}

.date-wrap {
  margin: auto;
  width: 40%;
  margin-left: 3%;
  align-items: center;
  display: flex;
  position: relative;

  .material-icons,
  .date {
    cursor: pointer;
  }
}

.dataPicker {
  position: absolute;
  top: 10vh;
}

.date {
  display: inline-flex;
  margin: 0 5%;
  justify-content: center;
}

.point {
  margin: auto;
}

.total {
  margin: auto;

  h1 {
    font-size: 12px;
  }
}

.account-down {
  height: 83vh;

  .material-icons {
    color: #efca16;
    position: absolute;
    bottom: 20px;
    right: 30px;
    font-size: 48px;
    text-decoration: none;
  }
}

/* .account-item{
    display: flex;
    border-bottom: 1.5px black solid;
    height: 8vh;
    margin: 0 3%;
}

.account-item h1{
    font-weight: normal;
    font-size: 18px;
}

.account-item img{
    display: inline-block;
    margin:auto 15px;
    border-radius: 50%;
}

.category{
    margin: auto;
}

.money{
    margin: auto;
}

.accountName{
    margin: auto;
    width: 20%;
}
 */
</style>
