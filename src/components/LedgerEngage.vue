<template>
    <v-row >
    <v-flex xs6 sm3 md3 v-for="ledger of engageLedgers" :key="ledger._id" class="pa-2">
      <v-card flat style="border-radius:2em">
      <div class="pr-8 pl-8 pt-2 pb-2" style="background-color:#08112c;position: relative">
        <v-img  src="../assets/fronter/account/planet2.png" ></v-img>
        <v-card-title style="position:absolute;left:0;bottom:0;font-size:18px" class="pa-0 ma-0 ml-3"> {{ledger.ledgerName}}</v-card-title>
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
        <!-- <v-card-actions>
          <v-spacer />
          <v-btn icon v-on:click="invite(ledger)">
            <v-icon>mdi-account-multiple-plus</v-icon>
          </v-btn>
          <v-btn icon v-on:click="out(ledger)">
            <v-icon>mdi-account-multiple-minus</v-icon>
          </v-btn>
        </v-card-actions> -->
      </v-card>
      <v-card-actions class="ma-0 mt-1 pa-0 px-7">
        <v-spacer />
        <v-btn  class="ma-0 px-1 pa-0 elevation-0" style="font-size:10px;height:fit-content;width:fit-content;border-radius:0;" v-on:click="invite(ledger)">邀請</v-btn>
        <v-btn class="ma-0 px-1 pa-0 elevation-0" style="font-size:10px;height:fit-content;width:fit-content;border-left:1px solid white;border-radius:0;" v-on:click="leave(ledger._id)">剔除</v-btn>
      </v-card-actions>
    </v-flex>
    </v-row>

</template>

<script>
export default {
  name: "ledgerEngage",
  inject: ["$alert", "$confirm", "$notification"],
  data: () => ({
  }),
  created(){

  },
  props: ["engageLedgers",],
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
        
    },
  }
}
</script>