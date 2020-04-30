<template>
    <ValidationObserver ref="observer"  >
        <!-- v-slot="{ validate, reset }" -->
    <v-form class="form">
        <ValidationProvider v-slot="{ errors }" name="select" rules="required">
        <v-select 
            v-model="userSelected"
            :items="user"
            label="對象"
            :error-messages="errors"
            prepend-icon="person"
            required
        ></v-select>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" name="point" rules="required|numeric">
        <v-text-field 
            v-model="inputPoint"
            label="贈送點數"
            :error-messages="errors"
            prepend-icon="mdi-gift"
            required
        >
        </v-text-field>
        </ValidationProvider>

        <v-btn class="mr-4" @click="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
    </v-form>
    </ValidationObserver>
</template>

<script>
import { required, numeric } from 'vee-validate/dist/rules';
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate';

  setInteractionMode('eager')

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('numeric', {
    ...numeric,
    message: '{_field_} must be number',
  })

export default {
    data(){
        return{
            user:['Wish','Xun','Matt','Skycii'],
            userSelected:null,
            inputPoint:'',
        }
    },
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    methods: {
      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.inputPoint = ''
        this.userSelected=null
        this.$refs.observer.reset()
      },
    },
}
</script>
<style  scoped>
    .form{
        margin: 10%;
        
    }

</style>