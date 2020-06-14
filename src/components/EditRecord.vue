<template>
    <v-card flat>
        <form class="modal-content" >
        <v-layout row>
            <v-flex xs12 sm5 md4
            v-if="$vuetify.breakpoint.smAndUp"
            style="border-right: solid 2px #dddee2;"
            :style="$vuetify.breakpoint.mdAndUp?'padding: 0% 5% 0% 5%':'padding: 0% 1% 0% 4%'"
            >
                <!-- <v-card v-for="item in userCategories" :key="item" > -->
                  <v-btn ref="category"  @click="categorySelect(item)" 
                  v-for="(item,index) in userCategories" :key="index" class="cate elevation-0" 
                  style="margin:5%;height:80px;width:80px;border-radius:50px;background-color:#26282d;"
                  :style="cateCircle(item)"
                  >
                    <v-avatar :color="item.color" size="70" >
                        <span style="color:#3D404E; font-weight:bold">{{item.name}}</span>
                    </v-avatar>
                  </v-btn>
                <!-- </v-card> -->
            </v-flex>
            <v-flex xs12 sm7 md8  :style="$vuetify.breakpoint.smAndUp?'padding:2% 18% 2% 12%':'padding:2% 2%'">
                <div class="modal-flow row">
                <h3 @click="form.recordType = 'expense'" :class="{ 'flow-selected': !isIncome, col: 1 }"
                :style="$vuetify.breakpoint.mdAndUp?'height: 5em;margin:0% 8%;':'height: 3.5em;margin:0% 2%;'"
                >
                    <!-- <v-icon class="pb-3">mdi-cash-minus</v-icon> -->
                    支出
                </h3>
                <h3 @click="form.recordType = 'income'" :class="{ 'flow-selected': isIncome, col: 1 }"
                :style="$vuetify.breakpoint.mdAndUp?'height: 5em;margin:0% 8%;':'height: 3.5em;margin:0% 2%;'"
                >
                    <!-- <v-icon class="pb-3">mdi-cash-plus</v-icon> -->
                    收入
                </h3>
                </div>
                
                <DateInputPicker
                    v-model="form.date"
                    color="primary"
                    transition="scroll-y-transition"
                    :top="35"
                >
                    <template v-slot:activator="{ on, value }">
                    <v-text-field
                        color="primary"
                        prepend-icon="mdi-calendar-range"
                        readonly
                        :value="value"
                        v-on="on"
                        filled
                        dense
                        hide-details
                        style="margin:4% 0% 8% 0%;"
                    ></v-text-field>
                    </template>
                </DateInputPicker>

                <div class="modal-account">
                    <v-select
                    v-model="form.ledgerId"
                    dense
                    filled
                    prepend-icon="mdi-book-outline"
                    color="primary"
                    item-text="ledgerName"
                    item-value="_id"
                    :items="userLedgers"
                    hide-details
                    style="margin:8% 0%; "
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

                <div class="modal-money">
                    <v-text-field
                    dense
                    prepend-icon="mdi-cash-100"
                    v-model="form.money"
                    filled
                    type="number"
                    name="money"
                    hide-details
                    style="margin:8% 0%"
                    ></v-text-field>
                </div>

                <div v-if="$vuetify.breakpoint.xsOnly" class="modal-cate align-center " style="line-height:1px;" >
                  <v-icon  style="display:inline-block;vertical-align:50%">mdi-shape-outline</v-icon>
                  <div style="margin-left:2vw;display:inline-block;white-space:nowrap;width:70vw;overflow-x:auto;overflow-y:hidden">                  
                  <v-btn ref="category"  @click="categorySelect(item)" 
                  v-for="(item,index) in userCategories" :key="index" class="cate elevation-0" 
                  style="min-width:0px;margin:3px;height:60px;width:60px;border-radius:50px;background-color:#26282d;"
                  :style="cateCircle(item)"
                  >
                    <v-avatar :color="item.color" size="50"  >
                        <span style="color:#3D404E; font-weight:bold">{{item.name}}</span>
                    </v-avatar>
                  </v-btn>
                </div>
                    <!-- <v-select
                    v-model="form.categoryId"
                    dense
                    prepend-icon="mdi-shape-outline"
                    color="primary"
                    item-text="name"
                    item-value="_id"
                    filled
                    :items="userCategories"
                    ></v-select> -->
                </div>

                <v-combobox
                    v-model="form.hashtags"
                    :items="categoryHashTags"
                    chips
                    clearable
                    append-icon
                    multiple
                    filled
                    hide-details
                    prepend-icon="mdi-tag-multiple-outline"
                    color="white"
                    :style="$vuetify.breakpoint.xsOnly?'margin:6% 0% 8% 0%':'margin:8% 0%'"
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
                    <v-btn v-if="oldForm == null" @click="addRecord" class="add" color="#72aa8b">新增</v-btn>
                    <v-btn v-else @click="editRecord" class="add" color="#72aa8b">修改</v-btn>
                    <v-btn @click="onModalClose" class="cancel" color="#dddee2">取消</v-btn>
                </div>
                
            </v-flex>              
        </v-layout>
        </form>      
    </v-card>
</template>
<script>
import { filterChangedFields, getLocaleDate } from "../utils";
import DateInputPicker from "./DateInputPicker";
import { ignoreNotLoginError } from "../utils";

let data = {
  dataPickerModal: false,
  form: {
    recordType: "income",
    ledgerId: "",
    categoryId: "",
    money: 0,
    date: "",
  }

  /*
  newHashtag: [],
  hashtag: [
    { index: 1, name: "食物", tag: ["早餐", "午餐", "晚餐"] },
    { index: 2, name: "交通", tag: ["高鐵", "台鐵", "客運"] },
    { index: 3, name: "治裝", tag: ["上衣", "長褲", "外套"] },
    { index: 4, name: "娛樂", tag: ["電影", "KTV"] }
  ]
  */
};

export default {
  name: "EditRecord",
  inject: ["$alert"],
  props: {
    userDate: {
      type: String,
      default: () => getLocaleDate(new Date())
    },
    oldForm: {
      type: Object,
      default: () => null
    },
    ledgerSelected: {
      type: String
    },
    
  },
  data() {
    return data;
  },
  components: {
    DateInputPicker
  },
  created() {
    this.resetForm();
    if (this.oldForm != null) this.copyOldForm();
    // this.initialDate();
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
    /*
    filterHashtag() {
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
    */
    categoryHashTags() {
      if (this.form.categoryId !== null) {
        const category = this.userCategories.find(
          item => item._id == this.form.categoryId
        );
        return (category && category.hashtags) || [];
      } else return [];
    }
  },
  watch: {
    oldForm(val) {
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
    categorySelect(item){
      // console.log(item)
      this.form.categoryId=item._id;
    },

    cateCircle(item){
      // console.log(item)
      if(item._id==this.form.categoryId){
        return `border:solid 1.8px ${item.color}`
      }else{
        return ''
      }
    },
    copyOldForm() {
      this.form.ledgerId = this.oldForm.ledgerId;
      this.form.categoryId = this.oldForm.categoryId;
      this.form.money = this.oldForm.money;
      this.form.hashtags = this.oldForm.hashtags;
      this.form.recordType = this.oldForm.recordType;
      this.form.date = getLocaleDate(this.oldForm.date);
    },
    resetForm() {
      this.form.ledgerId = this.ledgerSelected;
      this.form.categoryId = null;
      this.form.money = 0;
      // this.form.detail = "";
      this.form.hashtags = [];
      this.form.recordType = "income";
      this.form.date = this.userDate;
    },
    checkForm() {
      if (
        !this.form.ledgerId ||
        !this.form.categoryId ||
        !this.form.recordType ||
        parseInt(this.form.money, 10) < 0
      ) {
        this.$alert.warning("所有欄位請輸入正確資料");
        return false;
      }
      return true;
    },
    click() {
      this.dataPickerModal = false;
      // console.log(this.dataPickerModal);
    },
    addRecord() {
      if (!this.checkForm()) return;
      const form = Object.assign({}, this.form);

      this.$api
        .createRecord(form)
        .then(() => {
          this.$alert.success("成功新增帳目");
          this.$emit("add");
          this.onModalClose();
        })
        .catch(ignoreNotLoginError)
        .catch(err => {
          this.$alert.success("新增帳目失敗");
          console.log(err);
        });
    },
    editRecord() {
      if (!this.checkForm()) return;
      const patchForm = filterChangedFields(this.oldForm, this.form);
      this.$api
        .updateRecord(this.oldForm._id, patchForm)
        .then(res => {
          this.$alert.success("成功更新帳目");
          this.$emit("update");
          this.resetForm();
          this.onModalClose();
        })
        .catch(ignoreNotLoginError)
        .catch(err => {
          this.$alert.success("更新帳目失敗");
          console.log(err);
        });
    },
    onModalClose() {
      this.resetForm();
      if (this.oldForm != null) this.copyOldForm();
      this.$emit("close");
    },
    remove(item) {
      this.form.hashtags.splice(this.form.hashtags.indexOf(item), 1);
      this.form.hashtags = [...this.chips];
    }
  }
};
</script>

<style scoped lang="scss">


.v-text-field--filled{
  border-radius: 4px;
}

.v-text-field > .v-input__control > .v-input__slot:before{
  border-style: none !important;
  border: transparent !important;
}

.theme--dark.v-btn{
  color: #3D404E;
}

// .theme--dark.v-text-field--filled > .v-input__control > .v-input__slot{
//   background-color: rgba(221,222,226,1) !important;
// }

// .v-text-field > .v-input__control > .v-input__slot:before, .v-text-field > .v-input__control > .v-input__slot:after{
//   content: none;
// }

// .v-text-field > .v-input__control > .v-input__slot:before, .v-text-field > .v-input__control > .v-input__slot:before{
//   content: none;
// }


.frame{
  width: 70%;
  padding: 2%;
  margin: auto;
  background-color: #3D404E;
  border-radius: 50px;
  margin-top: 5%;
}
// .modal {
//   padding: 1em;
//   margin: 0;
//   position: fixed;
//   width: 50vw;
//   background-color: white;
//   font-size: 20px;
//   display: flex;
//   flex-wrap: wrap;
// }

.modal-content {
  margin: 0 auto;
//   min-width: 40vw;
}

.modal-flow {
  padding-left: 10%;
  width: 100%;
  h3 {
    // margin-left: 5%;
    font-size: 1.2em;
    // padding-top:4%;
    // padding-right:10%;
    // padding:5%;
    font-weight: normal;
    background-image: url(../assets/fronter/account/unclick.png) ;
    background-size: 100%;
    color: #dddee2;
    text-align: center;
    
    cursor: pointer;

    &:hover {
      /* color:#efca16;
    border-bottom-color: #efca16; */
      opacity: 50%;
    }

    i {
      margin-top: 5px;
      margin-right: 5px;
      color: inherit;
    }

    &.flow-selected {
      font-weight: bolder;
      color: #efca16;
      cursor: unset;

      &:first-child {
        background-image: url(../assets/fronter/account/clicked.png) ;
        background-size:100%;
        color: #3D404E;
      }

      &:nth-child(2) {
        background-image: url(../assets/fronter/account/clicked.png);
        background-size:100%;
        color: #3D404E;
      }

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

.cateCircle{
    height:50px;
    width: 50px;
    border-radius: 50px;;
    background-color: turquoise;
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

// modal-tag
.v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--enclosed .v-select__selections {
    min-height: 30px;
}

/* modal-button */
.add,
.cancel {
  margin: 0 9%;
  font-size: 15px;
  font: bold;
  text-decoration: none;
  border-style: none;
  width: 30%;
  border-radius: 10px;
  &:hover {
    opacity: 70%;
  }
}

.add{
  margin-left: 13%;
}

.cancel {
  &:hover {
    opacity: 70%;
  }
}

// select,
// input {
//   border: 1px solid #303030;
// }
</style>
