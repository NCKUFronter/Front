<template>
  <v-container fluid class="scroll" style="width:100vw;height:100vh;">
    <v-row style="padding-bottom:50vh">
      <v-flex
        xs12
        sm4
        md3
        v-for="invitation in invitations"
        :key="'invite'+invitation._id"
        class="pa-2"
      >
        <v-card flat style="border-radius:2em">
          <v-card flat style="background-color:#08112c;position: relative">
            <!-- <v-img  src="../assets/fronter/account/planet2.png" ></v-img> -->
            <v-img
              v-if="!invitation.ledger.photo"
              src="../assets/fronter/account/planet3.png"
              sizes="50%"
              height="180px"
            ></v-img>
            <v-img
              v-else-if="invitation.ledger.photo.substring(0,5)=='https'"
              :src="invitation.ledger.photo"
              sizes="50%"
              height="180px"
            ></v-img>
            <v-img v-else :src="baseURL+invitation.ledger.photo" sizes="50%" height="180px"></v-img>
            <v-card-title
              style="position:absolute;left:0;bottom:0;font-size:18px"
              class="pa-0 ma-0 ml-3"
            >{{invitation.ledger.ledgerName}}</v-card-title>
          </v-card>
          <div style="background-color:#0c193f;">
            <v-card-text
              class="pa-0 ma-0 ml-3 pt-1"
              style="font-size:12px"
            >帳本人數: {{invitation.ledger.users.length}}</v-card-text>
            <v-flex class="px-4 pb-2">
              <v-avatar
                v-for="(user,index) in ledgerUser(invitation.ledger.users)"
                :key="index"
                size="22"
                class="ma-1"
                style="background-color:#3d404e"
              >
                <img :src="user.photo" />
              </v-avatar>
              <div v-if="invitation.ledger.users.length>6" style="position:relative;display:inline">
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
                >+{{invitation.ledger.users.length-4}}</v-avatar>
              </div>
            </v-flex>
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
          <v-card-text class="pa-0 ma-0" style="font-size:12px">{{ invitation.fromUser.name }}邀請了你</v-card-text>
          <v-spacer />
          <v-btn
            class="ma-0 px-1 pa-0 elevation-0"
            style="font-size:12px;height:fit-content;width:fit-content;border-radius:0;"
            v-on:click="answerInvitation(invitation._id, true)"
          >加入</v-btn>
          <v-btn
            class="ma-0 px-1 pa-0 elevation-0"
            style="font-size:12px;height:fit-content;width:fit-content;border-left:1px solid white;border-radius:0;"
            v-on:click="answerInvitation(invitation._id, false)"
          >拒絕</v-btn>
        </v-card-actions>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
import { confirmed } from "vee-validate/dist/rules";
import { ignoreNotLoginError } from "../utils";
export default {
  name: "ledgerInvited",
  inject: ["$alert", "$confirm", "$notification"],
  data: () => ({}),
  created() {
    console.log(this.invitations);
  },
  props: ["invitations"],
  // asyncComputed: {
  //   ledgerOtherUser:{
  //     get() {
  //       return this.$http
  //         .get("/ledger/"+this.invitations.ledgerId, {
  //           params: { _many: ["users"] }
  //         })
  //         .then(res => res.data);
  //     },

  //   }
  // },
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
    answerInvitation(id, answer) {
      this.$http
        .put(`/invitation/${id}/answer`, { answer })
        .then(res => {
          //   this.update();
          this.$emit("update");
          this.$alert.success("回應成功");
        })
        .catch(ignoreNotLoginError)
        .catch(err => {
          console.log(err);
          this.$alert.error("回應失敗");
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