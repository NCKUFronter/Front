<template>
  <!-- ref: https://github.com/David-Desmaisons/Vue.D3.sunburst/tree/e3c61e84268861400116245ea8e9020e8113ea07 -->
  <v-container fluid class="ma-0 ">
    <!-- <div class="card-header">Sunburst</div>
    <div class="card-body father">-->
    <v-layout row>
      <v-flex xs0 sm2 md3 v-if="$vuetify.breakpoint.smAndUp">
        <v-card
          class="my-4"
          color="transparent"
          flat
          :class="$vuetify.breakpoint.smAndUp ? 'px-10' : ''"
        >
          <v-card-title style="display:inline">
            <v-icon class="mr-3">event</v-icon>時間區段
          </v-card-title>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="dateRangeText" readonly v-bind="attrs" v-on="on" class="mx-4"></v-text-field>
            </template>
            <v-date-picker v-model="date" @input="menu2 = false" type="month" range></v-date-picker>
          </v-menu>
        </v-card>
        <v-card color="transparent" flat :class="$vuetify.breakpoint.mdAndUp ? 'px-10' : ''">
          <v-card-title style="display:inline">
            <v-icon class="mr-3">mdi-order-bool-descending</v-icon>統計順序
          </v-card-title>
          <div
            v-for="(item,index) in this.sunburstOrder[this.summary_type].length"
            :key="index"
          >
            <v-select
              v-model="orderSelected[index]"
              :items="orderList"
              :label="(orderSelected[index]==undefined)?('Layer '+(index+1)):orderSelected[index]"
              hide-details
              no-data-text="please click RESET first"
              solo
              flat
              :prepend-inner-icon="(index==0) ?' ':'mdi-chevron-right'"
              full-width
              color="white"
              item-color="white"
              v-on:change="removeSelected(index)"
            ></v-select>
            <!-- v-on:change="removeSelected(index)" -->
          </div>
          <v-card-actions class="my-2">
            <v-spacer />
            <v-btn outlined @click="reset" color="#dddee2" style="font-weight:bold;">Reset</v-btn>
            <v-btn
              @click="calculate"
              color="#dddee2"
              style="font-weight:bold;color:#26282D"
            >Calculate</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 sm9 md9>
        <sunburst
          class="sunburst"
          :data="displayData"
          :minAngleDisplayed="minAngleDisplayed"
          :inAnimationDuration="inAnimationDuration"
          :outAnimationDuration="outAnimationDuration"
        >
          <!-- <template v-slot:menu> -->
          <!-- <v-row class="py-4" justify="center"> -->
          <!-- <v-btn-toggle v-model="summary_type" mandatory>
            <v-btn value="personal">個人</v-btn>
            <v-btn value="ledger">帳本</v-btn>
            <v-btn value="points">點數</v-btn>
          </v-btn-toggle>-->

          <!--v-flex xs6 sm3 md3>
            <v-card flat class="time" xs6 sm3 md3>
              <v-btn-toggle v-model="toggle_exclusive_time" mandatory>
                <v-btn value="year">年</v-btn>
                <v-btn value="month">月</v-btn>
                <v-btn value="week">週</v-btn>
              </v-btn-toggle>
            </v-card>
          </v-flex-->
          <!-- </v-row> -->
          <!-- </template> -->

          <template v-slot:head="{ nodes, colorGetter, width }">
            <breadcrumbTrail
              :current="nodes.mouseOver"
              :root="nodes.root"
              :colorGetter="colorGetter"
              :from="nodes.zoomed"
              :width="width"
              class="breadcrumbTrail"
            />
          </template>

          <template v-slot:legend="{ nodes, colorGetter, width }">
            <breadcrumbTrail
              :current="nodes.mouseOver"
              :root="nodes.root"
              :colorGetter="colorGetter"
              :from="nodes.zoomed"
              :width="width"
              class="breadcrumbTrail"
            />
          </template>

          <!--template v-slot:top="{ nodes }">
            <nodeInfoDisplayer
              :current="nodes.mouseOver"
              :root="nodes.root"
              :clicked="nodes.clicked"
              description="of selected"
            />
          </template-->

          <template v-slot="{ on, actions }">
            <highlightOnHover v-bind="{ on, actions }" />
            <zoomOnClick v-bind="{ on, actions }" />
          </template>

          <template v-slot:report="{ nodes }">
            <report slot="report" :nodes="nodes" />
          </template>
        </sunburst>
      </v-flex>

      <!-- for mobile -->
      <button
        v-if="$vuetify.breakpoint.xsOnly"
        @click.stop="setting = !setting"
        style="position:fixed;right:60px;top:75px;background-color:transparent;z-index:4;height:fit-content;width:fit-content;"
      >
        <transition name="fade">
          <img
            v-if="!setting"
            src="../assets/fronter/account/member_unclicked.svg"
            height="18px"
            style="position: absolute;"
          />
        </transition>
        <transition name="fade">
          <img
            v-if="setting"
            src="../assets/fronter/account/member_clicked.svg"
            height="18px"
            style="position: absolute;"
          />
        </transition>
      </button>
      <v-card
        flat
        min-height="85vh"
        style="position:fixed;top:15%;right:0%;border-radius:0;"
        :style="setting?'z-index:3;':'z-index:0'"
        class="scroll"
        color="transparent"
        v-if="$vuetify.breakpoint.xsOnly"
      >
        <v-navigation-drawer
          v-model="setting"
          hide-overlay
          style="border-top-left-radius:4em;width:220px;min-height:85vh;background-color:#3D404E;height:60vh"
          temporary
          right
          class="elevation-0 chart px-3"
        >
          <v-card class="my-4" color="transparent" flat style="padding-top:20%">
            <v-card-title style="display:inline;font-weight:bold">
              <v-icon class="mr-3">event</v-icon>時間區段
            </v-card-title>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateRangeText"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  class="mx-4"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" @input="menu2 = false" type="month" range></v-date-picker>
            </v-menu>
          </v-card>
          <v-card color="transparent" flat class="ma-0">
            <v-card-title class="py-0" style="font-weight:bold">
              <v-icon class="mr-3">mdi-order-bool-descending</v-icon>統計順序
            </v-card-title>
            <div
              v-for="(item,index) in this.sunburstOrder[this.summary_type].length"
              :key="index"
            >
              <v-select
                v-model="orderSelected[index]"
                :items="orderList"
                :label="(orderSelected[index]==undefined)?('Layer '+(index+1)):orderSelected[index]"
                hide-details
                no-data-text="please click RESET first"
                solo
                flat
                :prepend-inner-icon="(index==0) ?' ':'mdi-chevron-right'"
                full-width
                color="white"
                item-color="white"
                v-on:change="removeSelected(index)"
              ></v-select>
              <!-- v-on:change="removeSelected(index)" -->
            </div>
            <v-card-actions class="my-5">
              <v-spacer />
              <v-btn outlined @click="reset" color="#dddee2" style="font-weight:bold;">Reset</v-btn>
              <v-btn
                @click="calculate"
                color="#dddee2"
                style="font-weight:bold;color:#26282D"
              >Calculate</v-btn>
            </v-card-actions>
          </v-card>
        </v-navigation-drawer>
      </v-card>
      <!-- </div> -->
    </v-layout>
  </v-container>
</template>

<script>
import sunburst from "../components/Sunburst";
// import nodeInfoDisplayer from "../components/sunbrust/nodeInfoDisplayer";
// import breadcrumbTrail from "../components/sunbrust/breadcrumbTrail";
import report from "../components/Report";
//behaviours
// import highlightOnHover from "../components/behavior/highlightOnHover";
// import zoomOnClick from "../components/behavior/zoomOnClick";
import {
  // nodeInfoDisplayer,
  breadcrumbTrail,
  highlightOnHover,
  zoomOnClick
} from "vue-d3-sunburst";

import sumPersonal from "../data/sumPersonal.js";
import sumLedger from "../data/sumLedger.js";
import testData from "../data/temp.js";
import { SunburstTree } from "../utils/sunburst-tree";
import { summaryAddParent } from "../utils";

const categories = ["", "食物", "交通", "治裝", "娛樂"];
const example = new SunburstTree(
  "Ledger",
  testData,
  [
    { labelFn: item => item.recordType },
    { labelFn: item => categories[item.categoryId] },
    { labelFn: item => item.hashtags && item.hashtags[0] }
  ],
  item => item.money
);

export default {
  name: "app-summary",
  data() {
    const orderlist = {
        ledger: ["ledger", "user", "recordType", "category"],
        personal: ["recordType", "ledger", "category"],
        points: ["flow", "type", "subtype", "user"]
    }
    return {
      sumPersonal,
      sumLedger,
      example,
      minAngleDisplayed: 0.05, //設定角度多小的可被看見 if=0表全部都可被看見
      inAnimationDuration: 500, //動畫速度
      outAnimationDuration: 1000, //動畫速度
      // toggle_exclusive_perspective: "ledger",
      toggle_exclusive_time: "month",
      sunburstOrder: orderlist,
      orderSelected: [],
      orderList: [],
      date: [new Date().toISOString().substr(0, 7)],
      menu2: false,
      // sunburstJson:null,
      calculateList: orderlist[this.summary_type],
      startDate: null,
      endDate: null,
      setting: false
    };
  },
  inject: ["$alert"],
  props: {
    summary_type: {
      required: false,
      default: "personal"
    }
  },
  created() {
    this.orderSelected = [
      ...this.sunburstOrder[this.summary_type]
    ];
    /*
    this.calculateList = [
      ...this.sunburstOrder[this.summary_type]
    ];
    */
    var start = new Date(this.date[0]);
    this.startDate = new Date(
      start.getFullYear(),
      start.getMonth(),
      2
    ).toISOString();
    var end = new Date(this.date[0]);
    this.endDate = new Date(
      end.getFullYear(),
      end.getMonth() + 1,
      1
    ).toISOString();
    console.log(this.startDate);
    console.log(this.endDate);
  },
  computed: {
    dateRangeText() {
      this.sortDates();
      return this.date.join(" ~ ");
    },
    displayData() {
      return this.sunburstJson;
      /*
      if (this.toggle_exclusive_perspective == "ledger") {
        // return this.sumLedger;
        return this.sunburstJson;
      } else if (this.toggle_exclusive_perspective == "personal") {
        return this.sunburstJson;
      } else return this.example;
    */
    }
  },
  asyncComputed: {
    sunburstJson: {
      get() {
        return this.$http
          .get(`/statistic/${this.summary_type}`, {
            params: {
              order: this.calculateList,
              start: this.startDate,
              end: this.endDate
            }
          })
          .then(res => {
            const json = res.data;
            if(!json.children) return {};
            summaryAddParent(json);
            return json;
          })
          .catch(error => {
            console.error(error.response)
            console.error(error.request)
          });
      },
      default: {},
    }
  },
  methods: {
    sortDates() {
      this.date.sort();
    },
    removeSelected(idx) {
      console.log("remove");
      var i;
      for (i = 0; i < this.orderList.length; i++) {
        if (this.orderSelected[idx] == this.orderList[i]) {
          this.orderList.splice(i, 1);
        }
      }
    },
    reset() {
      this.orderList = [
        ...this.sunburstOrder[this.toggle_exclusive_perspective]
      ];
      this.orderSelected = [];
      (this.date = [new Date().toISOString().substr(0, 7)]),
        (this.calculateList = []);
      console.log(this.orderList);
    },
    calculate() {
      var i;
      var empty = false;
      for (
        i = 0;
        i < this.sunburstOrder[this.toggle_exclusive_perspective].length;
        i++
      ) {
        if (this.orderSelected[i] == undefined) {
          empty = true;
          break;
        }
      }
      if (!empty) {
        var start = new Date(this.date[0]);
        this.startDate = new Date(
          start.getFullYear(),
          start.getMonth(),
          2
        ).toISOString();
        var end;
        if (this.date[1] == undefined) {
          end = new Date(this.date[0]);
        } else {
          end = new Date(this.date[1]);
        }
        this.endDate = new Date(
          end.getFullYear(),
          end.getMonth() + 1,
          1
        ).toISOString();
        this.calculateList = [...this.orderSelected];
        this.$asyncComputed.sunburstJson.update();
        console.log(this.sunburstJson);
      } else {
        return this.$alert.error("統計排序不得為空");
      }
    }
  },
  components: {
    sunburst,
    // nodeInfoDisplayer,
    breadcrumbTrail,
    report,
    highlightOnHover,
    zoomOnClick
  }
};
</script>

<style>
/*
.row1 {
  margin: 1% 10%;
}
*/

/* .resizable {
    margin-left: calc(50% - 50px);
  }  */
/* 
  .chart{
    text-align: center;
    width: 100%;
    height: 50vh;
    display: flex;
    justify-content: center;
  } */

.sunburst {
  height: 75vh;
}

svg text {
  fill: #fff !important;
}
</style>
