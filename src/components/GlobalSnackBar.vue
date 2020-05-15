<template>
  <v-snackbar
    v-model="state.show"
    :timeout="state.timeout"
    :color="state.color"
    :vertical="state.vertical"
    :multi-line="state.multiline"
  >
    {{ state.message }}
    <v-btn text @click="state.show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
import Vue from "vue";

export const state = Vue.observable({
  show: false,
  message: "",
  color: "",
  multiline: false,
  vertical: false,
  timeout: 3000
});

export const snackbar = {
  open(message, color = "info", config = {}) {
    state.multiline = config.multiline != null ? config.multiline : false;
    state.timeout = config.timeout != null ? config.timeout : 3000;
    state.vertical = config.vertical != null ? config.vertical : false;

    state.message = message;
    state.color = color;
    state.show = true;
  }
};

Vue.$snackbar = snackbar;
Vue.prototype.$snackbar = snackbar;

export default {
  name: "global-snackbar",
  created() {
    this.state = state;
  }
};
</script>
