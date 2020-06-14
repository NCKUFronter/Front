<template>
  <div class="RT">
  <v-card flat class="scroll recordTable" style="height:60vh;" v-if="$vuetify.breakpoint.smAndUp"

  > 
    <!-- class="scroll recordTable" -->
    <!-- <div class="header-background"></div> -->
    <v-data-table  class=" record" 
    hide-default-footer
    :items-per-page= "-1"
    :headers="headers" :items="filterAccountData" sort-by="money" >
      <!-- recordType -->
      
      <template v-slot:item.user="{ item }">
        <!--v-chip :color="getColor(item.recordType)"-->
        <!-- <v-icon left>getIcon()</v-icon>-->
        <!-- <v-icon v-if="getIcon()==true">mdi-tray-minus</v-icon>
        <v-icon v-else>mdi-tray-plus</v-icon>-->
        <!--{{item.recordType}}-->
        <!--/v-chip-->
        <v-avatar size="36">
          <img :src="item.user.photo" />
        </v-avatar>
        <!-- <v-icon v-if="item.recordType[0]=='i'" color="green">mdi-cash-plus</v-icon>
        <v-icon v-else color="red">mdi-cash-minus</v-icon> -->
      </template>

      <!-- category -->
      <template v-slot:item.categoryId="{ item }">
        <v-chip :color="(item.category) ? item.category.color : '#d5ccb3'" key="item.category" label style="width:100%;height:5vh;" class="justify-center">{{ (item.category) ? item.category.name : '未知' }}</v-chip>
      </template>

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
  
  </v-card>
  <v-card flat outlined class="scroll mobileRecordTable" style="height:72vh;" v-else > 
    <!-- <v-data-table :headers="headers" :items="filterAccountData">
              <template slot="items" slot-scope="props">
                <tr style="display: block;position: relative;">
                  <td>
                    <ul class="flex-content">
                      <li style="display: block;" class="flex-item" data-label="user">        
                        <v-avatar size="36">
                          <img :src="props.item.user.photo" />
                        </v-avatar>
                        </li>
                      <li style="display: block;" class="flex-item" data-label="categoryId">{{ props.item.category.name }}</li>
                      <li style="display: block;" class="flex-item" data-label="hashtags">
                        <v-chip label small v-for="tag in prop.item.hashtags" :key="tag" class="mx-1">{{ tag }}</v-chip>
                      </li>
                      <li style="display: block;" class="flex-item" data-label="money">{{ props.item.money }}</li>
                      <li style="display: block;" class="flex-item" data-label="rewardPoints">{{ props.item.rewardPoints }}</li>
                      <li class="flex-item" data-label="from">{{ props.item.iron }}</li>
                    </ul>
                  </td>
                </tr>
              </template>
    </v-data-table> -->
    <v-simple-table
    >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center px-1"></th>
          <th class="text-center px-1">類別</th>
          <th class="text-center px-1">標籤</th>
          <th class="text-center px-1">金額</th>
          <th class="text-center px-1">點數</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in filterAccountData" :key="index" @click="$emit('want-edit',item)">
          <td class="text-center px-1"><v-avatar size="34px"><img :src="item.user.photo" /> </v-avatar></td>
          <td class="text-center px-1">
            <v-avatar size="34px" :color="(item.category) ? item.category.color : '#d5ccb3'">
            <v-icon size="24px">{{item.category.icon}}</v-icon>
            <!-- {{ (item.category) ? item.category.name : '未知' }} -->
            </v-avatar>
          </td>
          <td class="text-center px-1">
            <v-chip label small v-for="tag in item.hashtags" :key="tag" class="mx-1">{{ tag }}</v-chip>
          </td>
          <td class="text-center px-1">{{ item.money }}</td>
          <td class="text-center px-1">{{ item.rewardPoints }}</td>
        </tr>
      </tbody>
    </template>

    </v-simple-table>
  </v-card>
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
          value: "user"
        },
        {
          text: "類別",
          align: "center",
          value: "categoryId",
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
  props: ["userDate", "ledgerSelected", "accountData","flowSelected"],
  created() {},
  computed: {

    filterAccountData() {
      // return this.filterLedgerData.filter(item => {
      return this.accountData.filter(item => {
        return getLocaleDate(item.date) === this.userDate;
      });

    },

    // filterLedgerData() {
    //   if (this.ledgerSelected != "All") {
    //     return this.accountData.filter(item => {
    //       return item.ledger === this.ledgerSelected;
    //     });
    //   } else {
    //     return this.accountData;
    //   }
    // }
  },
  methods: {
    getCateColor(cate){
      console.log(cate)
      if(cate=="食物"){
        return '#FED37A'
      }else if(cate=="娛樂"){
        return "#FFA863"
      }else if(cate=="醫療"){
        return "#DF764C"
      }else if(cate=="交通"){
        return "#8ABA97"
      }else if(cate=="治裝"){
        return "#50989E"
      }else{
        return "#D5CCB3"
      }
    },
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

<style >
.recordTable .theme--dark.v-data-table tbody tr:not(:last-child) td:not(.v-data-table__mobile-row), .theme--dark.v-data-table tbody tr:not(:last-child) th:not(.v-data-table__mobile-row) ,
.mobileRecordTable .theme--dark.v-data-table tbody tr:not(:last-child) td:not(.v-data-table__mobile-row), .theme--dark.v-data-table tbody tr:not(:last-child) th:not(.v-data-table__mobile-row) {
    border-bottom: none;
}

/* width */
.RT ::-webkit-scrollbar {
  width: 13px;
  background-color: transparent;
}

/* Handle */
.RT ::-webkit-scrollbar-thumb {
  background: white;
  border-radius: 5px;
  border: 4px solid #26282d;
}


.scroll {
  overflow-y: auto;

}

.RT .theme--dark.v-card{
  background-color: transparent ! important;
}

.accountSelect,
.categorySelect,
.flowSelect {
  border-bottom: #cccccc 1px solid;
  margin-top: 10%;
  padding: 3%;
  
}



.recordTable .v-data-table-header th,
.recordTable .v-data-table tbody tr,
.mobileRecordTable .v-data-table-header th,
.mobileRecordTable .v-data-table tbody tr
{
  height: 8vh;
}

.recordTable{
  width: 100%;
  position: relative;
  
}

.recordTable thead{
  background-color: rgba(255,255,255,0.2);
  border-radius: 10px ! important;
}

.recordTable .v-chip--label ,
.mobileRecordTable .v-chip--label {
    border-radius: 10px !important;
}

/* .header-background{
  background-color: white; 
  opacity: 20%;
  width: 100%;
  height: 8vh;
  border-radius: 10px;
  position: absolute;
} */

.theme--dark.v-tabs > .v-tabs-bar {
    background-color: transparent;
}

.v-data-table{
  background-color: transparent ! important;
}
</style>
