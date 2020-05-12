<template>
    <v-content>
        <v-container fluid style="width: 960px">
            
                
                <v-flex xs12 sm12 md12 class="text-center">
                    <v-img :src="personal.img" style="border-radius: 50%; height:200px; width:200px; margin: auto; margin-top: 20px;"></v-img>
                    <v-card flat v-if="personalModal">
                    <v-card-title class="justify-center">{{personal.username}}</v-card-title>
                    <v-card-subtitle >{{personal.ID}}</v-card-subtitle>
                        <v-icon
                            small
                            class="edit"
                            @click="editPersonal()"
                        >
                            mdi-pencil
                        </v-icon>
                    </v-card>
                    <v-card flat v-else class="editModal">
                        <v-text-field
                            label="使用者名稱"
                            v-model="personal.username"
                            class="editContent"
                        ></v-text-field>
                        <v-text-field
                            label="使用者ID"
                            v-model="personal.ID"
                            class="editContent"
                        ></v-text-field>
                        <v-icon
                            small
                            class="edit"
                            @click="editPersonal()"
                        >
                            mdi-content-save-move-outline
                        </v-icon>
                    </v-card>
                    <v-card-text >{{personal.email}}</v-card-text>
                </v-flex>
               
                <!-- <v-col cols="9"> -->
                <v-row class="creditCard" align-content="center">
                    <v-flex xs12 sm6 md6 >
                    <v-card flat class="cre_card">
                            <div class="line1"></div>
                            <div class="line2"></div>
                            <v-card-title class="justify-center">信用卡資訊</v-card-title>
                            
                    </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6 v-for="item in creditCard" :key="item.number">
                        <v-card  class="justify-center" >
                            <v-card-title class="cre_title">{{item.com}}</v-card-title>
                            <v-card-text class="cre_text">{{item.number}}</v-card-text>
                        </v-card>
                    </v-flex>

                     <v-flex xs12 sm6 md6>

                        <v-card class="add_card" color="#f1f1f1">
                            <v-card-text class="add_text">新增信用卡資訊</v-card-text>
                            <!-- <v-card-actions style="margin: 0px; padding:0px;"> -->
                                <!-- <v-btn icon > -->
                                    <v-icon class="add">mdi-plus-circle</v-icon>
                                <!-- </v-btn> -->
                            <!-- </v-card-actions> -->
                        </v-card>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                        <v-card class="creditModal">
                        <ValidationObserver ref="observer"  >
                            <!-- v-slot="{ validate, reset }" -->
                        <v-form class="form">
                            <ValidationProvider v-slot="{ errors }" name="select" rules="required">
                            <v-select 
                                v-model="companySelected"
                                :items="company"
                                label="信用卡公司"
                                :error-messages="errors"
                                required
                            ></v-select>
                            </ValidationProvider>

                            <ValidationProvider v-slot="{ errors }" name="point" rules="required|numeric">
                            <v-text-field 
                                v-model="creditCardNumber"
                                label="信用卡號"
                                :error-messages="errors"
                                required
                            >
                            </v-text-field>
                            </ValidationProvider>

                            <v-btn class="mr-4" @click="submit">submit</v-btn>
                            <v-btn @click="clear">clear</v-btn>
                        </v-form>
                        </ValidationObserver>
                        </v-card>
                    </v-flex>
                    

                </v-row>

                
   
        </v-container>
    </v-content>
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
    name: "PointRedeem",
    data: () => ({
        personalModal: true,
        personal: {img:"https://fakeimg.pl/10x10/cccccc/",username:"xun",ID:"thisIsIDIDIDIDIDID",email:"xun4014026@gmail.com"},
        creditCard:[
            {com:'永豐銀行',number:'xxxx xxxx xxxx xxxx'},
            {com:'中華郵政',number:'1234 xxxx xxxx xxxx'}
        ],
        company:['永豐銀行','中華郵政','玉山銀行','台灣銀行','第一銀行'],
        companySelected:null,
        creditCardNumber:'',
    }),
    methods:{
        editPersonal(){
            this.personalModal=!this.personalModal;
        },
      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.inputPoint = ''
        this.userSelected=null
        this.$refs.observer.reset()
      },

    }
}
</script>
<style scoped>

.cre_title{

    margin-bottom: 0;
    margin-left: 10px;
    margin-right: 10px;
    padding-bottom: 0px;
    padding-right: 10px;
    font-size: 17px;
}

.cre_text{
    margin-top: 0px;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    
}
.cre_card{
    margin: auto;
}
.add_text{
    margin: 0px;
    padding: 20px;
    display: inline-block;
}
.add{
    display: inline-block;
    margin: 0px;
    padding: 20px;
   
}
.add_card{
    margin: auto;
    display: flex;
}

.line1{
    border-bottom: #d9d1ba 2px solid;
    width:30%;
    position: relative;
    bottom: -34px;
    justify-content: left;

}
.line2{
    border-bottom: #d9d1ba 2px solid;
    width:30%;
    position: relative;
    bottom: -32px;
    left: 70%;

}
.title{
    background: red;
    width: fit-content;
    justify-content: center;
    z-index: 2;
}
.editModal{
    display: flex; 
    flex-direction: column;
    align-items: center;
    
}
.editContent{
    width:fit-content;
}

.creditModal{
    position: fixed;
    width:40%;
    top:20%;
}

.creditCard{
    display: flex;
    flex-direction: column;


}


</style>