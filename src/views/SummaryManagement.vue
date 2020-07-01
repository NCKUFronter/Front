<template>
  <v-container class="wrap-height" style="padding: 70px 0px 10px 30px;">
    <!-- <div class="d-xs-none" style="height:35px"></div> -->
    <v-card-title class="ma-0 pa-0">統計</v-card-title>
    <v-tabs v-model="tab" class="ma-0">
      <v-tab class="pl-0">個人紀錄</v-tab>
      <v-tab>帳本紀錄</v-tab>
      <v-tab>點數</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="pt-4">
        <v-tab-item>
          <SummaryContent :summary_type="'personal'" />
        </v-tab-item>
        <v-tab-item>
          <SummaryContent :summary_type="'ledger'" />
        </v-tab-item>
        <v-tab-item>
          <SummaryContent :summary_type="'points'" />
        </v-tab-item>
    </v-tabs-items>
    <!-- <SummaryContent :summary_type="types[tab]" /> -->
  </v-container>
</template>
<script>
import SummaryContent from "../components/Summary.vue";
export default {
  name: "summary-management",
  data() {
    return {
      types: ["personal", "ledger", "points"],
      tab: 0,
      ledgerOrderlist: [
        { value: "ledger", text: "帳本" },
        { value: "recordType", text: "收支" },
        { value: "user", text: "成員" },
        { value: "category", text: "類別" }
      ],
      personalOrderlist: [
        { value: "ledger", text: "帳本" },
        { value: "recordType", text: "收支" },
        { value: "category", text: "類別" }
      ],
      pointOrderlist: [
        { value: "ledger", text: "帳本" },
        { value: "recordType", text: "收支" },
        { value: "user", text: "成員" },
        { value: "category", text: "類別" }
      ]
    };
  },
  components: {
    SummaryContent
  }
};
</script>

<style>
.wrap-height {
  height: calc(100vh - 140px) !important;
}
</style>
