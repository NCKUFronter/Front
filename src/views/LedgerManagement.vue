<template>
  <v-row>
    <!-- <v-row> -->
      <v-flex xs12 sm12 md12 >
        <v-card flat >
          <div class="title">
          <v-card-title>你管理的帳本</v-card-title>
          </div>
        </v-card>
      </v-flex>
      <v-flex xs6 sm4 md4 v-for="(card,idx) in adminLedger" :key="idx" class="card">
        <v-card outlined>
          <v-card-title>{{card.ledgerName}}</v-card-title>
          <v-card-text>帳本人數: {{card.userNumber}}</v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn icon v-on:click="invite(card.id,card.ledgerName)">
              <v-icon>mdi-account-multiple-plus</v-icon>
            </v-btn>
            <v-btn icon v-on:click="out(card.user,card.id,card.name)">
              <v-icon>mdi-account-multiple-minus</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <!-- <v-flex xs6 sm4 md4class="card">
        <v-card outlined>
          <v-card-title>新增樣本</v-card-title>

        </v-card>
      </v-flex> -->
      
    <!-- </v-row> -->

    <!-- <v-row> -->
      <v-flex xs12 sm12 md12>
        <v-card flat >
          <div class="title">
          <v-card-title>你參與的帳本</v-card-title>
          </div>
        </v-card>
      </v-flex>
      <v-flex xs6 sm4 md4 v-for="(card,idx) in engageLedger" :key="idx" class="card">
        <v-card outlined>
          <v-card-title>{{card.ledgerName}}</v-card-title>
          <v-card-text>帳本人數: {{card.userNumber}}</v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn icon v-on:click="invite(card.id,card.ledgerName)">
              <v-icon>mdi-account-multiple-plus</v-icon>
            </v-btn>
            <v-btn icon v-on:click="leave(card.id)">
              <v-icon>mdi-account-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <!-- invite -->
      
        <v-card class="modal" v-if="inviteModal" color="#fff7d3">
          <v-card-title >{{inviteLedger}}</v-card-title>
          <v-text-field
            v-model="inputEmail"
            label="請輸入邀請者email"
            class="pa-4"
          ></v-text-field>
          <v-card-actions>
            <v-spacer/>
            <v-btn class="button" v-on:click="confirmInvite()">邀請</v-btn>
            <v-btn class="button" v-on:click="inviteModal=!inviteModal">取消</v-btn>
          </v-card-actions>
        </v-card>
      

      <!-- 踢人out -->
      
        <v-card class="modal" v-if="outModal"  color="#fff7d3">
          <v-card-title>帳本名</v-card-title>
          <v-card-text>剔除使用者</v-card-text>
          <v-select
            :items="user"
            v-model="outUser"
            label="選擇要離開的人"
            outlined
            item-text="userName"
            item-value="userId"
            class="pa-4"
          ></v-select>
          <v-card-actions>
            <v-spacer/>
            <v-btn class="button" v-on:click="confirmOut()">刪除</v-btn>
            <v-btn class="button" v-on:click="outModal=!outModal">取消</v-btn>
          </v-card-actions>
        </v-card>
      

    <!-- </v-row> -->
  </v-row>  
</template>
<script>
import { confirmed } from 'vee-validate/dist/rules';
export default {
  data: () => ({
    
    adminLedger:[],
    engageLedger:[],

    inviteModal:false,
    inviteLedger:'',
    inviteLedgerId:null,
    inputEmail:'',

    outModal:false,
    user:[],
    outUser:[],
    outLedger:'',
    outLedgerId:null,

  }),
  created(){
    var userId="-1"

    this.$http.get('/user/profile').then((res) => {
      userId=res.data._id
      return this.$http.get('/user/ledgers',{params: {_many: ["users"]}})
    }).then((res) => {
      res.data.forEach(element => {
        if(element.adminId==userId){
          this.adminLedger.push({id:element._id,ledgerName:element.name,userNumber:(element.userIds.length+1),user:element.users})
          
        }else{
          this.engageLedger.push({id:element._id,ledgerName:element.name,userNumber:(element.userIds.length+1),user:element.users})
          
        }
      });
    })
  },
  methods: {
    invite(id,name){
      console.log('invite')
      this.inviteModal=true;
      this.inviteLedger=name;
      this.inviteLedgerId=id;
    },

    confirmInvite(){
      console.log(this.inputEmail)
      if(confirm("確認邀請?")){
        this.$http.post('/invitation/invite',{ledgerId:this.inviteLedgerId,email:this.inputEmail}).then((res) => {
          console.log(res.data)
        }).catch(console.log)
      }
    },


    leave(id){
      if(confirm("確認離開帳本?")){
        console.log(id)
        this.$http.post('/ledger/'+id+'/leave').then((res) => {
          console.log(res.data)
        }).catch(console.log)
      }
    },

    out(userList,id,name){
      this.outModal=true;
      this.outLedger=name;
      userList.forEach(element => {
        this.user.push({userId:element._id,userName:element.name})
      });
      this.outLedgerId=id;
    },

    confirmOut(){
      console.log(this.outUser)
      if(confirm("確認剔除?")){
        this.outUser.forEach(element => {
          console.log(element)
          this.$http.post('/ledger/'+this.outLedgerId+'/leave'+element).then((res) => {
            console.log(res.data)
          }).catch(console.log)
        });
      }
    }

    
  }
};
</script>

<style scoped>
.card{
  padding: 5px;
}
.title{
  border-bottom: #cccccc 2px solid;
  margin: 5px;
}
.button{
  margin: 5px;
}

.modal{
  position: fixed;
  /* margin: auto; */
  top: 40%;
  left: 40%;
  height: fit-content;
  width: 300px;
  padding: 10px;
}
</style>