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
      userId: this.$api.profile._id,
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
  created() {
    /*
    var myID = "-1";
    this.$http.get("/user/profile").then(res => {
      myID = res.data._id;
    });
    this.$http
      .get("/user/pointActivities", {
        params: { _one: ["fromUser", "toUser", "fromRecord", "toGoods"] }
      })
      .then(res => {
        res.data.forEach(element => {
          let detail = "Other";
          //Activity命名
          if (element.type == "transfer") {
            //轉移
            if (element.fromUserId == myID) {
              //轉出
              detail = "轉出點數給" + element.toUser.name;
            } else if (element.toUserId == myID) {
              //轉入
              detail = "由" + element.fromUser.name + "轉入點數";
            } else {
              detail = "TransferOther";
            }
          } else if (element.type == "consume") {
            //購買
            detail =
              "購買商品: " + element.toGoods.name + "×" + element.quantity;
          } else if (element.type == "new") {
            //新增
            if (element.subtype == "record") {
              detail = "帳目紀錄:";
              // element.fromRecord.hashtag.forEach(element => {
              //   detail+=(' '+element.)
              // });
            } else if (element.subtype == "sinoPac") {
              detail = "永豐紀錄:";
              // element.fromRecord.hashtag.forEach(element => {
              //   detail+=(' '+element)
              // });
            } else if (element.subtype == "perLogin") {
              detail = "登入點數";
            } else if (element.subtype == "continueLogin") {
              detail = "連續登入點數";
            } else {
              detail = "NewOther";
            }
          }
          this.history.push({
            activity: detail,
            point: element.amount,
            type: element.type,
            time: element.time.substr(0, 10)
          });
          this.loading = false;
        });
      });
    */
  },
  filters: { getLocaleDate },
  methods: {
    pointDescription(item) {
      switch (item.type) {
        case "new":
          return newPointSubtypeName(item.subtype);
        case "transfer":
          //轉出
          if (item.fromUserId === this.$api.profile._id)
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
