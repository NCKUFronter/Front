import Vue from "vue";
import Vuetify from "vuetify";
import zhHant from "vuetify/es5/locale/zh-Hant";
import "./variables.scss";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#efca16",
        secondary: "#26a69a", //"#424242",
        accent: "#9c27b0", //"#82B1FF",
        error: "#c10015", //"#FF5252",
        info: "#31ccec", //"#2196F3",
        success: "#21ba45", //"#4CAF50",
        warning: "#ff8900", //"#FFC107",
      },
    },
  },
  lang: {
    locales: { zhHant },
    current: "zhHant",
  },
});
