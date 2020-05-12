<template>
  <v-container fluid row class="graph">
    <v-flex xs12 sm6 md6 class="chart">
      <!-- Use this slot to add information on top or bottom of the graph-->
      <slot
        class="legend"
        name="legend"
        :width="width"
        :colorGetter="colorGetter"
        :nodes="graphNodes"
        :actions="actions"
      ></slot>
      <div class="viewport" v-resize.throttle.250="resize">
        <!-- Use this slot to add information on top of the graph -->
        <!-- <slot class="top" name="top" :colorGetter="colorGetter" :nodes="graphNodes" :actions="actions">
        </slot>-->
        <!-- Use this slot to add behaviors to the sunburst -->
        <slot :on="on" :actions="actions"></slot>
      </div>
    </v-flex>
    <v-flex xs12 sm6 md6 class="report">
      <slot name="report" :nodes="graphNodes"></slot>
    </v-flex>
  </v-container>
</template>
<script>
import Vue from "vue";
import { sunburst } from "vue-d3-sunburst";

class LevelColorUtil {
  nowIdx = 0;
  direction = 1;

  nextIdx(colors) {
    this.nowIdx = this.nowIdx + this.direction;
    if (this.nowIdx >= colors.length) {
      this.nowIdx = colors.length - 1;
      this.direction = -1;
    } else if (this.nowIdx < 0) {
      this.nowIdx = 1;
      this.direction = 1;
    }
    return this.nowIdx;
  }
}

export default Vue.extend(sunburst).extend({
  props: {
    colors: {
      type: Array,
      require: false,
      default() {
        return [
          "#65738E",
          "#766C91",
          "#78566F",
          "#523B58",
          "#813B3D",
          "#BC5E52",
          "#FFDBB3"
        ];
      }
    }
  },
  created() {
    this.levelColorUtil = {};
  },
  computed: {
    colorGetter() {
      return d => {
        if (d.data) d = d.data;
        if (d.colorIdx) return this.colors[d.colorIdx];

        if (this.levelColorUtil[d.level] == null)
          this.levelColorUtil[d.level] = new LevelColorUtil();

        const colorUtil = this.levelColorUtil[d.level];

        d.colorIdx = colorUtil.nextIdx(this.colors);
        return this.colors[d.colorIdx];
      };
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
  height: 100%;
  /* flex: 1 1 auto; */
  /* border: red 2px solid; */
}
</style>
