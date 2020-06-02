<template>
  <v-row class="ma-0 pb-8">
    <v-flex xs12 sm12 md12>
      <v-card flat>
        <div class="title">
          <v-card-title>
            <v-icon class="mr-2">mdi-book-account</v-icon>你管理的帳本
            <v-spacer />
            <v-icon @click="createModal=true">mdi-book-plus-multiple-outline</v-icon>
          </v-card-title>
        </div>
      </v-card>
    </v-flex>

    <v-flex xs12 sm6 md4 v-for="ledger of adminLedgers" :key="ledger._id" class="pa-2">
      <v-card outlined elevation="2">
        <v-card-title>
          <v-icon class="mr-2">mdi-book</v-icon>
          {{ledger.ledgerName}}
        </v-card-title>
        <v-card-text>帳本人數: {{ledger.users.length}}</v-card-text>
        <v-flex class="px-4">
          <v-avatar
            v-for="user of ledger.users"
            :key="ledger._id + user._id"
            size="36"
            class="elevation-2 mr-2"
          >
            <img :src="user.photo" />
          </v-avatar>
        </v-flex>
        <v-card-actions>
          <v-spacer />
          <v-btn icon v-on:click="invite(ledger)">
            <v-icon>mdi-account-multiple-plus</v-icon>
          </v-btn>
          <v-btn icon v-on:click="out(ledger)">
            <v-icon>mdi-account-multiple-minus</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex xs12 sm12 md12>
      <v-card flat>
        <div class="title">
          <v-card-title>
            <v-icon class="mr-2">mdi-book-multiple</v-icon>你參與的帳本
          </v-card-title>
        </div>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 md4 v-for="ledger of engageLedgers" :key="ledger._id" class="pa-2">
      <v-card outlined elevation="2">
        <v-card-title>
          <v-icon class="mr-2">mdi-book</v-icon>
          {{ledger.ledgerName}}
        </v-card-title>
        <v-card-text>帳本人數: {{ledger.users.length}}</v-card-text>
        <v-flex class="px-4">
          <v-avatar
            v-for="user of ledger.users"
            :key="ledger._id + user._id"
            size="36"
            class="elevation-2 mr-2"
          >
            <img :src="user.photo" />
          </v-avatar>
        </v-flex>
        <v-card-actions>
          <v-spacer />
          <v-btn icon v-on:click="invite(ledger)">
            <v-icon>mdi-account-multiple-plus</v-icon>
          </v-btn>
          <v-btn icon v-on:click="leave(ledger._id)">
            <v-icon>mdi-account-arrow-right</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex xs12 sm12 md12>
      <v-card flat>
        <div class="title">
          <v-card-title>
            <v-icon class="mr-2">mdi-book-search</v-icon>邀請你的帳本
          </v-card-title>
        </div>
      </v-card>
    </v-flex>
    <v-flex
      xs12
      sm6
      md4
      v-for="invitation in invitations"
      :key="'invite'+invitation._id"
      class="pa-2"
    >
      <v-card outlined elevation="2">
        <v-card-title>
          <v-icon class="mr-2">mdi-book</v-icon>
          {{invitation.ledger.ledgerName}}
        </v-card-title>
        <v-card-text>
          邀請人: {{ invitation.fromUser.name }}
          <v-avatar size="36" class="ml-2 elevation-2">
            <img :src="invitation.fromUser.photo" />
          </v-avatar>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn v-on:click="answerInvitation(invitation._id, true)">加入</v-btn>
          <v-btn v-on:click="answerInvitation(invitation._id, false)">拒絕</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <!-- 建立ledge model -->
    <v-dialog v-model="createModal" width="unset">
      <v-card class="modal" color="#fff7d3" v-if="createModal">
        <v-card-title>新建帳本</v-card-title>
        <v-text-field v-model="newLedgerName" label="請輸入帳本名稱" class="px-4"></v-text-field>
        <v-card-actions>
          <v-spacer />
          <v-btn class="button" @click="createLedger">新增</v-btn>
          <v-btn class="button" @click="createModal=false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
  name: "ledgerManagement",
  inject: ["$alert", "$confirm", "$notification"],
  data() {
    return {
      adminLedgers: [],
      engageLedgers: [],

      inviteModal: false,
      inviteLedger: null,
      inputEmail: "",

      outModal: false,
      outUser: "",
      outLedger: null,

      createModal: false,
      newLedgerName: ""
    };
  },
  asyncComputed: {
    ledgerFetch: {
      get() {
        return this.$http
          .get("/user/ledgers", {
            params: { _many: ["users"] }
          })
          .then(res => {
            this.engageLedgers = [];
            this.adminLedgers = [];
            for (const ledger of res.data) {
              if (ledger.adminId === this.$api.user.profile._id) {
                this.adminLedgers.push(ledger);
              } else this.engageLedgers.push(ledger);
            }
          });
      },
    },
    invitations: {
      get() {
        return this.$http
          .get("user/invitations", { params: { _one: ["ledger", "fromUser"] } })
          .then(res => res.data);
      },
      default: [],
    }
  },
  methods: {
    update() {
      this.$asyncComputed.ledgerFetch.update();
      this.$asyncComputed.invitations.update();
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

    // leave ledger
    leave(id) {
      this.$confirm.open("確認離開帳本?", () => {
        this.$http
          .post(`/ledger/${id}/leave`)
          .then(res => {
            this.update();
            this.$alert.success("成功離開帳本");
            // console.log(res.data);
          })
          .catch(ignoreNotLoginError)
          .catch(err => {
            console.log(err);
            this.$alert.error("離開帳本失敗");
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
            this.update();
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

    // answer invitation
    answerInvitation(id, answer) {
      this.$http
        .put(`/invitation/${id}/answer`, { answer })
        .then(res => {
          this.update();
          this.$alert.success("回應成功");
        })
        .catch(ignoreNotLoginError)
        .catch(err => {
          console.log(err);
          this.$alert.error("回應失敗");
        });
    },

    createLedger() {
      this.$confirm.open(`確認新增 "${this.newLedgerName}"?`, () => {
        this.$http
          .post("/ledger", { ledgerName: this.newLedgerName })
          .then(res => {
            this.createModal = false;
            this.update();
            this.newLedgerName = "";
            this.$alert.success("新增成功");
          })
          .catch(ignoreNotLoginError)
          .catch(err => {
            console.log(err)
            this.$alert.error("新增失敗");
          });
      });
    }
  }
};
</script>

<style scoped>
.card {
  padding: 5px;
}
.title {
  border-bottom: #cccccc 2px solid;
  margin: 5px;
  
}
.button {
  margin: 5px;
}

.modal {
  /* margin: auto; */
  width: 300px;
  padding: 10px;
}
</style>
