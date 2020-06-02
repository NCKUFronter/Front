<template>
    <v-row v-if="loading">
      <v-flex xs6 sm3 md3 v-for="item in 6" :key="item" class="pa-2">
        <v-boilerplate class="md-6" type=" table-heading,list-item-three-line"></v-boilerplate>
      </v-flex>
    </v-row>
    <v-row v-else>
    <v-flex xs6 sm3 md3 v-for="ledger of adminLedgers" :key="ledger._id" class="pa-2">
      <v-card flat style="border-radius:2em">
      <div class="pr-8 pl-8 pt-2 pb-2" style="background-color:#08112c;position: relative">
        <v-img  src="../assets/fronter/account/planet2.png" ></v-img>
        <v-card-title style="position:absolute;left:0;bottom:0;font-size:18px" class="pa-0 ma-0 ml-3"> {{ledger.ledgerName}}</v-card-title>
        <v-card-actions class="pa-0 ma-0" style="position:absolute;right:5px;bottom:0;">
          <v-spacer />
          <v-btn class="pa-1 mb-1 ma-0 elevation-0" v-on:click="invite(ledger)"
          style="background-color:transparent;height:fit-content;width:fit-content;border-radius:0;"
          >
            <v-icon small>mdi-account-multiple-plus</v-icon>
          </v-btn>
          <v-btn class="pa-1 mb-1 ma-0 elevation-0" v-on:click="out(ledger)"
          style="background-color:transparent;height:fit-content;width:fit-content;border-radius:0;"
          >
            <v-icon small>mdi-account-multiple-minus</v-icon>
          </v-btn>
        </v-card-actions>
      </div>
      <div  style="background-color:#0c193f">
        <v-card-text class="pa-0 ma-0 ml-3 pt-1" style="font-size:12px">帳本人數: {{ledger.users.length}}</v-card-text>
        <v-flex class="px-4 pb-2">
          <!-- if ledger.users.length<=6 -->
          <v-avatar
            v-for="user in ledgerUser(ledger.users)"
            :key="ledger._id + user._id"
            size="22"     
            class="ma-1"
            style="background-color:#3d404e"
          >
            <img :src="user.photo" />
          </v-avatar>
          <!-- v-if="ledger.users.length>6"  -->
          <div v-if="ledger.users.length>6" style="position:relative;display:inline"> 
          <v-avatar size="22" class="ma-1" style="background-color:#26282d;position: absolute;left:10px"></v-avatar>
          <v-avatar size="22" class="ma-1" style="background-color:#32343e;position: absolute;left:5px"></v-avatar>
          <v-avatar size="22" class="ma-1" style="background-color:#3d404e;;position: absolute;font-size:0.5em">+{{ledger.users.length-4}}</v-avatar>
          </div>
        </v-flex>
        <!-- if ledger.users.length>6 -->
      </div>
      </v-card>
    </v-flex>
    </v-row>

</template>

<script>
export default {
  data: () => ({
  }),
  created(){

  },
  props: ["adminLedgers",],
  methods:{
      ledgerUser(user){
        console.log(user.length)
        if(user.length<=6){
          return user
        }else{
          var shortlist=[];
          for (var i=0;i<4;i++){
            shortlist.push(user[i])
          }
          return shortlist
          // return user.splice(0,3)
        }
        
      }
  }
}
</script>
<style scoped>
.v-btn:not(.v-btn--round).v-size--default{
    min-width: 5px;
}
</style>