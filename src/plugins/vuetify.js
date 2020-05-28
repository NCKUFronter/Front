import Vue from "vue";
import Vuetify, {
  VAlert,
  VApp,
  VAppBar,
  VAppBarNavIcon,
  VAvatar,
  VBadge,
  VBtn,
  VBtnToggle,
  VCard,
  VCardActions,
  VCardSubtitle,
  VCardText,
  VCardTitle,
  VChip,
  VCombobox,
  VContainer,
  VContent,
  VDataTable,
  VDatePicker,
  VDialog,
  VDivider,
  VFlex,
  VForm,
  VIcon,
  VInput,
  VImg,
  VLayout,
  VList,
  VListItem,
  VMenu,
  VNavigationDrawer,
  VProgressCircular,
  VRow,
  VSelect,
  VSimpleTable,
  VSkeletonLoader,
  VSnackbar,
  VSpacer,
  VSheet,
  VTab,
  VTabs,
  VTextField,
} from "vuetify/lib";
import "./variables.scss";
// import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify, {
  components: {
    VAlert,
    VApp,
    VAppBar,
    VAppBarNavIcon,
    VAvatar,
    VBadge,
    VBtn,
    VBtnToggle,
    VCard,
    VCardActions,
    VCardSubtitle,
    VCardText,
    VCardTitle,
    VChip,
    VCombobox,
    VContainer,
    VContent,
    VDataTable,
    VDatePicker,
    VDialog,
    VDivider,
    VFlex,
    VForm,
    VIcon,
    VInput,
    VImg,
    VLayout,
    VList,
    VListItem,
    VMenu,
    VNavigationDrawer,
    VProgressCircular,
    VRow,
    VSelect,
    VSimpleTable,
    VSkeletonLoader,
    VSnackbar,
    VSpacer,
    VSheet,
    VTab,
    VTabs,
    VTextField,
  },
});

export default new Vuetify({
  theme: {
    dark:true,
    themes: {
      dark: {
        primary: "#3d404e",
        secondary: "#26a69a", //"#424242",
        accent: "#9c27b0", //"#82B1FF",
        error: "#E53935", // "#FF5252",
        info: "#31ccec", //"#2196F3",
        success: "#21ba45", //"#4CAF50",
        warning: "#ff8900", //"#FFC107",
        background: "#3d404e",
      },
    },
  },
});
