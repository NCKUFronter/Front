<template>
  <v-card class="py-6 px-12" elevation="10">
    <div class="modal-flow row">
      <h3 @click="form.recordType = 'expense'" :class="{ 'flow-selected': !isIncome, col: 1 }">支出</h3>
      <h3 @click="form.recordType = 'income'" :class="{ 'flow-selected': isIncome, col: 1 }">收入</h3>
    </div>

    <form class="modal-content">
      <div class="date-wrap">
        <v-text-field
          outlined
          dense
          class="date"
          v-on:click="dataPickerModal = !dataPickerModal"
          v-on:blur="dataPickerModal = false"
          prepend-icon="mdi-calendar-range"
          color="primary"
          label="日期"
        >{{ form.date }}</v-text-field>
        <v-date-picker
          v-if="dataPickerModal"
          class="dataPicker"
          landscape
          reactive
          v-model="form.date"
          color="#efca16"
          header-color="#efca16"
          v-on:click.native="dataPickerModal = !dataPickerModal"
          transition="scroll-y-transition"
        ></v-date-picker>
      </div>

      <div class="modal-account">
        <v-select
          v-model="form.ledgerId"
          dense
          label="帳本"
          outlined
          prepend-icon="mdi-book-outline"
          color="primary"
          item-text="name"
          item-value="_id"
          :items="userLedgers"
        ></v-select>
        <!--select v-model="form.ledger">
          <option value>請選擇</option>
          <option
            v-for="(item, index) in modalAccount"
            :value="item.accountCate"
            :key="index"
          >{{ item.accountCate }}</option>
        </select-->
      </div>

      <div class="modal-cate">
        <!--select v-model="form.categoryId">
          <option value>請選擇</option>
          <option v-for="cate in modalCategory" :value="cate._id" :key="cate._id">{{ cate.name }}</option>
        </select-->
        <v-select
          v-model="form.categoryId"
          dense
          prepend-icon="mdi-shape-outline"
          color="primary"
          label="類別"
          item-text="name"
          item-value="_id"
          outlined
          :items="userCategories"
        ></v-select>
      </div>

      <div class="modal-money">
        <v-text-field
          dense
          prepend-icon="mdi-cash-100"
          v-model="form.money"
          label="金額"
          outlined
          type="number"
          name="money"
        ></v-text-field>
      </div>

      <v-combobox
        v-model="form.hashtags"
        :items="form.hashtags"
        chips
        clearable
        append-icon
        label="標籤"
        multiple
        outlined
        prepend-icon="mdi-tag-multiple-outline"
        light
        color="#efca16"
      >
        <template v-slot:selection="{ attrs, item, select, selected }">
          <v-chip
            v-bind="attrs"
            :input-value="selected"
            close
            @click="select"
            @click:close="remove(item)"
          >
            <strong>{{ item }}</strong>&nbsp;
          </v-chip>
        </template>
      </v-combobox>

      <div class="modal-button row justify-center">
        <v-btn type="button" v-if="edit == false" @click="addRecord" class="add" color="#efca16">新增</v-btn>
        <v-btn type="button" v-else @click="editRecord" class="add" color="#efca16">新增</v-btn>
        <v-btn type="button" @click="onModalClose" class="cancel" color="#cccccc">取消</v-btn>
        <!-- <button  class="add">新增</button>
        <button  class="cancel">取消</button>-->
      </div>
    </form>
  </v-card>
</template>

<script>
import { filterChangedFields, getLocaleDate } from "../utils";

let data = {
  selected_category: "",
  userDate: "2020-04-20",
  dataPickerModal: false,
  modalCategory: [],
  // modalCategory: [
  //   {
  //     name: "食物",
  //     _id: "5ea06d246b04b818d4d3c79b",
  //     index: "0"
  //   },
  //   {
  //     name: "交通",
  //     _id: "5ea06d246b04b818d4d3c79c",
  //     index: "1"
  //   },
  //   {
  //     name: "治裝",
  //     _id: "5ea06d246b04b818d4d3c79d",
  //     index: "2"
  //   },
  //   {
  //     name: "娛樂",
  //     _id: "5ea06d246b04b818d4d3c79e",
  //     index: "3"
  //   }
  // ],

  modalAccount: [
    { accountCate: "Main Account" },
    { accountCate: "Bank SinoPac" }
  ],
  form: {
    recordType: "income",
    ledger: "",
    categoryId: "",
    money: 0,
    date: null
  },

  newHashtag: [],
  hashtag: [
    { index: 1, name: "食物", tag: ["早餐", "午餐", "晚餐"] },
    { index: 2, name: "交通", tag: ["高鐵", "台鐵", "客運"] },
    { index: 3, name: "治裝", tag: ["上衣", "長褲", "外套"] },
    { index: 4, name: "娛樂", tag: ["電影", "KTV"] }
  ]
};

export default {
  name: "EditRecord",
  props: ["recordDate", "edit", "oldForm"],
  data() {
    return data;
  },
  created() {
    this.initialDate();
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

    // this.$http.delete("/category/1", { name: "衝動消費" }).then(res => {
    //   console.log(res.data);
    // });
    // this.$http
    //   .post("/category", { name: "日常消費" })
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // this.$http.get("/category").then(res => {
    //   // console.log(res.data);
    //   this.modalCategory = res.data;
    //   console.log(this.modalCategory);
    // });
  },
  computed: {
    isIncome() {
      return this.form.recordType == "income";
    },
    filterHashtag() {
      console.log(this.form.categoryId);
      let index = -1;
      if (this.form.categoryId != "") {
        index = this.modalCategory.filter(item => {
          return item._id === this.form.categoryId;
        })[0].index;
      }

      if (index > -1) {
        return this.hashtag[index].tag;
      } else {
        return this.newHashtag;
      }
    },
    categoryHashTags() {
      if (this.form.categoryId !== null) {
        const category = this.userCategories.find(
          item => item._id == this.form.categoryId
        );
        return category.hashtags || [];
      } else return [];
    }
  },
  create() {
    if (this.oldForm != null) this.copyOldForm();
  },
  watch: {
    oldForm() {
      if (this.oldForm != null) this.copyOldForm();
      else this.resetForm();
    }
  },
  asyncComputed: {
    userCategories: {
      get() {
        return this.$http.get("/user/categories").then(res => res.data);
      },
      default: []
    },
    userLedgers: {
      get() {
        return this.$http.get("/user/ledgers").then(res => res.data);
      },
      default: []
    }
  },
  methods: {
    copyOldForm() {
      this.form.ledgerId = this.oldForm.ledgerId;
      this.form.categoryId = this.oldForm.ledgerId;
      this.form.money = this.oldForm.money;
      this.form.hashtags = this.oldForm.hastags;
      this.form.recordType = this.oldForm.recordType;
      this.form.date = this.oldForm.date;
    },
    resetForm() {
      this.form.ledgerId = null;
      this.form.categoryId = null;
      this.form.money = 0;
      // this.form.detail = "";
      this.form.hashtags = [];
      this.form.recordType = "income";
      this.form.date = this.userDate;
    },
    checkForm() {
      if (
        !this.form.ledger ||
        !this.form.categoryId ||
        !this.form.recordType ||
        parseInt(this.form.money, 10) < 0
      ) {
        alert("所有欄位請輸入正確資料");
        return false;
      }
      return true;
    },

    initialDate() {
      let t = new Date();
      this.userDate = t.toISOString().substr(0, 10);
    },
    click() {
      this.dataPickerModal = false;
      console.log(this.dataPickerModal);
    },
    addRecord() {
      if (!this.checkForm()) return;
      const form = Object.assign({}, this.form);
      form.date = this.userDate;

      this.$api
        .createRecord(form)
        .then(() => {
          alert("新增成功");
          this.$emit("add");
          this.resetForm();
          this.onModalClose();
        })
        .catch(err => {
          console.log(err);
          alert("新增失敗");
        });
    },
    editRecord() {
      if (!this.checkForm()) return;
      const patchForm = filterChangedFields(this.oldForm, this.form);
      this.$api
        .updateRecord(this.oldForm._id, this.form)
        .then(res => {
          this.$emit("update");
          this.resetForm();
          this.onModalClose();
        })
        .catch(err => {
          console.log(err);
          alert("更新失敗");
        });
    },
    onModalClose() {
      this.$emit("close");
    },
    onCategoryChange: f1,

    onAccountChange: function() {
      // reset!
      return this.selected_accountCate;
    },
    remove(item) {
      this.form.hashtags.splice(this.form.hashtags.indexOf(item), 1);
      this.form.hashtags = [...this.chips];
    }
  }
};

function f1() {
  // reset!
  return this.selected_category;
}
</script>

<style scoped lang="scss">
.modal {
  padding: 1em;
  margin: 0;
  position: fixed;
  width: 50vw;
  top: 20vh;
  left: 24vw;
  background-color: white;
  font-size: 20px;
  display: flex;
  flex-wrap: wrap;
}

.modal-content {
  margin: 0 auto;
  min-width: 34vw;
}

.modal-flow {
  margin: 0 0.5em;
  padding: 0 0 1.5em 0;

  h3 {
    height: 1.6em;
    padding: 0;
    margin: 0 0.5em;
    font-size: 1.2em;
    font-weight: normal;
    color: #cccccc;
    border-bottom-style: solid;
    border-bottom-color: #cccccc;
    text-align: center;
    cursor: pointer;

    &:hover {
      /* color:#efca16;
    border-bottom-color: #efca16; */
      opacity: 50%;
    }

    &.flow-selected {
      font-weight: bolder;
      color: #efca16;
      border-bottom-color: #efca16;
      cursor: unset;

      &:hover {
        opacity: unset;
      }
    }
  }
}
.date-wrap {
  z-index: 5;
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
  margin: 0 3%;
  justify-content: center;
}

/* .modal-money  */
.modal-money {
  input {
    min-width: 23vw;
    display: inline-block;
    border: #fff solid 1px;
    border-bottom: #ccc solid 3px;
  }

  p {
    display: inline-block;
    margin: 3%;
  }
}

/* .modal-cate */
.modal-cate {
  p {
    display: inline-block;
    margin: 3%;
  }

  select {
    border: #fff solid 1px;
    border-bottom: #ccc solid 3px;
    display: inline-block;
    min-width: 23vw;
  }
}

/* .modal-account  */
.modal-account {
  p {
    display: inline-flex;
    margin: 3%;
  }

  select {
    border: #fff solid 1px;
    border-bottom: #ccc solid 3px;
    display: inline-flex;
    min-width: 23vw;
  }
}

/* modal-button */
.add,
.cancel {
  margin: 0 10%;
  font-size: 15px;
  text-decoration: none;
  color: black;
  border-style: none;
  border-radius: 10px;
  background-color: #efca16;

  &:hover {
    opacity: 70%;
  }
}

.cancel {
  background-color: #cccccc;

  &:hover {
    opacity: 70%;
  }
}

select,
input {
  border: 1px solid #303030;
}
</style>
