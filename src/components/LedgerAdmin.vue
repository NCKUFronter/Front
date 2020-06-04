<template>
    <v-row >
    <v-flex xs6 sm3 md3 v-for="ledger of adminLedgers" :key="'admin_'+ledger._id" class="pa-3">
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
    <!-- 邀請modal -->
    <v-dialog v-model="inviteModal" width="unset">
      <v-card class="modal" color="#fff7d3" v-if="inviteModal">
        <v-card-title>{{inviteLedger.ledgerName}}</v-card-title>
        <v-text-field v-model="inputEmail" label="請輸入邀請者email" type="email" class="px-4"></v-text-field>
        <v-card-actions>
          <v-spacer />
          <v-btn class="button" v-on:click="confirmInvite()">邀請</v-btn>
          <v-btn class="button" v-on:click="inviteModal=!inviteModal">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 踢人out -->
    <v-dialog persistent v-model="outModal" width="unset">
      <v-card class="modal" color="#fff7d3" v-if="outModal">
        <v-card-title>剔除使用者</v-card-title>
        <v-card-text>帳本名: {{outLedger.ledgerName}}</v-card-text>
        <v-select
          :items="notAdminUsers(outLedger)"
          v-model="outUser"
          label="選擇要離開的人"
          outlined
          item-text="name"
          item-value="_id"
          class="px-4"
        ></v-select>
        <v-card-actions>
          <v-spacer />
          <v-btn class="button" v-on:click="confirmOut()">刪除</v-btn>
          <v-btn class="button" v-on:click="outModal=!outModal">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-row>

</template>

<script>
import { confirmed } from "vee-validate/dist/rules";
import { ignoreNotLoginError } from "../utils";
export default {
  name: "ledgerAdmin",
  inject: ["$alert", "$confirm", "$notification"],
  data: () => ({
      inviteModal: false,
      inviteLedger: null,
      inputEmail: "",

      outModal: false,
      outUser: "",
      outLedger: null,
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
        
    },
    notAdminUsers(ledger) {
      return ledger.users.filter(user => user._id !== ledger.adminId);
    },
    invite(ledger) {
      this.inviteLedger = ledger;
      this.inviteModal = true;
    },
      confirmInvite() {
      // console.log(this.inputEmail);
      this.$confirm.open("確認邀請?", () => {
        this.$http
          .post("/invitation/invite", {
            ledgerId: this.inviteLedger._id,
            email: this.inputEmail
          })
          .then(res => {
            this.$alert.success("成功發出邀請");
            this.inviteModal = false;
            // console.log(res.data);
          })
          .catch(ignoreNotLoginError)
          .catch(err => {
            console.log(err);
            if (err.response.status === 400) {
              this.$alert.error("無此使用者，無法發出邀請");
            } else this.$alert.error("邀請失敗");
          });
      });
    },
    out(ledger) {
      this.outModal = true;
      this.outLedger = ledger;
    },
    confirmOut() {
      this.$confirm.open("確認剔除?", () => {
        this.$http
          .post(`/ledger/${this.outLedger._id}/leave/${this.outUser}`)
          .then(res => {
            // this.update();
            this.$emit("update");
            this.$alert.success("成功剔除使用者");
            this.outModal = false;
            // console.log(res.data);
          })
          .catch(ignoreNotLoginError)
          .catch(err => {
            console.log(err);
            this.$alert.error("剔除失敗");
          });
      });
    },
  }
}
</script>
<style scoped>
.v-btn:not(.v-btn--round).v-size--default{
    min-width: 5px;
}
</style>