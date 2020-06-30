<template>
    <v-container v-if="$vuetify.breakpoint.smAndUp" class="ma-0 pa-0" fluid style="height:100vh;overflow:hidden;display:flex;align-items: center;position:relative" >
        <div style="width:100%;height:80%;background-color:#3D404E;">
            <v-card flat color="transparent" style="height:100%;display: flex;align-items: center;">
                <!-- logo -->
                <div class="ma-auto" style="display:block" v-if="this.selected==0">
                <img src="../assets/aboutUs/set.png" width="40%" class="ma-auto" style="display:block;"/>
                <v-card flat color="transparent" class="ma-auto" style="display:block;width:fit-content">
                    <v-btn icon class="ma-2"><v-icon large>mdi-facebook</v-icon></v-btn>
                    <v-btn icon class="ma-2"><v-icon large>mdi-instagram</v-icon></v-btn>
                    <v-btn icon class="ma-2"><v-icon large>mdi-twitter</v-icon></v-btn>
                </v-card>
                </div>
                <!-- wish -->
                <div class="my-auto" style="display:flex; align-items:center; padding:0% 20%" v-else-if="this.selected==1">
                <img src="../assets/aboutUs/wish.png" width="40%" style="display:block;"/>
                <v-card flat color="transparent" style="display:block;width:fit-content;">
                    <v-card-title class="mx-2 my-4 pa-0" style="font-weight: bold;font-size:3.5rem;color:#F7EB92">陳位旭</v-card-title>
                    <v-card-title class="ma-2 pa-0" style="font-weight: bold;font-size:1.2rem">PM / Gaming / Script</v-card-title>
                    <v-card-title class="mx-2 my-8 pa-0" style="font-weight: bold;font-size:1.6rem">"凡事求個緣, idea不用選"</v-card-title>
                    <div>
                    <v-btn icon class="ma-2" ><v-icon large>mdi-facebook</v-icon></v-btn>
                    <v-btn icon class="ma-2"><v-icon large>mdi-instagram</v-icon></v-btn>
                    <!-- <v-btn icon class="ma-2"><v-icon large>mdi-twitter</v-icon></v-btn> -->
                    </div>
                </v-card>
                </div>
                <!-- yi -->
                <div class="my-auto" style="display:flex; align-items:center; padding:0% 20%" v-else-if="this.selected==2">
                <img src="../assets/aboutUs/yi.png" width="40%" style="display:block;"/>
                <v-card flat color="transparent" style="display:block;width:fit-content;">
                    <v-card-title class="mx-2 my-4 pa-0" style="font-weight: bold;font-size:3.5rem;color:#F7EB92">陳庭毅</v-card-title>
                    <v-card-title class="ma-2 pa-0" style="font-weight: bold;font-size:1.2rem">Back / Designer / Gaming</v-card-title>
                    <v-card-title class="mx-2 my-8 pa-0" style="font-weight: bold;font-size:1.6rem">"0°C=32°F, 0°C+0°C=64°F"</v-card-title>
                    <div>
                    <v-btn icon class="ma-2" ><v-icon large>mdi-facebook</v-icon></v-btn>
                    <v-btn icon class="ma-2" ><v-icon large>mdi-instagram</v-icon></v-btn>
                    <!-- <v-btn icon class="ma-2"><v-icon large>mdi-twitter</v-icon></v-btn> -->
                    </div>
                </v-card>
                </div>
                <!-- han -->
                <div class="my-auto" style="display:flex; align-items:center; padding:0% 20%" v-else-if="this.selected==3">
                <img src="../assets/aboutUs/han.png" width="40%" style="display:block;"/>
                <v-card flat color="transparent" style="display:block;width:fit-content;">
                    <v-card-title class="mx-2 my-4 pa-0" style="font-weight: bold;font-size:3.5rem;color:#F7EB92">蔡函璇</v-card-title>
                    <v-card-title class="ma-2 pa-0" style="font-weight: bold;font-size:1.2rem">Full Track</v-card-title>
                    <v-card-title class="mx-2 my-8 pa-0" style="font-weight: bold;font-size:1.6rem">"魔鬼藏在細節裡"</v-card-title>
                    <div>
                    <v-btn icon class="ma-2" ><v-icon large>mdi-facebook</v-icon></v-btn>
                    <v-btn icon class="ma-2"><v-icon large>mdi-instagram</v-icon></v-btn>
                    <!-- <v-btn icon class="ma-2"><v-icon large>mdi-twitter</v-icon></v-btn> -->
                    </div>
                </v-card>
                </div>
                <!-- matt -->
                <div class="my-auto" style="display:flex; align-items:center; padding:0% 20%" v-else-if="this.selected==4">
                <img src="../assets/aboutUs/matt.png" width="40%" style="display:block;"/>
                <v-card flat color="transparent" style="display:block;width:fit-content;">
                    <v-card-title class="mx-2 my-4 pa-0" style="font-weight: bold;font-size:3.5rem;color:#F7EB92">王崇名</v-card-title>
                    <v-card-title class="ma-2 pa-0" style="font-weight: bold;font-size:1.2rem">Front / App</v-card-title>
                    <v-card-title class="mx-2 my-8 pa-0" style="font-weight: bold;font-size:1.6rem">"擔心未來就跟以為嚼口香糖就能解代數一樣"</v-card-title>
                    <div>
                    <v-btn icon class="ma-2"><v-icon large>mdi-facebook</v-icon></v-btn>
                    <v-btn icon class="ma-2"><v-icon large>mdi-instagram</v-icon></v-btn>
                    <!-- <v-btn icon class="ma-2"><v-icon large>mdi-twitter</v-icon></v-btn> -->
                    </div>
                </v-card>
                </div>
                <!-- xin -->
                <div class="my-auto" style="display:flex; align-items:center; padding:0% 20%" v-else-if="this.selected==5">
                <img src="../assets/aboutUs/xin.png" width="40%" style="display:block;"/>
                <v-card flat color="transparent" style="display:block;width:fit-content;">
                    <v-card-title class="mx-2 my-4 pa-0" style="font-weight: bold;font-size:3.5rem;color:#F7EB92">劉心鈺</v-card-title>
                    <v-card-title class="ma-2 pa-0" style="font-weight: bold;font-size:1.2rem">Front / App</v-card-title>
                    <v-card-title class="mx-2 my-8 pa-0" style="font-weight: bold;font-size:1.6rem">"把興趣放在比夢想更高得位置"</v-card-title>
                    <div>
                    <v-btn icon class="ma-2" ><v-icon large>mdi-facebook</v-icon></v-btn>
                    <v-btn icon class="ma-2" ><v-icon large>mdi-instagram</v-icon></v-btn>
                    <!-- <v-btn icon class="ma-2"><v-icon large>mdi-twitter</v-icon></v-btn> -->
                    </div>
                </v-card>
                </div>
                <!-- yo -->
                <div class="my-auto" style="display:flex; align-items:center; padding:0% 20%" v-else-if="this.selected==6">
                <img src="../assets/aboutUs/yo.png" width="40%" style="display:block;"/>
                <v-card flat color="transparent" style="display:block;width:fit-content;">
                    <v-card-title class="mx-2 my-4 pa-0" style="font-weight: bold;font-size:3.5rem;color:#F7EB92">郭芮佑</v-card-title>
                    <v-card-title class="ma-2 pa-0" style="font-weight: bold;font-size:1.2rem">Designer</v-card-title>
                    <v-card-title class="mx-2 my-8 pa-0" style="font-weight: bold;font-size:1.6rem">"該做的就是要馬上做免得忘記"</v-card-title>
                    <div>
                    <v-btn icon class="ma-2" ><v-icon large>mdi-facebook</v-icon></v-btn>
                    <v-btn icon class="ma-2" ><v-icon large>mdi-instagram</v-icon></v-btn>
                    <!-- <v-btn icon class="ma-2"><v-icon large>mdi-twitter</v-icon></v-btn> -->
                    </div>
                </v-card>
                </div>
            </v-card>
        </div>
        <v-card flat color="transparent" style="position:absolute;bottom:3%;width:100%">
            <div class="ma-auto member" style="display:block;width:fit-content">
            <v-btn class="ma-2 elevation-0" @click="memberSelect(0)" @mouseover="memberSelect(0)"
                style="min-width:0px;margin:3px;height:100px;width:100px;border-radius:50px;background-color:#F7EB92;"
                :style="(this.selected==0)?'border:7px double #3D404E':''"
            >
                <v-img src="../assets/aboutUs/logo.png" contain height="60px" style=""/>
            </v-btn>


            <v-btn class="ma-2 elevation-0" @click="memberSelect(1)" @mouseover="memberSelect(1)"
                style="min-width:0px;margin:3px;height:100px;width:100px;border-radius:50px;background-color:#FFA863;"
                :style="(this.selected==1)?'border:7px double #3D404E':''"
            >
                <v-img src="../assets/aboutUs/wish.png" contain height="130px" style="position:relative;bottom:20px" />
            
            </v-btn>

            <v-btn class="ma-2 elevation-0" @click="memberSelect(2)"  @mouseover="memberSelect(2)"
                style="min-width:0px;margin:3px;height:100px;width:100px;border-radius:50px;background-color:#D04F57;"
                :style="(this.selected==2)?'border:7px double #3D404E':''"
            >
                <v-img src="../assets/aboutUs/yi.png" contain height="120px" style="position:relative;bottom:25px" />
            </v-btn>

            <v-btn class="ma-2 elevation-0" @click="memberSelect(3)"  @mouseover="memberSelect(3)"
                style="min-width:0px;margin:3px;height:100px;width:100px;border-radius:50px;background-color:#5D63AF;"
                :style="(this.selected==3)?'border:7px double #3D404E':''"
            >
                <v-img src="../assets/aboutUs/han.png" contain height="130px" style="position:relative;bottom:20px" />
            </v-btn>

            <v-btn class="ma-2 elevation-0" @click="memberSelect(4)" @mouseover="memberSelect(4)"
                style="min-width:0px;margin:3px;height:100px;width:100px;border-radius:50px;background-color:#50989E;"
                :style="(this.selected==4)?'border:7px double #3D404E':''"
            >
                <v-img src="../assets/aboutUs/matt.png" contain height="110px" style="position:relative;bottom:25px;right:3px" />
            </v-btn>        

            <v-btn class="ma-2 elevation-0" @click="memberSelect(5)"  @mouseover="memberSelect(5)"
                style="min-width:0px;margin:3px;height:100px;width:100px;border-radius:50px;background-color:#8ABA97;"
                :style="(this.selected==5)?'border:7px double #3D404E':''"
            >
                <v-img src="../assets/aboutUs/xin.png" contain height="130px" style="position:relative;bottom:25px;right:3px" />
            </v-btn>   

            <v-btn class="ma-2 elevation-0" @click="memberSelect(6)"  @mouseover="memberSelect(6)"
                style="min-width:0px;margin:3px;height:100px;width:100px;border-radius:50px;background-color:#D5CCB3;"
                :style="(this.selected==6)?'border:7px double #3D404E':''"
            >
                <v-img src="../assets/aboutUs/yo.png" contain height="110px" style="position:relative;bottom:25px;right:9px" />
            </v-btn>   
            </div>    
        </v-card>
    </v-container>
    <v-container v-else class="ma-0 pa-0" fluid style="height:100vh;width:100vw;overflow:hidden;position:relative" >
        <swiper class="swiper" :options="swiperOption">
            <swiper-slide style="height:100vh"> 
            <v-card flat color="transparent" style="height:100%;width:100%;display: flex;align-items: center;">
                <!-- logo -->
                <div class="ma-auto" style="display:block">
                <img src="../assets/aboutUs/set.png" width="70%" class="ma-auto" style="display:block;"/>
                <v-card flat color="transparent" class="ma-auto" style="display:block;width:fit-content">
                    
                    <v-btn icon class="ma-2"><v-icon large>mdi-facebook</v-icon></v-btn>
                    <v-btn icon class="ma-2"><v-icon large>mdi-instagram</v-icon></v-btn>
                    <v-btn icon class="ma-2"><v-icon large>mdi-twitter</v-icon></v-btn>
                </v-card>
                </div>
            </v-card>
            </swiper-slide>
            <swiper-slide style="height:100vh"> 
            <v-card flat color="transparent" style="height:100%;width:100%;display: flex;align-items: center;">
                <!-- wish -->
                <div class="my-auto" style="display:flex; align-items:center; padding:0% 20%" >
                <v-card class="text-center" flat color="transparent" style="display:block;width:fit-content;">
                    <div>
                    <v-avatar size="58vw" color="#FFA863" style="position:absolute;right:0;top:-1vh;border:8px double #26282D"></v-avatar>
                    <img src="../assets/aboutUs/wish.png" width="100%" style="display:block;position:relative;right:2vw"/>
                    </div>
                    <v-card-title class="justify-center mx-1 mb-2 mt-8 pa-0" style="font-weight: bold;font-size:2.5rem;color:#F7EB92">陳位旭</v-card-title>
                    <v-card-title class="justify-center ma-1 pa-0" style="font-weight: bold;font-size:1rem">PM / Gaming / Script</v-card-title>
                    <v-card-title class="justify-center mx-1 my-6 pa-0" style="font-weight: bold;font-size:1.2rem">"凡事求個緣, idea不用選"</v-card-title>
                    <div>
                    <v-btn icon class="ma-0" ><v-icon>mdi-facebook</v-icon></v-btn>
                    <v-btn icon class="ma-0"><v-icon>mdi-instagram</v-icon></v-btn>
                    <!-- <v-btn icon class="ma-2"><v-icon large>mdi-twitter</v-icon></v-btn> -->
                    </div>
                </v-card>
                </div>
            </v-card>
            </swiper-slide>
            <swiper-slide style="height:100vh"> 
            <v-card flat color="transparent" style="height:100%;width:100%;display: flex;align-items: center;">
                <!-- yi -->
                <div class="my-auto" style="display:flex; align-items:center; padding:0% 20%">
                <v-card class="text-center" flat color="transparent" style="display:block;width:fit-content;">
                    <div>
                    <v-avatar size="58vw" color="#D04F57" style="position:absolute;right:0;border:8px double #26282D"></v-avatar>
                    <img src="../assets/aboutUs/yi.png" width="100%" style="display:block;position:relative;right:1vw"/>
                    </div>
                    <v-card-title class="justify-center mx-1 mb-2 mt-8 pa-0" style="font-weight: bold;font-size:2.5rem;color:#F7EB92">陳庭毅</v-card-title>
                    <v-card-title class="justify-center ma-1 pa-0" style="font-weight: bold;font-size:1rem">Back / Designer / Gaming</v-card-title>
                    <v-card-title class="justify-center mx-1 my-6 pa-0" style="font-weight: bold;font-size:1.2rem">"0°C=32°F, 0°C+0°C=64°F"</v-card-title>
                    <div>
                    <v-btn icon class="ma-0" ><v-icon>mdi-facebook</v-icon></v-btn>
                    <v-btn icon class="ma-0" ><v-icon>mdi-instagram</v-icon></v-btn>
                    <!-- <v-btn icon class="ma-2"><v-icon large>mdi-twitter</v-icon></v-btn> -->
                    </div>
                </v-card>
                </div>
            </v-card>
            </swiper-slide> 
            <swiper-slide style="height:100vh"> 
            <v-card flat color="transparent" style="height:100%;width:100%;display: flex;align-items: center;">
                <!-- han -->
                <div class="my-auto" style="display:flex; align-items:center; padding:0% 20%">
                <v-card class="text-center" flat color="transparent" style="display:block;width:fit-content;">
                    <div>
                    <v-avatar size="58vw" color="#5D63AF" style="position:absolute;right:0;border:8px double #26282D"></v-avatar>
                    <img src="../assets/aboutUs/han.png" width="100%" style="display:block;position:relative;top:1vh;right:1vw"/>
                    </div>
                    <v-card-title class="justify-center mx-1 mb-2 mt-8 pa-0" style="font-weight: bold;font-size:2.5rem;color:#F7EB92">蔡函璇</v-card-title>
                    <v-card-title class="justify-center ma-1 pa-0" style="font-weight: bold;font-size:1rem">Full Track</v-card-title>
                    <v-card-title class="justify-center mx-1 my-6 pa-0" style="font-weight: bold;font-size:1.2rem">"魔鬼藏在細節裡"</v-card-title>
                    <div>
                    <v-btn icon class="ma-0" ><v-icon>mdi-facebook</v-icon></v-btn>
                    <v-btn icon class="ma-0"><v-icon>mdi-instagram</v-icon></v-btn>
                    <!-- <v-btn icon class="ma-2"><v-icon large>mdi-twitter</v-icon></v-btn> -->
                    </div>
                </v-card>
                </div>
            </v-card>
            </swiper-slide>
            <swiper-slide style="height:100vh"> 
            <v-card flat color="transparent" style="height:100%;width:100%;display: flex;align-items: center;">
                <!-- matt -->
                <div class="my-auto" style="display:flex; align-items:center; padding:0% 20%">
                <v-card class="text-center" flat color="transparent" style="display:block;width:fit-content;">
                    <div>
                    <v-avatar size="58vw" color="#50989E" style="position:absolute;right:0;border:8px double #26282D"></v-avatar>
                    <img src="../assets/aboutUs/matt.png" width="100%" style="display:block;position:relative;right:2vw"/>
                    </div>
                    <v-card-title class="justify-center mx-1 mb-2 mt-8 pa-0" style="font-weight: bold;font-size:2.5rem;color:#F7EB92">王崇名</v-card-title>
                    <v-card-title class="justify-center ma-1 pa-0" style="font-weight: bold;font-size:1rem">Front / App</v-card-title>
                    <v-card-title class="justify-center mx-1 my-6 pa-0" style="font-weight: bold;font-size:1.2rem">"擔心未來就跟以為嚼口香糖就能解代數一樣"</v-card-title>
                    <div>
                    <v-btn icon class="ma-0"><v-icon>mdi-facebook</v-icon></v-btn>
                    <v-btn icon class="ma-0"><v-icon>mdi-instagram</v-icon></v-btn>
                    <!-- <v-btn icon class="ma-2"><v-icon large>mdi-twitter</v-icon></v-btn> -->
                    </div>
                </v-card>
                </div>
            </v-card>
            </swiper-slide>
            <swiper-slide style="height:100vh"> 
            <v-card flat color="transparent" style="height:100%;width:100%;display: flex;align-items: center;">
                <!-- xin -->
                <div class="my-auto" style="display:flex; align-items:center; padding:0% 20%">
                
                <v-card class="text-center" flat color="transparent" style="display:block;width:fit-content;">
                    <div>
                    <v-avatar size="58vw" color="#8ABA97" style="position:absolute;right:0;top:2vh;border:8px double #26282D"></v-avatar>
                    <img src="../assets/aboutUs/xin.png" width="110%" style="display:block;position:relative;right:5vw;"/>
                    </div>
                    <v-card-title class="justify-center mx-1 mb-2 mt-8 pa-0" style="font-weight: bold;font-size:2.5rem;color:#F7EB92">劉心鈺</v-card-title>
                    <v-card-title class="justify-center ma-1 pa-0" style="font-weight: bold;font-size:1rem">Front / App</v-card-title>
                    <v-card-title class="justify-center mx-1 my-6 pa-0" style="font-weight: bold;font-size:1.2rem">"把興趣放在比夢想更高得位置"</v-card-title>
                    <div>
                    <v-btn icon class="ma-0" ><v-icon>mdi-facebook</v-icon></v-btn>
                    <v-btn icon class="ma-0" ><v-icon>mdi-instagram</v-icon></v-btn>
                    <!-- <v-btn icon class="ma-2"><v-icon large>mdi-twitter</v-icon></v-btn> -->
                    </div>
                </v-card>
                </div>
            </v-card>
            </swiper-slide>
            <swiper-slide style="height:100vh"> 
            <v-card flat color="transparent" style="height:100%;width:100%;display: flex;align-items: center;">
                <!-- yo -->
                <div class="my-auto" style="display:flex; align-items:center; padding:0% 20%" >
                
                <v-card class="text-center" flat color="transparent" style="display:block;width:fit-content;">
                    <div>
                    <v-avatar size="58vw" color="#D5CCB3" style="position:absolute;right:0;border:8px double #26282D"></v-avatar>
                    <img src="../assets/aboutUs/yo.png" width="100%" style="display:block;position:relative;right:5vw"/>
                    </div>
                    <v-card-title class="justify-center mx-1 mb-2 mt-8 pa-0" style="font-weight: bold;font-size:2.5rem;color:#F7EB92">郭芮佑</v-card-title>
                    <v-card-title class="justify-center ma-1 pa-0" style="font-weight: bold;font-size:1rem">Designer</v-card-title>
                    <v-card-title class="justify-center mx-1 my-6 pa-0" style="font-weight: bold;font-size:1.2rem">"該做的就是要馬上做免得忘記"</v-card-title>
                    <div>
                    <v-btn icon class="ma-0" ><v-icon >mdi-facebook</v-icon></v-btn>
                    <v-btn icon class="ma-0" ><v-icon >mdi-instagram</v-icon></v-btn>
                    <!-- <v-btn icon class="ma-2"><v-icon large>mdi-twitter</v-icon></v-btn> -->
                    </div>
                </v-card>
                
                </div>
            </v-card>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </v-container>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
export default {
    name: "AboutUs",
    data(){
        return{
            // member:[
            //     {photo: '../assets/aboutUs/wish.png',name:'陳位旭',position:'PM / Gaming / Script ',motto:'"凡事求個緣, idea不用選"',fb:'',ig:''},
            //     {photo:'../assets/aboutUs/yi.png',name:'陳庭毅',position:'Back / Designer / Gaming',motto:'"0°C=32°F, 0°C+0°C=64°F"',fb:'',ig:''},
            //     {photo:'../assets/aboutUs/han.png',name:'蔡函璇',position:'Full Track',motto:'"魔鬼藏在細節裡"',fb:'',ig:''},
            //     {photo:'../assets/aboutUs/matt.png',name:'王崇名',position:'Front / App',motto:'"擔心未來就跟以為嚼口香糖就能解代數一樣"',fb:'',ig:''},
            //     {photo:'../assets/aboutUs/xin.png',name:'劉心鈺',position:'Front / App',motto:'"把興趣放在比夢想更高得位置"',fb:'',ig:''},
            //     {photo:'../assets/aboutUs/yo.png',name:'郭芮佑',position:'Designer',motto:'"該做的就是要馬上做免得忘記"',fb:'',ig:''},
            // ],
            // displayMember:false,
            // displayPhoto:'',
            // displayName:'',
            // displayPosition:'',
            // displayMotto:'',
            // displayFb:'',
            // displayIg:'',
            selected:0,
            swiperOption: {
                notNextTick: true,
                direction: "horizontal",
                grabCursor: true,
                setWrapperSize: true,
                autoHeight: true,
                slidesPerView: 1,
                mousewheel: true,
                mousewheelControl: true,
                width:window.innerWeight,
                height: window.innerHeight,
                resistanceRatio: 0,
                observeParents: true,
                pagination: {
                    el: '.swiper-pagination'
                }
            }
        }
    },
    components:{
        Swiper,
        SwiperSlide,
    },
    methods:{
        memberSelect(index){
            this.selected=index;
            console.log('who'+this.selected)
            // if(this.selected!=0){
            //     this.displayMember=true;
            //     this.displayPhoto=this.member[index-1].photo;
            //     this.displayName=this.member[index-1].name;
            //     this.displayPosition=this.member[index-1].position;
            //     this.displayMotto=this.member[index-1].motto;
            //     this.displayFb=this.member[index-1].fb;
            //     this.displayIg=this.member[index-1].ig;
            // }else{
            //     this.displayMember=false;
            //     this.displayPhoto='';
            //     this.displayName='';
            //     this.displayPosition='';
            //     this.displayMotto='';
            //     this.displayFb='';
            //     this.displayIg='';
            // }
        }
    }
}
</script>
<style>
.member .v-responsive {
max-width: 130px;
}
:root {
  --swiper-theme-color: #F7EB92 !important;
}
</style>