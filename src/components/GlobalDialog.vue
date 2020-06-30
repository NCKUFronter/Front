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
      :dark="dark"
      :prominent="prominent"
      :type="type"
      :color="state.color"
      :icon="realIcon"
      :dismissible="realDismissible"
      :border="border"
      class="mb-0 confirmWin"
    >
      <slot :state="state"></slot>
      <div v-if="!$scopedSlots.default" class="black--text">{{state.message}}</div>
      <div v-if="!$scopedSlots.default" class="row ma-0">
        <v-spacer />
        <v-btn color="black" text @click="onConfirm()" dense>確認</v-btn>
        <v-btn color="black" text @click="onCancel()">取消</v-btn>
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
    dark: Boolean,
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
      if (this.state.onConfirm) this.$nextTick(this.state.onConfirm);
    },
    onCancel() {
      this.state.show = false;
      if (this.state.onCancel) this.$nextTick(this.state.onCancel);
    }
  }
};
</script>

<style>
.confirmWin.v-alert.mb-0.confirmWin.v-sheet.theme--dark.v-alert--border.v-alert--prominent.v-alert--text.v-alert--border-top.warning--text {
  color: #26282d !important;
  caret-color: #26282d !important;
}
.confirmWin
  .v-icon.notranslate.v-alert__icon.mdi.mdi-help.theme--dark.warning--text {
  color: #26282d !important;
}
</style>