<template>
  <!-- ref: https://github.com/David-Desmaisons/Vue.D3.sunburst/tree/e3c61e84268861400116245ea8e9020e8113ea07 -->
  <v-content>
    <v-container fluid style="width: 960px" class="con">
      <v-row class="row1">
        <v-flex xs6 sm3 md3>
          <v-card flat class="perspective">
            <v-btn-toggle v-model="toggle_exclusive_perspective" mandatory>
              <v-btn value="personal">個人</v-btn>
              <v-btn value="ledger">帳本</v-btn>
            </v-btn-toggle>
          </v-card>
        </v-flex>

        <v-flex xs6 sm3 md3>
          <v-card flat class="time" xs6 sm3 md3>
            <v-btn-toggle v-model="toggle_exclusive_time" mandatory>
              <v-btn value="year">年</v-btn>
              <v-btn value="month">月</v-btn>
              <v-btn value="week">週</v-btn>
            </v-btn-toggle>
          </v-card>
        </v-flex>
      </v-row>

      <!-- <div class="card-header">Sunburst</div>
      <div class="card-body father">-->
      <sunburst
        class="sunburst"
        :data="displayData"
        :minAngleDisplayed="minAngleDisplayed"
        :inAnimationDuration="inAnimationDuration"
        :outAnimationDuration="outAnimationDuration"
      >
        <breadcrumbTrail
          slot="legend"
          slot-scope="{ nodes, colorGetter, width }"
          :current="nodes.mouseOver"
          :root="nodes.root"
          :colorGetter="colorGetter"
          :from="nodes.zoomed"
          :width="width"
        />

        <nodeInfoDisplayer
          slot="top"
          slot-scope="{ nodes }"
          :current="nodes.mouseOver"
          :root="nodes.root"
          :clicked="nodes.clicked"
          description="of selected"
        />

        <template slot-scope="{ on, actions }">
          <highlightOnHover v-bind="{ on, actions }" />
          <zoomOnClick v-bind="{ on, actions }" />
        </template>

        <report slot="report" slot-scope="{ nodes }" :current="nodes.clicked" />
      </sunburst>
      <!-- </div> -->
    </v-container>
  </v-content>
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
  zoomOnClick,
} from "vue-d3-sunburst";

import sumPersonal from "../data/sumPersonal.js";
import sumLedger from "../data/sumLedger.js";

export default {
  name: "app-summary",
  data() {
    return {
      sumPersonal,
      sumLedger,
      minAngleDisplayed: 0.05, //設定角度多小的可被看見 if=0表全部都可被看見
      inAnimationDuration: 500, //動畫速度
      outAnimationDuration: 1000, //動畫速度
      toggle_exclusive_perspective: "ledger",
      toggle_exclusive_time: "month"
    };
  },
  computed: {
    displayData() {
      if (this.toggle_exclusive_perspective == "ledger") {
        return this.sumLedger;
      } else {
        return this.sumPersonal;
      }
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
.con {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

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
  height: 70vh;
}
</style>
