<template>
  <v-snackbar
    v-model="state.show"
    :timeout="state.timeout"
    :multi-line="state.multiline"
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
      :dismissible="state.dismissible"
    >
      <slot :state="state"></slot>
      <div v-if="!$scopedSlots.default">{{state.message}}</div>
    </v-alert>
  </v-snackbar>
</template>

<script>
import Vue from "vue";

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
    dismissible: Boolean
  },
  data() {
    const state = {
      show: false,
      message: "",
      color: "",
      type: "",
      multiline: false,
      timeout: 2000,
      data: null
    };
    this.snackbar = {
      open(message, type = "info", config = {}) {
        this.state.multiline =
          config.multiline != null ? config.multiline : false;
        this.state.timeout = config.timeout != null ? config.timeout : 3000;
        this.state.color = config.color != null ? config.color : "";
        this.state.icon = config.icon != null ? config.icon : null;
        this.state.dismissible =
          config.dismissible != null ? config.dismissible : this.dismissible;
        this.state.data = config.data;

        this.state.message = message;
        this.state.type = type;
        this.state.show = true;
      },
      close() {
        state.show = false;
      },
      state
    };

    return {
      state
    };
  }
};
</script>
