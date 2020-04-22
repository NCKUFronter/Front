
<template>
  <v-data-table
    :headers="headers"
    :items="filterAccountData"
    sort-by="money"
    class="elevation-1"
  >
  
    <template v-slot:top>
      <v-toolbar flat color="white">
        <!-- <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider> -->
        <!-- <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.category" label="Category"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.itemDetail" label="Item"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.money" label="Money"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.account" label="Account"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.flow" label="Flow"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
            
          </v-card>
        </v-dialog> -->
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>

  export default {
    data: () => ({
    //   dialog: false,
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
      accountData: [],
    //   editedIndex: -1,
    //   editedItem: {
    //     category: '',
    //     itemDetail: '',
    //     money: 0,
    //     account: 0,
    //     flow: 0,
    //     accDate:0,
    //   },
    //   defaultItem: {
    //     category: '',
    //     itemDetail: '',
    //     money: 0,
    //     account: 0,
    //     flow: 0,
    //     accDate:0,
    //   },
    }),
    props: ['userDate'],
    components: {
       
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },

      filterAccountData(){
            return this.accountData.filter(item =>{
                return item.accDate.indexOf(this.userDate)!=-1
            })
           
           
      }
    },

    watch: {
    //   dialog (val) {
    //     val || this.close()
    //   },
    },

    created () {
      this.initialize()
         
    },

    methods: {
      initialize () {
        this.accountData=[
        {category:'#',itemDetail:'0418的收入',money:'金額',account:'帳戶',flow:'income',accDate:'2020-4-18'},
        {category:'#',itemDetail:'0420的支出',money:'金額',account:'帳戶',flow:'expense',accDate:'2020-4-20'},
        {category:'#',itemDetail:'0417的收入',money:'金額',account:'帳戶',flow:'income',accDate:'2020-4-17'}
        ]
         
      },

      editItem (item) {
        this.editedIndex = this.accountData.indexOf(item)
        this.editedItem = Object.assign({}, item)
        // this.dialog = true
      },

      deleteItem (item) {
        const index = this.accountData.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.accountData.splice(index, 1)
        
      },

      close () {
        // this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.accountData[this.editedIndex], this.editedItem)
        } else {
          this.accountData.push(this.editedItem)
        }
        this.close()
      },


    },
  }
</script>

<style>

</style>