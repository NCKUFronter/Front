<template>
  <div>
    <v-data-table :headers="headers" :items="filterAccountData" sort-by="money">
      <!-- recordType -->
      <template v-slot:item.recordType="{ item }">
        <!--v-chip :color="getColor(item.recordType)"-->
        <!-- <v-icon left>getIcon()</v-icon>-->
        <!-- <v-icon v-if="getIcon()==true">mdi-tray-minus</v-icon>
        <v-icon v-else>mdi-tray-plus</v-icon>-->
        <!--{{item.recordType}}-->
        <!--/v-chip-->
        <v-avatar size="36">
          <img :src="item.user.photo" />
        </v-avatar>

        <v-icon v-if="item.recordType[0]=='i'" color="green">mdi-cash-plus</v-icon>
        <v-icon v-else color="red">mdi-cash-minus</v-icon>
      </template>

      <!-- category -->
      <!--template v-slot:item.category="{ item }">
        <div>{{ (item.category) ? item.category.name : '未知' }}</div>
      </template-->

      <!-- hashtags -->
      <template v-slot:item.hashtags="{ item }">
        <v-chip label small v-for="tag in item.hashtags" :key="tag" class="mx-1">{{ tag }}</v-chip>
      </template>

      <!-- detail -->
      <!-- template v-slot:item.detail="{ item }">
        <div>{{ item.detail }}</div>
      </template-->

      <!-- money -->
      <template v-slot:item.money="{ item }">
        <div>{{ item.money }}</div>
      </template>

      <!-- ledger -->
      <!--template v-slot:item.ledger="{ item }">
        <div>{{ item.ledger }}</div>
      </template-->

      <template v-slot:item.actions="{ item }">
        <!-- <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon> -->
        <div v-if="item.userId === $api.user.profile._id">
          <v-icon small @click="$emit('want-edit',item)" class="mr-1">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { getLocaleDate } from "../utils";
import { ignoreNotLoginError } from "../utils";

export default {
  inject: ["$alert", "$confirm"],
  data() {
    return {
      dialog: false,
      snack: false,
      // flowIcon: true,
      snackColor: "",
      snackText: "",
      max25chars: v => v.length <= 25 || "Input too long!",
      pagination: {},
      headers: [
        {
          text: "", //"現金流",
          value: "recordType"
        },
        {
          text: "類別",
          align: "start",
          value: "category.name"
        },
        {
          text: "標籤",
          align: "center",
          value: "hashtags"
        },
        {
          text: "金額",
          align: "end",
          value: "money"
        },
        /*
        {
          text: "帳本",
          value: "ledger"
        },
        */
        {
          text: "點數",
          value: "rewardPoints",
          align: "end"
        },
        {
          text: "備註",
          align: "center",
          value: "from",
          sortable: false
        },
        {
          text: "操作",
          value: "actions",
          align: "center",
          sortable: false
        }
      ],
      modalAccount: [
        { accountCate: "Main Account" },
        { accountCate: "Bank SinoPac" }
      ],
      modalCategory: [],
      modalFlow: ["income", "expense"]
    };
  },
  props: ["userDate", "ledgerSelected", "accountData"],
  created() {},
  computed: {
    filterAccountData() {
      // return this.filterLedgerData.filter(item => {
      return this.accountData.filter(item => {
        return getLocaleDate(item.date) === this.userDate;
      });
    },
    filterLedgerData() {
      if (this.ledgerSelected != "All") {
        return this.accountData.filter(item => {
          return item.ledger === this.ledgerSelected;
        });
      } else {
        return this.accountData;
      }
    }
  },
  methods: {
    getColor(recordType) {
      if (recordType == "income") return "red";
      else return "yellow";
    },
    deleteItem(item) {
      this.$emit("delete", item);
      /*
      const index = this.accountData.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.accountData.splice(index, 1);
        */
      // if (confirm("Are you sure you want to delete this item?")) { }
      this.$confirm.open("確認刪除此帳目?", () => {
        this.$api
          .deleteRecord(item._id)
          .then(() => {
            this.$alert.success("帳目刪除成功");
            this.$emit("delete", item);
          })
          .catch(ignoreNotLoginError)
          .catch(err => {
            this.$alert.success("帳目刪除失敗");
            console.log(err);
          });
      });
    }
  }
};
</script>

<style>
.accountSelect,
.categorySelect,
.flowSelect {
  border-bottom: #cccccc 1px solid;
  margin-top: 10%;
  padding: 3%;
}
</style>
