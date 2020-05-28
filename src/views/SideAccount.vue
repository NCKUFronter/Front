<template>
  <!-- <v-container flat> -->
  
  <v-card flat  class="account-all " v-if="!modalOpen">
    <v-layout row>
      <v-flex xs12 sm9 md9 class="account-left">
        <v-card-title class="ma-0 pa-0">帳目一覽</v-card-title>
        <v-layout row class=" account-upper" style="margin-bottom:1%">
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
              prepend-inner-icon="book"
              item-text="ledgerName"
              item-value="_id"
              full-width
              color="white"
              item-color="white"
            ></v-select>
          </v-flex>

          <v-flex xs12 sm12 md6 class="date-wrap" @blur="dataPickerModal=false">
            <!-- <i class="material-icons" v-on:click="getYearMonthDate(-1)">arrow_left</i> -->
            <v-card flat class="ma-auto" v-on:click="getYearMonthDate(-1)"  style="position:relative;">
            <div>{{preDate}}</div>
            <div style="position:absolute;top:0;height:100%;width:100%;background: linear-gradient(to right,rgba(38,40,45,1),rgba(38,40,45,0.85),transparent);"></div>
            </v-card>

            <DateInputPicker
              v-model="userDate"
              color="primary"
              :left="107"
              transition="scroll-y-transition"
              class="ma-auto"
            >
              <template v-slot:activator="{ on, value }">
                <div class="date" v-on="on">{{ value }}</div>
              </template>
            </DateInputPicker>

            <v-card flat class="ma-auto" v-on:click="getYearMonthDate(1)"  style="position:relative;">
            <div>{{nextDate}}</div>
            <div style="position:absolute;top:0;height:100%;width:100%;background: linear-gradient(to left,rgba(38,40,45,1),rgba(38,40,45,0.85),transparent);"></div>
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
          </div> -->
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
        <v-btn icon large @click="newRecord" class="add-record elevation-8">
            <v-icon large color="#3D404E">mdi-plus</v-icon>
        </v-btn>
        
      </v-flex>

      <v-flex xs12 sm3 md3 class="account-right">
      </v-flex>


    </v-layout>
  </v-card>
    <div class="account-edit"  v-else>
      <EditRecord
          @close="modalOpen = false"
          @add="fetchRecords"
          @update="fetchRecords"
          :userDate="userDate"
          :oldForm="selectedRecord"
          :ledgerSelected="ledgerSelected"     
      ></EditRecord>
    </div>
  <!-- </v-container> -->
</template>

<script>
import RecordTable from "../components/RecordTable.vue";
import EditRecord from "../components/EditRecord.vue";
import DateInputPicker from "../components/DateInputPicker.vue";
import { getLocaleDate } from "../utils";

let data = {
  modalOpen: false,
  ledgerSelected: null,
  flowSelected: null,
  // ledger: ["All", "Main Account", "Bank SinoPac"],
  flow:['支出','收入','全部項目'],
  userDate: getLocaleDate(new Date()),
  preDate:getLocaleDate(new Date().setDate(new Date().getDate()-1)),
  nextDate:getLocaleDate(new Date().setDate(new Date().getDate()+1)),
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
    DateInputPicker,
    EditRecord,
    RecordTable
  },
  created() {
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
  computed: {
    totalIncome() {
      return this.records.reduce(
        (sum, cur) => (cur.recordType[0] == "i" ? sum + cur.money : sum),
        0
      );
    },
    totalExpense() {
      return this.records.reduce(
        (sum, cur) => (cur.recordType[0] == "e" ? sum + cur.money : sum),
        0
      );
    },
    totalPoints() {
      return this.records.reduce((sum, cur) => {
        if (cur.rewardPoints != null) return sum + cur.rewardPoints;
        else return sum;
      }, 0);
    }
  },
  asyncComputed: {
    records: {
      get() {
        if (this.ledgerSelected == null || this.flowSelected==null) return [];
        if (this.flowSelected=='全部項目'){
        return this.$loading.insideLoading(
          this.$http
            .get(`/ledger/${this.ledgerSelected}/records`, {
              params: { _one: ["category", "user"] }
            })
            .then(res => res.data)
        );
        }
      },
      default: [],
      watch: ["ledgerSelected","flowSelected"]
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
    },
    initialDate() {
      this.userDate = getLocaleDate(new Date());
    },
    getYearMonthDate(index) {
      if (index == 1 || index == -1) {
        let t = new Date(this.userDate);
        t.setDate(t.getDate() + index);
        this.userDate = getLocaleDate(t);
        this.preDate=getLocaleDate(new Date(this.userDate).setDate(new Date(this.userDate).getDate()-1));
        this.nextDate=getLocaleDate(new Date(this.userDate).setDate(new Date(this.userDate).getDate()+1));
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
  }
};
</script>

<style scoped lang="scss">


.account-all{
  
  padding: 5% 2% 5% 4%;
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

.theme--dark.v-sheet{
  background-color: #26282d;
}
</style>
