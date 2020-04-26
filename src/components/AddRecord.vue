<template>
  <div class="modal">
    <div class="modal-flow">
      <h3 @click="form.recordType = 'expense'" :class="{'flow-selected': !isIncome }">支出</h3>
      <h3 @click="form.recordType = 'income'" :class="{'flow-selected': isIncome }">收入</h3>
    </div>

    <!-- <tabs>
      <tab name="expense" :selected="true">
          <h1>expense</h1>
      </tab>
      <tab name="income" :selected="true">
          <h1>income</h1>
      </tab>
    </tabs>-->

    <form class="modal-content">
      <div class="modal-money">
        <p>金額*</p>
        <input v-model="form.money" type="number" name="money" />
      </div>

      <div class="modal-cate">
        <p>類別*</p>
        <select v-model="form.categoryId">
          <option value>請選擇</option>
          <option v-for="cate in modalCategory" :value="cate._id" :key="cate._id">{{ cate.name }}</option>
        </select>
      </div>

      <div class="modal-account">
        <p>帳戶*</p>
        <select v-model="form.ledger">
          <option value>請選擇</option>
          <option
            v-for="(item,index) in modalAccount"
            :value="item.accountCate"
            :key="index"
          >{{ item.accountCate }}</option>
        </select>
      </div>

      <template>
          <v-combobox
            v-model="newHashtag"
            :items="filterHashtag"
            chips
            clearable
            append-icon
            label="備註"
            multiple
            solo
            
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
        </template>   

      <div class="modal-button">
        <v-btn type="button" @click="addRecord" class="add" color="#efca16">新增</v-btn>
        <v-btn type="button" @click="onModalClose" class="cancel" color="#cccccc">取消</v-btn>
        <!-- <button  class="add">新增</button>
        <button  class="cancel">取消</button>-->
      </div>
    </form>
    <router-view></router-view>
  </div>
</template>

<script>
let data = {
  selected_category: "",
  modalCategory: [
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
  ],

  modalAccount: [
    { accountCate: "Main Account" },
    { accountCate: "Bank SinoPac" }
  ],
  form: {
    recordType: "income",
    ledger: "",
    categoryId: "",
    money: 0
  },
  
  newHashtag: [],
  hashtag: [
    {index:0,name:"食物",tag:['早餐', '午餐','晚餐']},
    {index:1,name:"交通",tag:['高鐵', '台鐵','客運']},
    {index:2,name:"治裝",tag:['上衣', '長褲','外套']},
    {index:3,name:"娛樂",tag:['電影', 'KTV']},
    
  ],
};

export default {
  name: "AddRecord",
  props: ["recordDate"],
  data() {
    return data;
  },
  computed: {
    isIncome() {
      return this.form.recordType == "income";
    },
    filterHashtag(){

      console.log(this.form.categoryId)
      let index=-1
      if(this.form.categoryId!=''){
        index=this.modalCategory.filter(item => {
          return item._id === this.form.categoryId;
        })[0].index;
      }
    
      if(index>-1){
        return this.hashtag[index].tag
      }else{
        return this.newHashtag
        
      }     
    }
  },
  methods: {
    resetForm() {
      this.form.ledger = "";
      this.form.categoryId = "";
      this.form.money = 0;
      this.form.detail = "";
      this.form.recordType = "income";
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
    addRecord() {
      if (!this.checkForm()) return;
      const form = Object.assign({}, this.form);
      form.date = this.recordDate;

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
    onModalClose() {
      this.$emit("close");
    },
    onCategoryChange: f1,

    onAccountChange: function() {
      // reset!
      return this.selected_accountCate;
    },
    remove (item) {
        this.newHashtag.splice(this.newHashtag.indexOf(item), 1)
        this.newHashtag = [...this.chips]
    },
  }
};

function f1() {
  // reset!
  return this.selected_category;
}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  height: 83vh;
  width: 83vw;
  top: 16.5vh;
  left: 16.9vw;
  background-color: white;
  font-family: 微軟正黑體, Arial, Helvetica, sans-serif;
  font-size: 20px;
  display: flex;
  flex-wrap: wrap;
}

.modal-content {
  margin: 0 auto;
  width: 34vw;
}

.modal-flow {
  display: flex;
  width: 83vw;
  height: fit-content;
  margin: 0 auto;

  h3 {
    display: inline-flex;
    margin: 0 2%;
    font-size: 20px;
    font-weight: normal;
    width: 46%;
    color: #cccccc;
    border-bottom-style: solid;
    border-bottom-color: #cccccc;
    padding: 0 20%;
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

/* .modal-money  */
.modal-money {
  input {
    width: 23vw;
    display: inline-block;
  }

  p {
    display: inline-block;
    margin: 5%;
  }
}

/* .modal-cate */
.modal-cate {
  p {
    display: inline-block;
    margin: 5%;
  }

  select {
    display: inline-block;
    width: 23vw;
  }
}

/* .modal-account  */
.modal-account {
  p {
    display: inline-flex;
    margin: 5%;
  }

  select {
    display: inline-flex;
    width: 23vw;
  }
}

/* modal-button */
.add,
.cancel {
  margin: 5% 10%;
  font-size: 15px;
  text-decoration: none;
  color: black;
  border-style: none;
  border-radius: 10px;
  background-color: #efca16;
  font-family: 微軟正黑體, Arial, Helvetica, sans-serif;

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
