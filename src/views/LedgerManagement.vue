<template>
  <v-container fluid style="padding: 8% 5% 0% 2%;">
    <v-card-title class="ma-0 pa-0">帳本管理</v-card-title>
    <v-tabs v-model="tab">
      <v-tab class="pl-0">你管理的帳本</v-tab>
      <v-tab>你參與的帳本</v-tab>
      <v-tab>邀請你的帳本</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="pa-2 pt-8">
      <v-tab-item><LedgerAdmin :adminLedgers="adminLedgers"/></v-tab-item>
      <v-tab-item><LedgerEngage :engageLedgers="engageLedgers"/></v-tab-item>
      <v-tab-item><LedgerInvited :invitations="invitations" @update="update()" /></v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import LedgerAdmin from "../components/LedgerAdmin.vue";
import LedgerEngage from "../components/LedgerEngage.vue";
import LedgerInvited from "../components/LedgerInvited.vue";
export default {
  name: "point-manage",
  data() {
    return {
      tab: null,
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
  methods:{
    update() {
      this.$asyncComputed.ledgerFetch.update();
      this.$asyncComputed.invitations.update();
    },
  }

};
</script>
<style scoped>

</style>
