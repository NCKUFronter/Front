<template>
  <v-container
    fluid
    :style="($vuetify.breakpoint.smAndUp)?'padding:120px 50px 10px 50px;':'padding:48px 50px 10px 50px;'"
  >
    <v-row class="sub-header">
      <v-spacer></v-spacer>
      <v-card-title class="mt-2 pa-0">
        <v-icon size="25">mdi-alpha-p-circle-outline</v-icon>
        {{totalPoint}}
      </v-card-title>
    </v-row>

    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <v-form class="form" @submit.prevent="handleSubmit(onSubmit)">
        <v-row justify="space-around">
          <ValidationProvider v-slot="{ errors }" name="point" rules="required|numeric">
            <v-text-field
              v-model="inputPoint"
              label="贈送點數"
              :error-messages="errors"
              prepend-icon="mdi-gift"
              type="number"
              required
            ></v-text-field>
          </ValidationProvider>

          <v-icon v-if="$vuetify.breakpoint.smAndUp">mdi-arrow-right-bold</v-icon>
          <v-icon v-else size="30">mdi-arrow-down-bold</v-icon>

          <ValidationProvider v-slot="{ errors }" name="select" rules="required">
            <v-select
              v-model="userSelected"
              :items="relativeUsers"
              label="對象"
              :error-messages="errors"
              prepend-icon="person"
              required
              item-text="name"
              item-value="email"
            ></v-select>
          </ValidationProvider>
        </v-row>

        <v-row justify="center">
          <v-btn class="mx-2" type="submit">Submit</v-btn>
          <v-btn class="mx-2" @click="reset">Reset</v-btn>
        </v-row>
      </v-form>
    </ValidationObserver>
  </v-container>
</template>

<script>
import { required, numeric } from "vee-validate/dist/rules";
import { ignoreNotLoginError } from "../utils";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});

extend("numeric", {
  ...numeric,
  message: "{_field_} must be number"
});

export default {
  inject: ["$alert"],
  data() {
    return {
      userSelected: null,
      inputPoint: ""
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  computed: {
    totalPoint() {
      return this.$api.user.profile.rewardPoints;
    }
  },
  asyncComputed: {
    relativeUsers: {
      get() {
        return this.$http.get("/user/relativeUsers").then(res => res.data);
      },
      default: []
    }
  },
  methods: {
    reset() {
      this.inputPoint = "";
      this.userSelected = null;
      this.$refs.observer.reset();
    },
    onSubmit() {
      if (this.inputPoint > this.totalPoint) {
        this.$alert.error("點數不夠");
      } else {
        this.$http
          .post("/point/transfer", {
            email: this.userSelected,
            amount: this.inputPoint
          })
          .then(res => {
            this.$api.updateProfile();
            this.$alert.success("成功贈送點數");
            // alert("Form has been submitted!");
          })
          .catch(ignoreNotLoginError)
          .catch(err => {
            this.$alert.error("贈送點數失敗");
            console.log(err);
          });
      }
    }
  }
};
</script>
<style  scoped>
.form {
  margin: 10%;
}
</style>
