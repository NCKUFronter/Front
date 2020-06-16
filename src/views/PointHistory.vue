<template>
  <v-card flat style="padding: 8% 5% 0% 2%;background-color:#26282d">
    <v-row class="pointSearch">
      <v-flex xs6 sm2 md2 offset-6>
        <v-select v-model="typeSelected" :items="type" label="Type" class="selector" dense></v-select>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs6 sm4 md4>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          no-results-text
          class="search"
        ></v-text-field>
      </v-flex>
    </v-row>
    <v-skeleton-loader v-if="loading"></v-skeleton-loader>
    <v-data-table
      :items-per-page="10"
      :headers="headers"
      :items="filterHistory"
      :search="search"
      no-data-text="無點數紀錄"
      sort-by="time"
      sort-desc
      class="pointHistory"
      v-else
    >
      <template v-slot:item.activity="{item}" style="overflow:hidden;">
        <v-icon class="ma-4">{{typeIcon(item)}}</v-icon>
        {{ pointDescription(item) }}
      </template>
      <template v-slot:item.time="{item}" style="overflow:hidden;">{{ item.time | getLocaleDate }}</template>
    </v-data-table>
  </v-card>
</template>

<script>
import { getLocaleDate, newPointSubtypeName } from "../utils";

export default {
  data() {
    return {
      search: "",
      headers: [
        // { text: "", value: "type", sortable: false },
        {
          text: "Activity",
          align: "start",
          sortable: false,
          value: "activity"
        },
        { text: "Point", value: "amount", sortable: true },
        { text: "Time", value: "time", sortable: true }
      ],
      history: [],
      type: ["ALL", "new", "transfer", "consume"],
      typeSelected: "ALL",
      loading: true
    };
  },
  filters: { getLocaleDate },
  methods: {
    pointDescription(item) {
      switch (item.type) {
        case "new":
          return newPointSubtypeName(item.subtype);
        case "transfer":
          //轉出
          if (item.fromUserId === this.userId)
            return `轉出點數給${item.toUser.name}`;
          //轉入
          else return `由${item.fromUser.name}轉入點數`;
        case "consume":
          return `購買商品: ${item.toGoods.name} × ${item.quantity}`;
      }
      return "unknown";
    },
    typeIcon(item) {
      switch (item.type) {
        case "new":
          return `mdi-new-box`;
        case "transfer":
          return `mdi-debug-step-over`;
        case "consume":
          return `mdi-basket-outline`;
      }
    }
  },
  computed: {
    userId() {
      return this.$api.user.profile._id;
    },
    filterHistory() {
      return this.typeSelected != "ALL"
        ? this.activities.filter(item => item.type === this.typeSelected)
        : this.activities;
    }
  },
  asyncComputed: {
    activities: {
      get() {
        return this.$http
          .get("/user/pointActivities", {
            params: { _one: ["fromUser", "toUser", "fromRecord", "toGoods"] }
          })
          .then(res => {
            this.loading = false;
            return res.data;
          });
      },
      default: []
    }
  }
};
</script>
<style>
.pointSearch .selector {
  position: relative;
  top: 19px;
  margin: 5px 20px;
}
.pointSearch .search {
  margin: 5px 20px;
}
.pointHistory .v-data-table-header {
  background-color: rgba(255, 255, 255, 0.2);
}
.pointHistory tbody tr:not(:last-child) td:not(.v-data-table__mobile-row) {
  border: none !important;
}
.pointHistory.v-data-table th:nth-child(1) {
  border-top-left-radius: 5px;
}
.pointHistory.v-data-table th:nth-child(3) {
  border-top-right-radius: 5px;
}
</style>
