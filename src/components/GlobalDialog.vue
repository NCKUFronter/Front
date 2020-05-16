<template>
  <v-dialog
    v-model="state.show"
    :color="state.color"
    :persistent="state.persistent"
    :width="state.width"
  >
    <v-alert
      :text="text"
      :outlined="outlined"
      :prominent="prominent"
      :type="state.type"
      :color="state.color"
      :icon="state.icon"
      :dismissible="state.dismissible"
      class="mb-0"
    >
      <slot :state="state"></slot>
      <div v-if="!$scopedSlots.default">{{state.message}}</div>
    </v-alert>
  </v-dialog>
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
    text: Boolean,
    outlined: Boolean,
    prominent: Boolean,
    dismissible: Boolean
  },
  created() {
    const state = Vue.observable({
      show: false,
      message: "",
      color: "",
      persistent: true,
      timeout: 2000,
      data: null
    });

    const snackbar = {
      open(message, color = "info", config = {}) {
        state.persistent = config.persistent != null ? config.persistent : true;
        state.width = config.width != null ? config.width : 400;
        state.type = config.type != null ? config.type : "info";
        state.data = config.data;

        state.message = message;
        state.color = color;
        state.show = true;
      },
      close() {
        state.show = false;
      },
      state
    };

    const key = "$" + this.name;
    Vue[key] = snackbar;
    Vue.prototype[key] = snackbar;
    this.state = state;
  }
};
</script>
