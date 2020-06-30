<template>
  <v-container fluid class="scroll" style="width:100vw;height:100vh;">
    <v-row style="padding-bottom:50vh">
      <v-flex xs12 sm4 md3 v-for="ledger of engageLedgers" :key="ledger._id" class="pa-2">
        <v-card flat style="border-radius:2em">
          <v-card flat style="background-color:#08112c;position: relative">
            <!-- <v-img  src="../assets/fronter/account/planet2.png" ></v-img> -->
            <v-img
              v-if="!ledger.photo"
              src="../assets/fronter/account/planet3.png"
              sizes="50%"
              height="180px"
            ></v-img>
            <v-img
              v-else-if="ledger.photo.substring(0,5)=='https'"
              :src="ledger.photo"
              sizes="50%"
              height="180px"
            ></v-img>
            <v-img v-else :src="baseURL+ledger.photo" sizes="50%" height="180px"></v-img>
            <v-card-title
              style="position:absolute;left:0;bottom:0;font-size:18px"
              class="pa-0 ma-0 ml-3"
            >{{ledger.ledgerName}}</v-card-title>
          </v-card>
          <div style="background-color:#0c193f">
            <v-card-text
              class="pa-0 ma-0 ml-3 pt-1"
              style="font-size:12px"
            >帳本人數: {{ledger.users.length}}</v-card-text>
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
                <v-avatar
                  size="22"
                  class="ma-1"
                  style="background-color:#26282d;position: absolute;left:10px"
                ></v-avatar>
                <v-avatar
                  size="22"
                  class="ma-1"
                  style="background-color:#32343e;position: absolute;left:5px"
                ></v-avatar>
                <v-avatar
                  size="22"
                  class="ma-1"
                  style="background-color:#3d404e;;position: absolute;font-size:0.5em"
                >+{{ledger.users.length-4}}</v-avatar>
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
          </v-card-actions>-->
        </v-card>
        <v-card-actions class="ma-0 mt-1 pa-0 px-7">
          <v-spacer />
          <v-btn
            class="ma-0 px-1 pa-0 elevation-0"
            style="font-size:12px;height:fit-content;width:fit-content;border-radius:0;"
            v-on:click="invite(ledger)"
          >邀請</v-btn>
          <v-btn
            class="ma-0 px-1 pa-0 elevation-0"
            style="font-size:12px;height:fit-content;width:fit-content;border-left:1px solid white;border-radius:0;"
            v-on:click="leave(ledger._id)"
          >離開</v-btn>
        </v-card-actions>
      </v-flex>
      <!-- 邀請modal -->
      <v-dialog v-model="inviteModal" width="unset">
        <v-card class="modal" color="#3D404E" v-if="inviteModal">
          <v-card-title>{{inviteLedger.ledgerName}}</v-card-title>
          <v-text-field v-model="inputEmail" label="請輸入邀請者email" type="email" class="px-4"></v-text-field>
          <v-card-actions>
            <v-spacer />
            <v-btn class="button" outlined v-on:click="confirmInvite()">邀請</v-btn>
            <v-btn class="button" outlined v-on:click="inviteModal=!inviteModal">取消</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { confirmed } from "vee-validate/dist/rules";
import { ignoreNotLoginError } from "../utils";
export default {
  name: "ledgerEngage",
  inject: ["$alert", "$confirm", "$notification"],
  data: () => ({
    inviteModal: false,
    inviteLedger: null,
    inputEmail: ""
  }),
  created() {},
  props: ["engageLedgers"],
  methods: {
    ledgerUser(user) {
      // console.log(user.length)
      if (user.length <= 6) {
        return user;
      } else {
        var shortlist = [];
        for (var i = 0; i < 4; i++) {
          shortlist.push(user[i]);
        }
        return shortlist;
        // return user.splice(0,3)
      }
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
    // leave ledger
    leave(id) {
      this.$confirm.open("確認離開帳本?", () => {
        this.$http
          .post(`/ledger/${id}/leave`)
          .then(res => {
            // this.update();
            this.$emit("update");
            this.$alert.success("成功離開帳本");
            // console.log(res.data);
          })
          .catch(ignoreNotLoginError)
          .catch(err => {
            console.log(err);
            console.log(id);
            this.$alert.error("離開帳本失敗");
          });
      });
    }
  }
};
</script>
<style scoped>
.v-btn:not(.v-btn--round).v-size--default {
  min-width: 5px;
}
</style>