<template>
  <v-container fluid row class="graph" style="overflow:auto">
    <v-flex xs12 sm7 md7 class="chart" style="z-index:3">
      <!-- <v-card style="height:100%"> -->
      <!-- Use this slot to add information on top or bottom of the graph-->
      <!-- Use this slot to add information on top or bottom of the graph-->
      <slot
        class="legend"
        name="legend"
        :width="width"
        :colorGetter="colorGetter"
        :nodes="graphNodes"
        :actions="actions"
      ></slot>

      <div class="viewport" v-resize.throttle.250="resize" style="height:70%;">
        <div style="height:100%;position:absolute;"></div>
        <!-- Use this slot to add information on top of the graph -->
        <!-- <slot class="top" name="top" :colorGetter="colorGetter" :nodes="graphNodes" :actions="actions">
        </slot>-->
        <!-- Use this slot to add behaviors to the sunburst -->
        <slot :on="on" :actions="actions"></slot>
      </div>
      <!-- </v-card> -->
    </v-flex>
    <v-flex xs12 sm5 md5 offset-sm="1" offset-md="1" class="report px-4">
      <!-- <slot name="menu" :nodes="graphNodes"></slot> -->
      <slot name="report" :nodes="graphNodes"></slot>
    </v-flex>
  </v-container>
</template>

<script>
import Vue from "vue";
import { sunburst } from "vue-d3-sunburst";
// import sunburst from "./sunbrust/sunburst";

class LevelColorUtil {
  constructor(baseColor) {
    this.baseColor = baseColor;
    this.nowIdxMap = {};
  }

  reset() {
    this.nowIdxMap = {};
  }

  nextColor(node) {
    if (node.level == 0) return { r: 255, g: 255, b: 255, a: 0 };

    let baseColor = node.level != 1 ? node.parent.color : this.baseColor;
    const key = rgba(baseColor) + node.level;
    if (!this.nowIdxMap[key]) this.nowIdxMap[key] = 0;

    let nowIdx = this.nowIdxMap[key];
    let { r, g, b, a } = baseColor;
    a = this.baseColor.a - 0.2 * (node.level - 1);
    if (node.level == 1) {
      r = r - 50 * nowIdx;
      b = b + 30 * nowIdx;
    } else {
      g = g - 30 * nowIdx;
    }
    this.nowIdxMap[rgba(baseColor) + node.level] = nowIdx + 1;
    return { r, g, b, a };
  }
}

function rgba(obj) {
  return `rgba(${obj.r},${obj.g},${obj.b},${obj.a})`;
}

export default Vue.extend(sunburst).extend({
  props: {
    baseColor: {
      type: Object,
      default: () => ({ r: 239, g: 202, b: 22, a: 1 })
    }
  },
  created() {
    this.colorUtil = new LevelColorUtil(this.baseColor);
  },
  computed: {
    colorGetter() {
      return d => {
        if (d.data) d = d.data;
        if (d.level == null) return "#fff";
        if (d.level == 0 && d.color == null) this.colorUtil.reset();
        if (d.color != null) return rgba(d.color);

        d.color = this.colorUtil.nextColor(d);
        return rgba(d.color);
      };
    }
  },
  methods: {
    onData(data) {
      this.constructor.super.options.methods.onData.call(this, data);
      const pathes = this.getPathes();
      pathes.style("stroke", "#26282D");
    }
  }
});
</script>
<style scoped>
.graph {
  height: 100%;
  width: 100%;
  /* display: flex;
  flex-flow: column wrap; */
  /* border: black 2px solid; */
}

.viewport {
  width: 100%;
  /* height: 100%; */
  /* flex: 1 1 auto; */
  /* border: red 2px solid; */
}
</style>
