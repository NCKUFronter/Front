<template>
  <!-- ref: https://github.com/David-Desmaisons/Vue.D3.sunburst/tree/e3c61e84268861400116245ea8e9020e8113ea07 -->
  <v-content>
    <v-container fluid class="container">
      <v-row class="row1">
        <v-card flat class="perspective">
          <v-btn-toggle v-model="toggle_exclusive_perspective" mandatory>
            <v-btn value="personal">個人</v-btn>
            <v-btn value="ledger">帳本</v-btn>
          </v-btn-toggle>
        </v-card>
      </v-row>

      <v-row class="row2">
        <v-card flat class="time">
          <v-btn-toggle v-model="toggle_exclusive_time" mandatory>
            <v-btn value="year">年</v-btn>
            <v-btn value="month">月</v-btn>
            <v-btn value="week">週</v-btn>
          </v-btn-toggle>
        </v-card>
      </v-row>

      <v-row class="row3">
        <v-col cols="6" class="chart">
          <!-- <div class="card-header">Sunburst</div>
          <div class="card-body father"> -->
          <sunburst
            class="sunburst"
            :data="displayData"
            :minAngleDisplayed="minAngleDisplayed"
            :colorScheme="colorScheme"
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
          </sunburst>
          <!-- </div> -->
        </v-col>
        <v-col cols="6" class="report">
          <v-card class="tree">
            <v-treeview :items="displayData.children"></v-treeview>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import sunburst from "../components/sunbrust/sunburst";
import nodeInfoDisplayer from "../components/sunbrust/nodeInfoDisplayer";
import breadcrumbTrail from "../components/sunbrust/breadcrumbTrail";
//behaviours
import highlightOnHover from "../components/behavior/highlightOnHover";
import zoomOnClick from "../components/behavior/zoomOnClick";

import { colorSchemes } from "../infra/colorSchemes";
import sumPersonal from "../data/sumPersonal";
import sumLedger from "../data/sumLedger";

const colorSchemesNames = Object.keys(colorSchemes).map((key) => ({
  value: key,
  text: colorSchemes[key].name,
}));

export default {
  name: "summary",
  data() {
    return {
      sumPersonal,
      sumLedger,
      minAngleDisplayed: 0.05, //設定角度多小的可被看見 if=0表全部都可被看見
      colorScheme: colorSchemesNames[7].value, //chart的顏色
      // colorSchemes: colorSchemesNames,
      inAnimationDuration: 500, //動畫速度
      outAnimationDuration: 1000, //動畫速度
      toggle_exclusive_perspective: "ledger",
      toggle_exclusive_time: "month",
    };
  },
  computed: {
    displayData() {
      if (this.toggle_exclusive_perspective == "ledger") {
        return this.sumLedger;
      } else {
        return this.sumPersonal;
      }
    },
  },
  methods: {},
  components: {
    sunburst,
    nodeInfoDisplayer,
    breadcrumbTrail,
    highlightOnHover,
    zoomOnClick,
  },
};
</script>

<style scoped>
.container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; */
  color: #2c3e50;
  /* border: red 5px solid; */
  padding: 0;
  margin: 0;
  /* margin-top: 60px; */
  /* height: 800px; */
}

.row1 {
  display: flex;
}

.perspective {
  margin: 10px auto;
}

.row2 {
  display: flex;
}

.time {
  margin: 10px auto;
}

/* .resizable {
    margin-left: calc(50% - 50px);
  } */

.chart {
  text-align: center;
  /* position: relative; */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.sunburst {
  width: 500px;
  height: 500px;
  /* position: relative; */
  /* border: springgreen 2px solid; */
}

/* .report{
    border: peru 2px solid;
  } */

.tree {
  height: 82vh;
  border: #cccccc 1px solid;
  border-radius: 5%;
}
</style>
