<template>
  <v-snackbar
    v-model="state.show"
    :timeout="timeout"
    :multi-line="multiline"
    :top="top"
    :left="left"
    :right="right"
    :bottom="bottom"
    color="white"
    class="alert-snackbar"
  >
    <v-alert
      v-model="state.show"
      :text="text"
      :outlined="outlined"
      :prominent="prominent"
      :type="state.type"
      :color="state.color"
      :icon="state.icon"
      :dismissible="realDismissible"
    >
      <slot :state="state"></slot>
      <span v-if="!$scopedSlots.default" style="white-space: pre;">{{state.message}}</span>
    </v-alert>
  </v-snackbar>
</template>

<script>
import Vue from "vue";

export function initSnackbarData() {
  const state = Vue.observable({
    show: false,
    message: "",
    color: "",
    type: "",
    multiline: false,
    timeout: 1000,
    data: null
  });

  return {
    open(message, type = "info", config = {}) {
      state.multiline = config.multiline;
      state.timeout = config.timeout;
      state.color = config.color;
      state.icon = config.icon;
      state.dismissible = config.dismissible;
      state.data = config.data;

      state.message = message;
      state.type = type;
      state.show = true;
    },
    success(message, config) {
      this.open(message, "success", config);
    },
    error(message, config) {
      this.open(message, "error", config);
    },
    info(message, config) {
      this.open(message, "info", config);
    },
    warning(message, config) {
      this.open(message, "warning", config);
    },
    close() {
      state.show = false;
    },
    state
  };
}

export default {
  name: "global-snackbar",
  props: {
    top: Boolean,
    bottom: Boolean,
    left: Boolean,
    right: Boolean,
    text: Boolean,
    outlined: Boolean,
    prominent: Boolean,
    dismissible: Boolean,
    state: {
      type: Object,
      required: true
    }
  },
  computed: {
    realDismissible() {
      return this.state.dismissible != null
        ? this.state.dismissible
        : this.dismissible;
    },
    timeout() {
      return this.state.timeout != null ? this.state.timeout : 1500;
    },
    multiline() {
      return this.state.multiline != null ? this.state.multiline : false;
    }
  }
};
</script>
