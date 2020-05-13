<template>
  <v-card flat>
    <div class="account-upper">
      <div data-app class="ledgerSelect">
        <v-select
          v-model="ledgerSelected"
          :items="ledgers"
          label="請選擇帳本"
          hide-details
          outlined
          prepend-inner-icon="book"
          item-text="name"
          item-value="_id"
          dense
          full-width
          color="#efca16"
          item-color="#efca16"
        ></v-select>
      </div>

      <div class="date-wrap">
        <i class="material-icons" v-on:click="getYearMonthDate(-1)">arrow_left</i>
        <div class="date" v-on:click="dataPickerModal = !dataPickerModal">{{ userDate }}</div>

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
        :accountData="records"
        :userDate="userDate"
        :ledgerSelected="ledgerSelected"
        @delete="fetchRecords"
        @want-edit="editRecord"
      />
      <!-- <div class="account-item" v-for="(item,index) in filterAccountData" :key="index">
                        <img src="https://fakeimg.pl/30x30/efca16" class="categroyIcon" alt="categoryicon">
                        <h1 class="category">{{item.category}}</h1>
                        <h1 class="money">{{item.money}}</h1>
                        <h1 class="accountName">{{item.account}}</h1>
      </div>-->

      <!-- 原本用v-on:click控制modal變數，顯示modal，現在改以不同view -->
      <!-- <a v-on:click="modal = !modal" href="##additem###" class="material-icons">add_circle</a> -->
      <v-btn
        icon
        large
        @click="newRecord"
        class="add-record elevation-8"
      >
        <v-icon large color="#fff">mdi-plus</v-icon>
      </v-btn>
      <v-dialog persistent v-model="modalOpen" width="unset">
        <EditRecord
          @close="modalOpen = false"
          @add="fetchRecords"
          :recordDate="userDate"
          :oldForm="selectedRecord"
        ></EditRecord>
      </v-dialog>
    </div>

    <!--router-view></router-view-->
  </v-card>
  <!-- </v-content> -->
</template>

<script>
import RecordTable from "../components/RecordTable.vue";
import EditRecord from "../components/EditRecord.vue";
import { getLocaleDate } from "../utils";

let data = {
  modalOpen: false,
  ledgerSelected: null,
  ledger: ["All", "Main Account", "Bank SinoPac"],
  userDate: "2020/04/20",
  accountData: [],
  dataPickerModal: false,
  selectedRecord: null
};
export default {
  name: "SideAccount",
  data() {
    return data;
  },
  // props: ['accountData'], //引入變數
  components: {
    EditRecord,
    RecordTable
  },
  created() {
    //Vue開始生命週期
    this.initialDate();
    this.fetchRecords();
    // login;
    // this.$http
    //   .post("/login-local", { email: "father@gmail.com", password: "0000" })
    //   .then(res => {
    //     console.log(res.data);
    //     return this.$http.get("/ledger/2");
    //   })
    //   .then(res => {
    //     console.log(res.data);
    //   });

    // this.$http.get("/user/ledgers".then(res => {
    // this.ledger = res.data;
    // }))
  },
  computed: {},
  asyncComputed: {
    records: {
      get() {
        if (this.ledgerSelected == null) return [];
        return this.$loading.insideLoading(
          this.$http
            .get(`/ledger/${this.ledgerSelected}/records`, {
              params: { _one: ["category"] }
            })
            .then(res => res.data)
        );
      },
      default: [],
      watch: ["ledgerSelected"]
    },
    ledgers: {
      get() {
        return this.$loading.insideLoading(
          this.$http.get(`/user/ledgers`).then(res => res.data)
        );
      },
      default: []
    }
  },
  methods: {
    fetchRecords() {
      this.$asyncComputed.records.update();
      /*
      this.$http.get("/user/ledgers").then(res => {
        res.data.forEach(element => {
          let ledgerId = element._id;
          this.$http
            .get("/ledger/" + ledgerId + "/records", {
              params: { _one: ["category", "ledger"] }
            })
            .then(res => {
              res.data.forEach(element => {
                let t = new Date(element.date);
                this.accountData.push({
                  index: element._id,
                  categoryId: element.category.name,
                  detail: element.detail,
                  money: element.money,
                  ledger: element.ledger.name,
                  userId: element.userId,
                  recordType: element.recordType,
                  date: t.toISOString().substr(0, 10),
                  rewardPoints: element.rewardPoints
                });
              });
              console.log(this.accountData);
            })
            .catch(err => {
              console.log(err);
              alert("資料擷取失敗");
            });
        });
      });
      */
    },
    initialDate() {
      this.userDate = getLocaleDate(new Date());
    },
    getYearMonthDate(index) {
      if (index == 1 || index == -1) {
        let t = new Date(this.userDate);
        t.setDate(t.getDate() + index);
        this.userDate = getLocaleDate(t);
      }
    },
    click() {
      this.dataPickerModal = false;
      console.log(this.dataPickerModal);
    },
    newRecord() {
      this.selectedRecord = null;
      this.modalOpen = true;
    },
    editRecord(item) {
      this.selectedRecord = item;
      this.modalOpen = true;
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
  width: 100vw;
  height: 94vh;
  border: none !important;
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
  .add-record {
    background-color: #fe4e00;
    position: absolute;
    bottom: 20px;
    right: 30px;
    position: fixed;
    /*border-radius: #cccccc solid 2px 4;*/
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
