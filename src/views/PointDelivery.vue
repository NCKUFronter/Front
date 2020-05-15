<template>
  <v-container fluid>
    <v-row class="sub-header">
      <v-spacer></v-spacer>
      <v-card-title>
        <v-icon large>mdi-alpha-p-circle-outline</v-icon>
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

          <v-icon>mdi-arrow-right-bold</v-icon>

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
  data() {
    return {
      userSelected: null,
      inputPoint: "",
      totalPoint: this.$api.profile.rewardPoints
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  created() {
    /*
    this.$http
      .get("/user/relativeUsers")
      .then(res => {
        res.data.forEach(element => {
          this.user.push({ name: element.name, email: element.email });
        });
        // console.log(this.user)
        return this.$http.get("/user/profile");
      })
      .then(res => {
        this.totalPoint = res.data.rewardPoints;
        console.log(this.totalPoint);
      })
      .catch(console.log);
      */
  },
  asyncComputed: {
    totalPointUpdate: {
      lazy: true,
      get() {
        return this.$api.fetchProfile().then(profile => {
          this.totalPoint = profile.rewardPoints;
          return this.totalPoint;
        });
      }
    },
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
        alert("點數不夠");
      } else {
        this.$http
          .post("/point/transfer", {
            email: this.userSelected,
            amount: this.inputPoint
          })
          .then(res => {
            this.$asyncComputed.totalPointUpdate.update();
            alert("Form has been submitted!");
          })
          .catch(err => {
            alert("新增失敗");
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
