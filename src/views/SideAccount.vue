<template>
  <!-- <v-content style="padding:0;"> -->
  <v-container fluid style="padding:0;position:relative;">
    <v-card
      flat
      min-height="85vh"
      style="position:fixed;top:15%;right:0%;border-radius:0;"
      class="scroll"
    >
      <v-navigation-drawer
        v-model="participants"
        hide-overlay
        style="border-top-left-radius:4em;width:220px;z-index:3;min-height:85vh;background-color:#3D404E;"
        temporary
        right
        class="elevation-0"
      >
        <v-card-title class="pl-12" style="font-size:0.8em;font-weight:bold;margin-top:70px">其他成員</v-card-title>
        <v-list nav class="pa-0">
          <v-list-item
            v-for="(item, index) in engage_user.users"
            :key="index"
            active-class="active"
            class="pl-10 pt-2"
          >
            <v-avatar size="36">
              <img :src="item.photo" />
            </v-avatar>
            <v-list-item-title class="ml-4" v-text="item.name" style="font-weight:bold;"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>

    <v-card flat class="account-all" v-if="!this.GLOBAL.newRecordModal">
      <v-layout row>
        <v-flex xs12 sm9 md9 class="account-left">
          <v-card-title class="ma-0 pa-0">帳目一覽</v-card-title>
          <v-layout row class="account-upper" style="margin-bottom:1%">
            <v-flex xs6 sm6 md3 data-app class="pr-12">
              <v-select
                v-model="ledgerSelected"
                :items="ledgers"
                label="請選擇帳本"
                hide-details
                solo
                flat
                prepend-inner-icon="book"
                item-text="ledgerName"
                item-value="_id"
                full-width
                color="white"
                item-color="white"
              ></v-select>
            </v-flex>
            <v-flex xs6 sm6 md3 data-app class="pr-12">
              <v-select
                v-model="flowSelected"
                :items="flow"
                label="請選擇金流"
                hide-details
                solo
                flat
                prepend-inner-icon="mdi-cash-usd"
                full-width
                color="white"
                item-color="white"
              ></v-select>
            </v-flex>

            <v-flex xs12 sm12 md6 class="date-wrap" @blur="dataPickerModal = false">
              <!-- <i class="material-icons" v-on:click="getYearMonthDate(-1)">arrow_left</i> -->
              <v-card
                flat
                class="ma-auto"
                v-on:click="getYearMonthDate(-1)"
                style="position:relative;"
              >
                <div>{{ preDate }}</div>
                <div
                  style="position:absolute;top:0;height:100%;width:100%;background: linear-gradient(to right,rgba(38,40,45,1),rgba(38,40,45,0.85),transparent);"
                ></div>
              </v-card>

              <DateInputPicker
                v-model="userDate"
                color="primary"
                :left="107"
                transition="scroll-y-transition"
                class="ma-auto"
                @change="updateDate()"
              >
                <template v-slot:activator="{ on, value }">
                  <div class="date" v-on="on">{{ value }}</div>
                </template>
              </DateInputPicker>

              <v-card
                flat
                class="ma-auto"
                v-on:click="getYearMonthDate(1)"
                style="position:relative;"
              >
                <div>{{ nextDate }}</div>
                <div
                  style="position:absolute;top:0;height:100%;width:100%;background: linear-gradient(to left,rgba(38,40,45,1),rgba(38,40,45,0.85),transparent);"
                ></div>
              </v-card>
              <!-- <i class="material-icons" v-on:click="getYearMonthDate(1)">arrow_right</i> -->
            </v-flex>

            <!-- <div class="point">
            <h6>累積點數: {{totalPoints}}</h6>
          </div>
          <div class="total">
            <div class="income">
              <h6>總收入: {{totalIncome }}</h6>
            </div>
            <div class="expenses">
              <h6>總支出: {{totalExpense}}</h6>
            </div>
            </div>-->
          </v-layout>

          <div class="account-down">
            <RecordTable
              :accountData="records"
              :userDate="userDate"
              :ledgerSelected="ledgerSelected"
              :flowSelected="flowSelected"
              @delete="fetchRecords"
              @want-edit="editRecord"
            />

            <!-- 原本用v-on:click控制modal變數，顯示modal，現在改以不同view -->
            <!-- <a v-on:click="modal = !modal" href="##additem###" class="material-icons">add_circle</a> -->
            <!-- <v-dialog persistent v-model="modalOpen" width="unset"> -->
            <!-- </v-dialog> -->
          </div>
          <!-- <v-btn icon large @click="newRecord" class="add-record elevation-8">
            <v-icon large color="#3D404E">mdi-plus</v-icon>
          </v-btn>-->
        </v-flex>

        <v-flex xs12 sm3 md3 class="account-right">
          <!-- style="border:2px solid blue" -->
          <v-card flat class="ma-0 pa-0">
            <v-card-actions class="ma-0 pa-0">
              <v-spacer />
              <button
                @click.stop="participants = !participants"
                style="position:relative;background-color:transparent;z-index:4;height:fit-content;width:fit-content;margin-right:70px;"
              >
                <transition name="fade">
                  <img
                    v-if="!participants"
                    src="../assets/fronter/account/member_unclicked.svg"
                    height="20px"
                    style="position: absolute;"
                  />
                </transition>
                <transition name="fade">
                  <img
                    v-if="participants"
                    src="../assets/fronter/account/member_clicked.svg"
                    height="20px"
                    style="position: absolute;"
                  />
                </transition>
              </button>
            </v-card-actions>
          </v-card>
          <!-- <div class="chart">
          <pie-chart :data="piedata" label-position="center" :colors="piecolor"/>
        </div>
        <div class="chart">
          <pie-chart :data="piedata" label-position="center"/>
          </div>-->
          <v-card v-if="!participants" flat class="chart">
            <!-- style="border:2px solid red;" -->
            <v-card-title
              class="pa-0 mr-5"
              style="border-bottom:1px solid white;font-size:0.8em;font-weight:bold;margin-top:12.5vh; margin-left:4vw;"
            >當日小計</v-card-title>
            <div
              v-if="this.flowSelected != '支出'"
              class="income"
              style="height:28%;padding:0;margin:0"
            >
              <v-card-title
                class="pa-0"
                style="font-size:0.8em;margin-left:4vw;"
              >總收入 {{ totalIncome }}</v-card-title>
              <v-chart :options="income" />
              <!-- <v-avatar v-else size="80" style="border:1px solid white" class="ml-5"/> -->
            </div>
            <div
              flat
              v-if="this.flowSelected != '收入'"
              class="expense"
              style="height:28%;padding:0;margin:0"
            >
              <v-card-title
                class="pa-0"
                style="font-size:0.8em;margin-left:4vw;"
              >總支出 {{ totalExpense }}</v-card-title>
              <v-chart :options="expense" />
            </div>
            <div
              flat
              v-if="this.flowSelected != '收入'"
              class="point"
              style="height:28%;padding:0;margin:0"
            >
              <v-card-title
                class="pa-0"
                style="font-size:0.8em;margin-left:4vw;"
              >總點數 {{ totalPoints }}</v-card-title>
              <v-chart :options="point" />
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
    <div class="account-edit" v-if="this.GLOBAL.newRecordModal">
      <EditRecord
        @close="setRecordModal(false)"
        @add="fetchRecords"
        @update="fetchRecords"
        :userDate="userDate"
        :oldForm="this.GLOBAL.selectedRecord"
        :ledgerSelected="ledgerSelected"
      ></EditRecord>
    </div>
  </v-container>
  <!-- </v-content> -->

  <!-- </v-container> -->
</template>

<script>
import RecordTable from "../components/RecordTable.vue";
import EditRecord from "../components/EditRecord.vue";
import DateInputPicker from "../components/DateInputPicker.vue";
import { getLocaleDate } from "../utils";
import ECharts from "vue-echarts/components/ECharts";

let data = {
  // modalOpen: false,
  ledgerSelected: "1", //希望預設0=mainAccount
  flowSelected: "全部項目",
  // ledger: ["All", "Main Account", "Bank SinoPac"],
  flow: ["支出", "收入", "全部項目"],
  userDate: getLocaleDate(new Date()),
  preDate: getLocaleDate(new Date().setDate(new Date().getDate() - 1)),
  nextDate: getLocaleDate(new Date().setDate(new Date().getDate() + 1)),
  dataPickerModal: false,
  accountData: [],
  participants: false,
  //pie
  expenseData: [],
  totalExpense: 0,
  incomeData: [],
  totalIncome: 0,
  pointData: [],
  totalPoints: 0,
  income: {
    title: {},
    tooltip: {},
    legend: {
      show: false
    },
    series: [
      {
        name: "income",
        type: "pie",
        radius: "65%",
        color: "#d5ccb3",
        data: [],
        label: {
          show: false,
          position: "center"
        },
        labelLine: {
          show: false
        },
        itemStyle: {
          normal: {
            color: function(params) {
              if (params.data != null && params.data.color != undefined) {
                return params.data.color;
              } else {
                return params.color;
              }
            }
          }
        }
      }
    ]
  },
  expense: {
    title: {},
    tooltip: {},
    legend: {
      show: false
    },
    series: [
      {
        name: "expense",
        type: "pie",
        radius: "65%",
        data: [],
        label: {
          show: false,
          position: "center"
        },
        labelLine: {
          show: false
        },
        itemStyle: {
          normal: {
            color: function(params) {
              if (params.data != null && params.data.color != undefined) {
                return params.data.color;
              } else {
                return params.color;
              }
            }
          }
        }
      }
    ]
  },
  point: {
    title: {},
    tooltip: {},
    legend: {
      show: false
    },
    series: [
      {
        name: "point",
        type: "pie",
        radius: "65%",
        data: [],
        label: {
          show: false,
          position: "center"
        },
        labelLine: {
          show: false
        },
        itemStyle: {
          normal: {
            color: function(params) {
              if (params.data != null && params.data.color != undefined) {
                return params.data.color;
              } else {
                return params.color;
              }
            }
          }
        }
      }
    ]
  }
};

export default {
  name: "SideAccount",
  inject: ["$clear"],
  data() {
    return data;
  },
  // props: ['accountData'], //引入變數
  components: {
    DateInputPicker,
    EditRecord,
    RecordTable,
    "v-chart": ECharts
  },
  created() {
    this.$clear.animeOver = true;

    // console.log('hihi'+this.$route.query.userId)
    // if(this.$route.query.modal){
    //   this.modalOpen=this.$route.query.modal;
    // }
    //Vue開始生命週期
    // this.initialDate();
    // this.fetchRecords();
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
  watch: {
    ledgerSelected: function() {
      this.drawPie();
    },
    userDate: function() {
      this.drawPie();
    },
    flowSelected: function() {
      this.drawPie();
    },
    records: function() {
      this.drawPie();
    }
  },
  computed: {
    filterAccountData() {
      // return this.filterLedgerData.filter(item => {
      return this.records.filter(item => {
        return getLocaleDate(item.date) === this.userDate;
      });
    },
    user() {
      console.log(this.engage_user);
      return this.engage_user;
    }
    // totalIncome() {
    //   return this.records.reduce(
    //     (sum, cur) => (cur.recordType[0] == "i" ? sum + cur.money : sum),
    //     0
    //   );
    // },
    // totalExpense() {
    //   return this.records.reduce(
    //     (sum, cur) => (cur.recordType[0] == "e" ? sum + cur.money : sum),
    //     0
    //   );
    // },
    // totalPoints() {
    //   return this.records.reduce((sum, cur) => {
    //     if (cur.rewardPoints != null) return sum + cur.rewardPoints;
    //     else return sum;
    //   }, 0);
    // },
  },
  asyncComputed: {
    records: {
      get() {
        if (this.ledgerSelected == null || this.flowSelected == null) return [];
        if (this.flowSelected == "全部項目") {
          return this.$loading.insideLoading(
            this.$http
              .get(`/ledger/${this.ledgerSelected}/records`, {
                params: { _one: ["category", "user"] }
              })
              .then(res => res.data)
          );
        } else {
          // 1. callback
          // dosomething(..., functino(err, value) {})
          // 2. promise
          // dosomething(...).then(value => { return dosomthing2()}).catch(err => {}).catch().then()
          // 3. async/awit
          // try {
          //   const value = await dosomething(...);
          // catch(err) {
          // }
          //
          return this.$loading.insideLoading(
            this.$http
              .get(`/ledger/${this.ledgerSelected}/records`, {
                params: { _one: ["category", "user"] }
              })
              .then(res => {
                console.log(res.data);
                return this.flowSelected == "收入"
                  ? res.data.filter(item => item.recordType === "income")
                  : res.data.filter(item => item.recordType === "expense");
              })
          );
        }
      },
      default: [],
      watch: ["ledgerSelected", "flowSelected"]
    },
    engage_user: {
      get() {
        return this.$loading.insideLoading(
          this.$http
            .get(`/ledger/${this.ledgerSelected}`, {
              params: { _many: ["users"] }
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
    },
    userCategories: {
      get() {
        return this.$http.get("/user/categories").then(res => res.data);
      },
      default: []
    }
  },
  methods: {
    drawPie() {
      // console.log(this.filterAccountData);
      // console.log(this.userCategories);
      this.expenseData.length = 0;
      this.totalExpense = 0;
      this.incomeData.length = 0;
      this.totalIncome = 0;
      this.pointData.length = 0;
      this.totalPoints = 0;
      this.userCategories.forEach(element => {
        this.expenseData.push({
          name: element.name,
          value: 0,
          color: element.color
        });
        this.incomeData.push({
          name: element.name,
          value: 0,
          color: element.color
        });
        this.pointData.push({
          name: element.name,
          value: 0,
          color: element.color
        });
      });
      this.expenseData.push({
        name: "未知",
        value: 0,
        color: "#D5CCB3"
      });
      this.incomeData.push({
        name: "未知",
        value: 0,
        color: "#D5CCB3"
      });
      this.pointData.push({
        name: "未知",
        value: 0,
        color: "#D5CCB3"
      });

      // console.log(this.incomeData);

      //資料前處理，定義未知category
      this.filterAccountData.forEach(element => {
        if (!element.category) {
          // element=Object.assign({},element,{category:'未知'})
          element.category = Object.assign(
            {},
            {
              name: "未知",
              color: "#D5CCB3",
              icon: "mdi-tag-outline",
              _id: "-1"
            }
          );
        }
        // console.log(element);
      });

      //收入
      for (var i = 0; i < this.incomeData.length; i++) {
        this.filterAccountData
          .filter(item => item.recordType === "income")
          .filter(item => item.category.name === this.incomeData[i].name)
          .forEach(element => {
            this.incomeData[i].value += element.money;
            this.totalIncome += element.money;
          });
      }
      if (this.totalIncome != 0) this.income.series[0].data = this.incomeData;
      else
        this.income.series[0].data = [
          { name: "無資料", value: 0, color: "rgba(255,255,255,0.1)" }
        ];

      //支出與點數
      for (var e = 0; e < this.expenseData.length; e++) {
        this.filterAccountData
          .filter(item => item.recordType === "expense")
          .filter(item => item.category.name === this.expenseData[e].name)
          .forEach(element => {
            this.expenseData[e].value += element.money;
            this.totalExpense += element.money;
            this.pointData[e].value += element.rewardPoints;
            this.totalPoints += element.rewardPoints;
          });
      }
      if (this.totalExpense != 0)
        this.expense.series[0].data = this.expenseData;
      else
        this.expense.series[0].data = [
          { name: "無資料", value: 0, color: "rgba(255,255,255,0.1)" }
        ];

      if (this.totalPoints != 0) this.point.series[0].data = this.pointData;
      else
        this.point.series[0].data = [
          { name: "無資料", value: 0, color: "rgba(255,255,255,0.1)" }
        ];
    },
    fetchRecords() {
      this.$asyncComputed.records.update();
    },
    initialDate() {
      this.userDate = getLocaleDate(new Date());
    },
    updateDate() {
      // console.log('updateDate')
      this.preDate = getLocaleDate(
        new Date(this.userDate).setDate(new Date(this.userDate).getDate() - 1)
      );
      this.nextDate = getLocaleDate(
        new Date(this.userDate).setDate(new Date(this.userDate).getDate() + 1)
      );
    },
    getYearMonthDate(index) {
      if (index == 1 || index == -1) {
        let t = new Date(this.userDate);
        t.setDate(t.getDate() + index);
        this.userDate = getLocaleDate(t);
        this.updateDate();
      }
    },
    click() {
      this.dataPickerModal = false;
      console.log(this.dataPickerModal);
    },
    // newRecord() {
    //   this.selectedRecord = null;
    //   this.setRecordModal(true,null)
    //   this.modalOpen = true;
    // },
    editRecord(item) {
      // this.selectedRecord = item;
      this.setRecordModal(true, item);
      // this.modalOpen = true;
    }
  }
};
</script>

<style scoped lang="scss">
.chart {
  width: 70%;
  height: 85%;
}
.echarts {
  position: relative;
  top: -20px;
  width: 100%;
  margin: 0;
  padding: 0;
  height: 100%;
}

.theme--dark.v-card {
  background-color: transparent !important;
}

.v-btn:not(.v-btn--round).v-size--default {
  min-width: 15px;
}

.account-all {
  padding: 8% 0% 0% 2%;
  position: relative;
}

.account-upper {
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

.date-wrap {
  margin: auto;
  // width: 45%;
  align-items: center;
  display: flex;
  position: relative;
  .material-icons,
  .date {
    cursor: pointer;
  }

  input {
    text-align: center;
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
  // padding-bottom: 10%;
  position: relative;
}

.add-record {
  background-color: white;
  position: absolute;
  bottom: 5%;
  right: 3%;
  /*border-radius: #cccccc solid 2px 4;*/
}

.theme--dark.v-sheet {
  background-color: #26282d;
}
</style>
