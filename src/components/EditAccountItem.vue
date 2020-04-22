<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="filterAccountData"
      sort-by="money"
    >

        <!-- category -->
      <template v-slot:item.category="props">
        <v-edit-dialog
          :return-value.sync="props.item.category"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div>{{ props.item.category }}</div>
          <template v-slot:input>
            <div class="mt-4 title">Update Category</div>
          </template>
          <template v-slot:input>
             <select v-model="props.item.category"
              label="Edit"
              class="categorySelect">
                  <option v-for="(item,index) in modalCategory" :value="item.categoryItem" :key="index">
                    {{ item.categoryItem }}
                </option>
            </select>
          </template>
        </v-edit-dialog>
      </template>

      <!-- itemDetail -->

    <template v-slot:item.itemDetail="props">
        <v-edit-dialog
          :return-value.sync="props.item.itemDetail"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div>{{ props.item.itemDetail }}</div>
          <template v-slot:input>
            <div class="mt-4 title">Update ItemDetail</div>
          </template>
          <template v-slot:input>
            <v-text-field
              v-model="props.item.itemDetail"
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

      <!-- account -->

    <template v-slot:item.account="props">
        <v-edit-dialog
          :return-value.sync="props.item.account"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div>{{ props.item.account }}</div>
          <template v-slot:input>
            <div class="mt-4 title">Update Account</div>
          </template>
          <template v-slot:input>
            <select v-model="props.item.account"
              label="Edit"
              class="accountSelect"
            >
               <option v-for="(item,index) in modalAccount" :value="item.accountCate" :key="index">
                        {{ item.accountCate }}
                 </option>
            </select>
          </template>
        </v-edit-dialog>
      </template>

      <!-- flow -->

    <template v-slot:item.flow="props">
        <v-edit-dialog
          :return-value.sync="props.item.flow"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div>{{ props.item.flow }}</div>
          <template v-slot:input>
            <div class="mt-4 title">Update Flow</div>
          </template>
          <template v-slot:input>
            <select v-model="props.item.flow"
              label="Edit"
              class="flowSelect"
            >
               <option v-for="(item,index) in modalFlow" :value="item.flow" :key="index">
                        {{ item.flow }}
                 </option>
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
      </v-icon> -->
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    </v-data-table>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn text @click="snack = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        snack: false,
        snackColor: '',
        snackText: '',
        max25chars: v => v.length <= 25 || 'Input too long!',
        pagination: {},
        headers: [
        {
          text: 'Category',
          align: 'start',
          sortable: false,
          value: 'category',
        },
        { text: 'Item', value: 'itemDetail' },
        { text: 'Money', value: 'money' },
        { text: 'Account', value: 'account' },
        { text: 'Flow', value: 'flow' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
        accountData:[
        {category:'食物',itemDetail:'0421的收入',money:'187',account:'Main Account',flow:'Income',accDate:'2020-04-21'},
        {category:'交通',itemDetail:'0421的支出',money:'200',account:'Main Account',flow:'Expense',accDate:'2020-04-21'},
        {category:'娛樂',itemDetail:'0420的收入',money:'36',account:'Bank SinoPac',flow:'Income',accDate:'2020-04-20'},
        {category:'食物',itemDetail:'0419的收入',money:'187',account:'Main Account',flow:'Income',accDate:'2020-04-19'},
        {category:'交通',itemDetail:'0419的支出',money:'200',account:'Bank SinoPac',flow:'Expense',accDate:'2020-04-19'},
        {category:'娛樂',itemDetail:'0418的收入',money:'36',account:'Bank SinoPac',flow:'Income',accDate:'2020-04-18'},
        ],
        modalCategory:[
        {categoryItem:"食物"},
        {categoryItem:"交通"},
        {categoryItem:"治裝"},
        {categoryItem:"娛樂"}
    ],
        modalAccount:[
        {accountCate:"Main Account"},
        {accountCate:"Bank SinoPac"}
    ],

        modalFlow:[
        {flow:"Income"},
        {flow:"Expense"}
    ],
      }
    },
    props: ['userDate','ledgerSelected'],
    created(){
    },
    computed: {
      

      filterAccountData(){
            return this.filterLedgerData.filter(item =>{
                return item.accDate.indexOf(this.userDate)!=-1
      })},
      filterLedgerData(){

        if(this.ledgerSelected!='All'){
            return this.accountData.filter(item =>{
            return item.account.indexOf(this.ledgerSelected)!=-1
            })
        }else{
          return this.accountData
        }
      },

    },
    methods: {
      save () {
        this.snack = true
        this.snackColor = 'success'
        this.snackText = 'Data saved'
      },
      cancel () {
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Canceled'
      },
      open () {
        this.snack = true
        this.snackColor = 'info'
        this.snackText = 'Dialog opened'
      },
      close () {
        console.log('Dialog closed')
      },
       deleteItem (item) {
        const index = this.accountData.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.accountData.splice(index, 1)
        
      },
    },
  }
</script>

<style scoped>
    .accountSelect{
        border-bottom: #cccccc 1px solid;
        margin-top: 10%;
        padding: 3%;
    }
    .categorySelect{
        border-bottom: #cccccc 1px solid;
        margin-top: 10%;
        padding: 3%;

    }

    .flowSelect{
        border-bottom: #cccccc 1px solid;
        margin-top: 10%;
        padding: 3%;

    }
</style>
