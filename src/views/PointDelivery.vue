<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <v-flex xs12 sm12 md12>
      <div class="header">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-icon style="margin-top:3px" large>mdi-alpha-p-circle-outline</v-icon>
          <v-card-title>{{totalPoint}}</v-card-title>
        </v-card-actions>
      </div>
    </v-flex>
    <v-form class="form" @submit.prevent="handleSubmit(onSubmit)">
      <ValidationProvider v-slot="{ errors }" name="select" rules="required">
        <v-select
          v-model="userSelected"
          :items="user"
          label="對象"
          :error-messages="errors"
          prepend-icon="person"
          required
          item-text="name"
          item-value="email"
        ></v-select>
      </ValidationProvider>

      <ValidationProvider v-slot="{ errors }" name="point" rules="required|numeric">
        <v-text-field
          v-model="inputPoint"
          label="贈送點數"
          :error-messages="errors"
          prepend-icon="mdi-gift"
          required
        ></v-text-field>
      </ValidationProvider>

      <v-btn type="submit">Submit</v-btn>
      <v-btn @click="reset">Reset</v-btn>
    </v-form>
  </ValidationObserver>
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
      user: [],
      userSelected: null,
      inputPoint: "",
      totalPoint: 0
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  created() {
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
  },
  methods: {
    // submit () {
    //   this.$refs.observer.validate().then(()=>{
    //     console.log(this.$refs.observer.errors);
    //   })

    // },
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
.header {
  border-bottom: #cccccc 1px solid;
}
</style>
