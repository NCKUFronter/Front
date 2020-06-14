<template>
  <v-container class="ledger" fluid style="padding: 70px 50px 10px 50px;height:100vh;overflow:hidden" >
    <div v-if="$vuetify.breakpoint.smAndUp" style="height:70px"></div>
    <v-row>
    <v-card-title class="ma-0 pa-0" >帳本管理</v-card-title>
    <v-tabs v-model="tab" class="ma-0">
      <v-tab class="pl-0">你管理的帳本</v-tab>
      <v-tab>你參與的帳本</v-tab>
      <v-tab>邀請你的帳本</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="pt-4">
      <v-tab-item><LedgerAdmin :adminLedgers="adminLedgers" @update="update()" /></v-tab-item>
      <v-tab-item><LedgerEngage :engageLedgers="engageLedgers" @update="update()"/></v-tab-item>
      <v-tab-item><LedgerInvited :invitations="invitations" @update="update()" /></v-tab-item>
    </v-tabs-items>

    </v-row>
  </v-container>
</template>

<script>
import LedgerAdmin from "../components/LedgerAdmin.vue";
import LedgerEngage from "../components/LedgerEngage.vue";
import LedgerInvited from "../components/LedgerInvited.vue";
import { confirmed } from "vee-validate/dist/rules";
import { ignoreNotLoginError } from "../utils";
export default {
  name: "point-manage",
  inject: ["$alert", "$confirm", "$notification"],
  data() {
    return {
      tab: null,
      admin:true,
      adminLedgers: [],
      engageLedgers: [],

    };
  },
  components:{
    LedgerAdmin,
    LedgerEngage,
    LedgerInvited,
  },
  asyncComputed: {
    ledgerFetch: {
      get() {
        return this.$http
          .get("/user/ledgers", {
            params: { _many: ["users","invitees"] }
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
          .get("user/invitations", { params: { _one: ["ledger", "fromUser","ledger.users"] } })
          .then(res => res.data);
      },
      default: [],
    }
  },
  methods:{
    update() {
      this.$asyncComputed.ledgerFetch.update();
      this.$asyncComputed.invitations.update();
    },
  }

};
</script>
<style>
.ledger .v-tabs:not(.v-tabs--vertical):not(.v-tabs--right) > .v-slide-group--is-overflowing.v-tabs-bar--is-mobile:not(.v-tabs-bar--show-arrows):not(.v-slide-group--has-affixes) .v-slide-group__prev{
  display: none;
}

</style>
