<template>
  <v-container flat>
    <div class="sub-header account-upper">
      <div data-app class="ledgerSelect">
        <v-select
          v-model="ledgerSelected"
          :items="ledgers"
          label="請選擇帳本"
          hide-details
          outlined
          prepend-inner-icon="book"
          item-text="ledgerName"
          item-value="_id"
          dense
          full-width
          color="#efca16"
          item-color="#efca16"
        ></v-select>
      </div>

      <div class="date-wrap" @blur="dataPickerModal=false">
        <i class="material-icons" v-on:click="getYearMonthDate(-1)">arrow_left</i>

        <DateInputPicker
          v-model="userDate"
          color="primary"
          :left="107"
          transition="scroll-y-transition"
        >
          <template v-slot:activator="{ on, value }">
            <div class="date" v-on="on">{{ value }}</div>
          </template>
        </DateInputPicker>

        <i class="material-icons" v-on:click="getYearMonthDate(1)">arrow_right</i>
      </div>

      <div class="point">
        <h6>累積點數: {{totalPoints}}</h6>
      </div>
      <div class="total">
        <div class="income">
          <h6>總收入: {{totalIncome }}</h6>
        </div>
        <div class="expenses">
          <h6>總支出: {{totalExpense}}</h6>
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

      <!-- 原本用v-on:click控制modal變數，顯示modal，現在改以不同view -->
      <!-- <a v-on:click="modal = !modal" href="##additem###" class="material-icons">add_circle</a> -->
      <v-btn icon large @click="newRecord" class="add-record elevation-8">
        <v-icon large color="#fff">mdi-plus</v-icon>
      </v-btn>
      <v-dialog persistent v-model="modalOpen" width="unset">
        <EditRecord
          @close="modalOpen = false"
          @add="fetchRecords"
          @update="fetchRecords"
          :userDate="userDate"
          :oldForm="selectedRecord"
          :ledgerSelected="ledgerSelected"
        ></EditRecord>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import RecordTable from "../components/RecordTable.vue";
import EditRecord from "../components/EditRecord.vue";
import DateInputPicker from "../components/DateInputPicker.vue";
import { getLocaleDate } from "../utils";

let data = {
  modalOpen: false,
  ledgerSelected: null,
  // ledger: ["All", "Main Account", "Bank SinoPac"],
  userDate: getLocaleDate(new Date()),
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
        if (this.ledgerSelected == null) return [];
        return this.$loading.insideLoading(
          this.$http
            .get(`/ledger/${this.ledgerSelected}/records`, {
              params: { _one: ["category", "user"] }
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
  }
};
</script>

<style scoped lang="scss">
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
  padding-bottom: 10%;
  .add-record {
    background-color: #fe4e00;
    position: absolute;
    bottom: 20px;
    right: 30px;
    position: fixed;
    /*border-radius: #cccccc solid 2px 4;*/
  }
}
</style>
