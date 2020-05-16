<template>
  <v-snackbar
    v-model="state.show"
    :timeout="state.timeout"
    :color="state.color"
    :vertical="state.vertical"
    :multi-line="state.multiline"
    :top="top"
    :left="left"
    :right="right"
    :bottom="bottom"
  >
    {{ state.message }}
    <v-btn text @click="state.show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
import Vue from "vue";

export default {
  name: "global-snackbar",
  props: {
    name: {
      type: String,
      required: true
    },
    top: Boolean,
    bottom: Boolean,
    left: Boolean,
    right: Boolean
  },
  created() {
    const state = Vue.observable({
      show: false,
      message: "",
      color: "",
      multiline: false,
      vertical: false,
      timeout: 2000
    });

    const snackbar = {
      open(message, color = "info", config = {}) {
        state.multiline = config.multiline != null ? config.multiline : false;
        state.timeout = config.timeout != null ? config.timeout : 3000;
        state.vertical = config.vertical != null ? config.vertical : false;

        state.message = message;
        state.color = color;
        state.show = true;
      }
    };

    const key = "$" + this.name;
    Vue[key] = snackbar;
    Vue.prototype[key] = snackbar;
    this.state = state;
  }
};
</script>
