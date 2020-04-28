<template>
  <div>
    <v-data-table :headers="headers" :items="filterAccountData" sort-by="money">
      <!-- category -->
      <template v-slot:item.category="props">
        <v-edit-dialog
          :return-value.sync="props.item.categoryId"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div>{{ props.item.categoryId | categoryName }}</div>
          <template v-slot:input>
            <div class="mt-4 title">Update Category</div>
          </template>
          <template v-slot:input>
            <select v-model="props.item.categoryId" label="Edit" class="categorySelect">
              <option
                v-for="cate in modalCategory"
                :value="cate._id"
                :key="cate._id"
              >{{ cate.name }}</option>
            </select>
          </template>
        </v-edit-dialog>
      </template>

      <!-- detail -->
      <template v-slot:item.detail="props">
        <v-edit-dialog
          :return-value.sync="props.item.detail"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div>{{ props.item.detail }}</div>
          <template v-slot:input>
            <div class="mt-4 title">Update ItemDetail</div>
          </template>
          <template v-slot:input>
            <v-text-field
              v-model="props.item.detail"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <!-- money -->
      <template v-slot:item.money="props">
        <v-edit-dialog
          :return-value.sync="props.item.money"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div>{{ props.item.money }}</div>
          <template v-slot:input>
            <div class="mt-4 title">Update Money</div>
          </template>
          <template v-slot:input>
            <v-text-field
              v-model="props.item.money"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <!-- ledger -->

      <template v-slot:item.ledger="props">
        <v-edit-dialog
          :return-value.sync="props.item.ledger"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div>{{ props.item.ledger }}</div>
          <template v-slot:input>
            <div class="mt-4 title">Update Account</div>
          </template>
          <template v-slot:input>
            <select v-model="props.item.ledger" label="Edit" class="accountSelect">
              <option
                v-for="(item,index) in modalAccount"
                :value="item.accountCate"
                :key="index"
              >{{ item.accountCate }}</option>
            </select>
          </template>
        </v-edit-dialog>
      </template>

      <!-- recordType -->

      <template v-slot:item.recordType="props">
        <v-edit-dialog
          :return-value.sync="props.item.recordType"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div>{{ props.item.recordType }}</div>
          <template v-slot:input>
            <div class="mt-4 title">Update Flow</div>
          </template>
          <template v-slot:input>
            <select v-model="props.item.recordType" label="Edit" class="flowSelect">
              <option v-for="(item,index) in modalFlow" :value="item" :key="index">{{ item.flow }}</option>
            </select>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:item.actions="{ item }">
        <!-- <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
        </v-icon>-->
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn text @click="snack = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
const modalCategory = [
  {
    name: "食物",
    _id: "5ea06d246b04b818d4d3c79b",
    index:"0"
  },
  {
    name: "交通",
    _id: "5ea06d246b04b818d4d3c79c",
    index:"1"
  },
  {
    name: "治裝",
    _id: "5ea06d246b04b818d4d3c79d",
    index:"2"
  },
  {
    name: "娛樂",
    _id: "5ea06d246b04b818d4d3c79e",
    index:"3"
  }
];
export default {
  data() {
    return {
      snack: false,
      snackColor: "",
      snackText: "",
      max25chars: v => v.length <= 25 || "Input too long!",
      pagination: {},
      headers: [
        {
          text: "Category",
          value: "category"
        },
        {
          text: "Item",
          value: "detail"
        },
        {
          text: "Money",
          value: "money"
        },
        {
          text: "Account",
          value: "ledger"
        },
        {
          text: "Flow",
          value: "recordType"
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false
        }
      ],
      modalCategory,
      modalAccount: [
        { accountCate: "Main Account" },
        { accountCate: "Bank SinoPac" }
      ],

      modalFlow: ["Income", "Expense"]
    };
  },
  props: ["userDate", "ledgerSelected", "accountData"],
  created() {},
  filters: {
    categoryName(categoryId) {
      return modalCategory.find(cate => cate._id == categoryId).name;
    }
  },
  computed: {
    filterAccountData() {
      return this.filterLedgerData.filter(item => {
        return item.date === this.userDate;
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
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    },
    deleteItem(item) {
      this.$emit("delete", item);
      /*
      const index = this.accountData.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.accountData.splice(index, 1);
        */
      if (confirm("Are you sure you want to delete this item?")) {
        this.$api
          .deleteRecord(item._id)
          .then(() => {
            this.$emit("delete", item);
          })
          .catch(err => {
            console.log(err);
            alert("刪除失敗");
          });
      }
    }
  }
};
</script>

<style scoped>
.accountSelect,
.categorySelect,
.flowSelect {
  border-bottom: #cccccc 1px solid;
  margin-top: 10%;
  padding: 3%;
}
</style>
