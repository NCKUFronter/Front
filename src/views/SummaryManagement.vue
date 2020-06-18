<template>
  <v-container class="ledger" fluid style="padding: 70px 50px 10px 50px;height:100vh;overflow:hidden" >
    <div v-if="$vuetify.breakpoint.smAndUp" style="height:70px"></div>
    <v-row>
    <v-card-title class="ma-0 pa-0" >統計</v-card-title>
    <v-tabs v-model="tab" class="ma-0">
      <v-tab class="pl-0">個人紀錄</v-tab>
      <v-tab>帳本紀錄</v-tab>
      <v-tab>點數</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="pt-4">
      <v-tab-item><SummaryContent toggle_exclusive_perspective="personal" /></v-tab-item>
      <v-tab-item><SummaryContent toggle_exclusive_perspective="ledger" /></v-tab-item>
      <v-tab-item><SummaryContent toggle_exclusive_perspective="points" /></v-tab-item>
    </v-tabs-items>
    </v-row>
  </v-container>
</template>
<script>
import SummaryContent from "../components/Summary.vue";
export default {
    name: "summary-management",
    data(){
        return{
            tab: null,
        };
    },
    components:{
        SummaryContent,
    },
}
</script>