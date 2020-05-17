<template>
  <v-card flat>
    <v-row>
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
    <v-skeleton-loader type="table" v-if="loading"></v-skeleton-loader>
    <v-data-table
      :items-per-page="25"
      :headers="headers"
      :items="filterHistory"
      :search="search"
      no-data-text="無點數紀錄"
      sort-by="time"
      sort-desc
      v-else
    >
      <template v-slot:item.activity="{item}">{{ pointDescription(item) }}</template>
      <template v-slot:item.time="{item}">{{ item.time | getLocaleDate }}</template>
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
        {
          text: "Activity",
          align: "start",
          sortable: false,
          value: "activity"
        },
        { text: "Point", value: "amount", sortable: true },
        { text: "Type", value: "type", sortable: false },
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
<style  scoped>
.selector {
  position: relative;
  top: 19px;
  margin: 5px 20px;
}
.search {
  margin: 5px 20px;
}
</style>
