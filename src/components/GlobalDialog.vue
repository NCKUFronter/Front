<template>
  <v-dialog
    v-model="state.show"
    :color="state.color"
    :persistent="state.persistent"
    :width="realWidth"
    overlay-opacity="0"
    content-class="elevation-8 white"
  >
    <v-alert
      :text="text"
      :outlined="outlined"
      :prominent="prominent"
      :type="type"
      :color="state.color"
      :icon="realIcon"
      :dismissible="realDismissible"
      :border="border"
      class="mb-0"
    >
      <slot :state="state"></slot>
      <div v-if="!$scopedSlots.default" class="black--text">{{state.message}}</div>
      <div v-if="!$scopedSlots.default" class="row ma-0">
        <v-spacer />
        <v-btn text @click="onConfirm()" dense>確認</v-btn>
        <v-btn text @click="onCancel()">取消</v-btn>
      </div>
    </v-alert>
  </v-dialog>
</template>

<script>
import Vue from "vue";

export function initDialogData() {
  const state = Vue.observable({
    show: false,
    message: "",
    color: "",
    type: "warning",
    data: null,
    width: 400,
    onConfirm: null,
    onCancel: null
  });

  return {
    open(message, onConfirm, onCancel = null, config = {}) {
      state.color = config.color;
      state.icon = config.icon;
      state.dismissible = config.dismissible;
      state.data = config.data;
      state.type = config.type;

      state.message = message;
      state.onConfirm = onConfirm;
      state.onCancel = onCancel;
      state.show = true;
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
    text: Boolean,
    outlined: Boolean,
    prominent: Boolean,
    dismissible: Boolean,
    border: String,
    icon: String,
    state: {
      type: Object,
      required: true
    }
  },
  computed: {
    type() {
      return this.state.type != null ? this.state.type : "warning";
    },
    realDismissible() {
      return this.state.dismissible != null
        ? this.state.dismissible
        : this.dismissible;
    },
    realWidth() {
      return this.state.width != null ? this.state.width : 400;
    },
    realIcon() {
      return this.state.icon != null ? this.state.icon : this.icon;
    }
  },
  methods: {
    onConfirm() {
      this.state.show = false;
      if (this.state.onConfirm) this.state.onConfirm();
    },
    onCancel() {
      this.state.show = false;
      if (this.state.onCancel) this.state.onCancel();
    }
  }
};
</script>
