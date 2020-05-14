<template>
  <v-card outlined>
    <v-card-title>{{ledger.ledgerName}}</v-card-title>
    <v-card-text>帳本人數: {{ledger.users.length}}</v-card-text>
    <v-flex>
      <v-avatar v-for="user of ledger.users" :key="ledger._id + user._id" size="36">
        <img :src="user.photo" />
      </v-avatar>
    </v-flex>
    <v-card-actions>
      <v-spacer />
      <v-btn icon v-on:click="invite(ledger._id, ledger.ledgerName)">
        <v-icon>mdi-account-multiple-plus</v-icon>
      </v-btn>
      <v-btn icon v-on:click="out(ledger.users ,ledger._id, ledger.ledgerName)">
        <v-icon>mdi-account-multiple-minus</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ledger-card",
  props: {
    ledger: {
      type: Object,
      required: true
    }
  }
};
</script>
