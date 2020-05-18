<template>
  <!-- ref: https://github.com/David-Desmaisons/Vue.D3.sunburst/tree/e3c61e84268861400116245ea8e9020e8113ea07 -->
  <v-container fluid fill-height>
    <!-- <div class="card-header">Sunburst</div>
    <div class="card-body father">-->
    <sunburst
      class="sunburst"
      :data="displayData"
      :minAngleDisplayed="minAngleDisplayed"
      :inAnimationDuration="inAnimationDuration"
      :outAnimationDuration="outAnimationDuration"
    >
      <template v-slot:menu>
        <v-row class="py-4" justify="center">
          <v-btn-toggle v-model="toggle_exclusive_perspective" mandatory>
            <v-btn value="personal">個人</v-btn>
            <v-btn value="ledger">帳本</v-btn>
            <v-btn value="points">點數</v-btn>
          </v-btn-toggle>

          <!--v-flex xs6 sm3 md3>
            <v-card flat class="time" xs6 sm3 md3>
              <v-btn-toggle v-model="toggle_exclusive_time" mandatory>
                <v-btn value="year">年</v-btn>
                <v-btn value="month">月</v-btn>
                <v-btn value="week">週</v-btn>
              </v-btn-toggle>
            </v-card>
          </v-flex-->
        </v-row>
      </template>

      <template v-slot:legend="{ nodes, colorGetter, width }">
        <breadcrumbTrail
          :current="nodes.mouseOver"
          :root="nodes.root"
          :colorGetter="colorGetter"
          :from="nodes.zoomed"
          :width="width"
          class="pt-6"
        />
      </template>

      <template v-slot:top="{ nodes }">
        <nodeInfoDisplayer
          :current="nodes.mouseOver"
          :root="nodes.root"
          :clicked="nodes.clicked"
          description="of selected"
        />
      </template>

      <template v-slot="{ on, actions }">
        <highlightOnHover v-bind="{ on, actions }" />
        <zoomOnClick v-bind="{ on, actions }" />
      </template>

      <template v-slot:report="{ nodes }">
        <report slot="report" :nodes="nodes" />
      </template>
    </sunburst>
    <!-- </div> -->
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
  nodeInfoDisplayer,
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
    return {
      sumPersonal,
      sumLedger,
      example,
      minAngleDisplayed: 0.05, //設定角度多小的可被看見 if=0表全部都可被看見
      inAnimationDuration: 500, //動畫速度
      outAnimationDuration: 1000, //動畫速度
      toggle_exclusive_perspective: "ledger",
      toggle_exclusive_time: "month",
      sunburstOrder: {
        ledger: ["ledger", "user", "recordType", "category"],
        personal: ["recordType", "ledger", "category"],
        points: ["flow", "type", "subtype", "user"]
      }
    };
  },
  computed: {
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
        const type = this.toggle_exclusive_perspective;
        return this.$http
          .get(`/statistic/${type}`, {
            params: { order: this.sunburstOrder[type] }
          })
          .then(res => {
            const json = res.data;
            summaryAddParent(json);
            return json;
          });
      },
      default: {}
    }
  },
  methods: {},
  components: {
    sunburst,
    nodeInfoDisplayer,
    breadcrumbTrail,
    report,
    highlightOnHover,
    zoomOnClick
  }
};
</script>

<style scoped>
.row1 {
  margin: 1% 10%;
}

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
</style>
