<template>
    <v-row v-if="loading">
      <v-flex xs6 sm3 md3 v-for="item in 6" :key="item" class="pa-2">
        <v-boilerplate class="md-6" type=" table-heading,list-item-three-line"></v-boilerplate>
      </v-flex>
    </v-row>
    <v-row v-else>
    <v-flex xs6 sm3 md3 v-for="ledger of adminLedgers" :key="ledger._id" class="pa-2">
      <v-card elevation="2" style="border-radius:2em">
      <v-card class="pr-8 pl-8 pt-2 pb-2" style="background-color:#08112c">
        <v-img  src="../assets/fronter/account/planet2.png" ba></v-img>
        <v-card-title style="position:absolute;left:0;bottom:0;" class="pa-0 ma-0 ml-3"> {{ledger.ledgerName}}</v-card-title>
      </v-card>
        <v-card-text>帳本人數: {{ledger.users.length}}</v-card-text>
        <v-flex class="px-4">
          <v-avatar
            v-for="user of ledger.users"
            :key="ledger._id + user._id"
            size="25"
            class="elevation-2 ma-2"
          >
            <img :src="user.photo" />
          </v-avatar>
        </v-flex>
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
    </v-flex>
    </v-row>

</template>

<script>
export default {
    props: ["adminLedgers",],
}
</script>