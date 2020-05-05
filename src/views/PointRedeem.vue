<template>
    <v-row>
        <!-- v-if="!cartModal" -->
        <v-flex  xs12 sm12 md12  v-if="!cartModal">
            <div class="header">
            <v-card flat>
                <v-card-actions class="icon">
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-icon class="pb-2" large >mdi-alpha-p-circle-outline</v-icon>
                    <v-card-title class="pb-3">{{totalPoint}}</v-card-title>
                
                    <v-spacer></v-spacer>

                    <v-badge
                        :content="cart"
                        :value="cart"
                        color="#efca16"
                    >
                        <v-icon v-on:click="lookCart()" class="pb-2" color="#cccccc" large>mdi-cart</v-icon>
                    </v-badge>
                    
                    
                
                    <!-- <v-badge
                        :content="heart"
                        :value="heart"
                        color="#efca16"
                    >
                        <v-icon class="pb-2" color="#cccccc" large>mdi-heart</v-icon>
                    </v-badge> -->
                </v-card-actions>
            </v-card>
            </div>
        </v-flex>

        <!-- cart -->

        <v-flex xs12 sm12 md12 v-if="cartModal" >
            <v-container fluid>
            <div class="header">
            <v-card flat >
                <v-card-actions class="icon">
                    <v-btn icon class="back">
                        <v-icon @click="cartModal=!cartModal" large  >mdi-arrow-left-circle</v-icon>
                    </v-btn>
                    <v-spacer/>
                    <v-spacer/>
                    <v-spacer/>
                    <v-icon large>mdi-alpha-p-circle-outline</v-icon>
                    <v-card-title >{{totalPoint}}</v-card-title>
                    <v-spacer/>
                    <v-card-title >總額 {{sumcart}}</v-card-title>
                    <v-spacer/>
                    <v-btn v-on:click="buy()" color="#efca16">確認購買</v-btn>
                </v-card-actions>
            </v-card>
            </div>
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="redeemGoods"
                :single-select="false"
                item-key="name"
                show-select
                class="elevation-1"
                hide-default-footer
            >
                <template v-slot:item.name="{ item }">
                        <v-img :src="item.img" class="cartImg"></v-img>
                        <div class="cartContent">
                            <v-card-title class="cartT" >{{item.name}}</v-card-title>
                            <v-card-text class="cartT" style="font-size: 12px;">{{item.intro}}</v-card-text>
                        </div>
                </template>
                <template v-slot:item.point="{ item }">
                    {{(item.point*item.quantity)}}
                </template>
                <template v-slot:item.quantity="{ item }">
                    <v-icon v-on:click="modifyQuantity(item,-1)" class="cartquant">mdi-menu-left</v-icon>
                    <h4 class="cartQuant">{{ item.quantity }}</h4>
                    <v-icon v-on:click="modifyQuantity(item,1)" class="cartQuant">mdi-menu-right</v-icon>
                </template>
            </v-data-table>

            </v-container>
        </v-flex>

        <!-- goods -->

        <v-flex xs6 sm3 md3 v-else v-for="item in goods" :key="item.name" class="item">
                <v-crad class="card">
                    <v-img :src="item.img" class="img"></v-img>
                    <v-card-title class="pb-0">{{item.name}}</v-card-title>
                    <v-card-text class="pb-0" style="font-size: 12px;">{{item.intro}}</v-card-text>
                    <v-icon class="pb-1">mdi-alpha-p-circle-outline</v-icon>
                    <v-card-subtitle class="pb-1" >{{item.point}}</v-card-subtitle>
                    <v-card-actions class="icon">
                        <v-spacer></v-spacer>
                        <!-- <v-btn icon v-on:click="addLike(item)">
                            <v-icon @click="heart++">mdi-heart</v-icon>
                        </v-btn> -->

                        <v-btn icon v-on:click="addCart(item)">
                            <v-icon @click="cart++">mdi-cart</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-crad>
        </v-flex>
    </v-row>
</template>
<script>
// import PointRedeemCart from "../components/PointRedeemCart";
export default {
    name: "PointRedeem",
    data: () => ({

        cartModal:false,

        goods:[
            {img:"https://fakeimg.pl/100x100/cccccc/",name:"竹蜻蜓",intro:"飛飛飛飛飛飛飛飛飛飛飛飛飛飛飛飛飛飛",point:"200"},
            {img:"https://fakeimg.pl/100x100/cccccc/",name:"翻譯機",intro:"翻翻翻翻翻翻翻翻翻翻翻翻翻翻翻翻翻翻",point:"100"},
            {img:"https://fakeimg.pl/100x100/cccccc/",name:"黑洞",intro:"黑黑黑黑黑黑黑黑黑黑黑黑黑黑黑黑黑黑",point:"500"},
            {img:"https://fakeimg.pl/100x100/cccccc/",name:"蟲洞",intro:"蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲",point:"900"},
            {img:"https://fakeimg.pl/100x100/cccccc/",name:"30秒無敵",intro:"蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲",point:"900"},
            
        ],

        redeemGoods:[
            // {img:"https://fakeimg.pl/100x100/cccccc/",name:"竹蜻蜓",intro:"飛飛飛飛飛飛飛飛飛飛飛飛飛飛飛飛飛飛",point:"200",quantity:1},
        ],
        likeGoods:[],
        totalPoint:20000000,//原有的
        cart:0,
        // heart:0,

        selected: [],
        headers: [
          { text: 'Item', align: 'start',
            sortable: false,value: 'name' },
          { text: 'Point', value: 'point' },
          { text: 'Quantity', value: 'quantity' },
        ],
        sumPoint:0,


  }),
  components:{
    // PointRedeemCart  
  },
  computed:{
        sumcart(){
            var total=0
            this.selected.forEach(element => {
                total+=(element.point*element.quantity)
            });
            return total
        }
  },
  methods:{
      addCart(item){

          var goodExist=false

          this.redeemGoods.forEach(element => {
              if(element.name==item.name){
                  element.quantity++;
                  goodExist=true;
              }     
          });
        
        if(!goodExist){
          this.redeemGoods.push({img:item.img,name:item.name,intro:item.intro,point:item.point,quantity:1});
        }
        
      },
      addLike(item){
          if(this.likeGoods.includes(item)){
             this.likeGoods.push(item)
          }else{
              this.likeGoods.push(item)
          }
          
      },
      modifyQuantity(item,idx){
            if(item.quantity>0 || idx==1){
                item.quantity+=idx
                this.cart+=idx
            }
      },
      
      buy(){
            if(this.sumcart==0){
                confirm("請選擇商品");
            }
            else if(this.totalPoint>=this.sumcart){
                this.totalPoint-=this.sumcart;
                //還要記錄點數的運用
                var Re_idx=0;
                this.redeemGoods.forEach(element => {//bug
                    var Se_idx=0;
                    console.log(element.name+this.redeemGoods.length);
                    this.selected.forEach(item => {
                        console.log(element.name+"//"+item.name)
                        if(item.name==element.name){
                            console.log(element.name)
                            this.redeemGoods.splice(Re_idx,1)
                            this.selected.splice(Se_idx,1);
                        }
                        Se_idx++;
                    });
                    Re_idx++;
                });

                // this.selected.splice(0, this.selected.length);
                this.sumcart;
                this.cart=0
                confirm("確認購買");
            
                //還要記錄他買了甚麼
            }else{
                confirm("點數不夠QQ");
            }
        
      },
      lookCart(){
          this.selected=this.redeemGoods;
          this.cartModal=!this.cartModal;
          console.log(this.redeemGoods)
      }
  }
    
}
</script>
<style scoped>
.header{
    border-bottom: #cccccc 1px solid;
    margin: 10px;
    padding: 5px;
}
.item{
    padding: 5px;
    
}
.img{
    margin: 10px;
}
.pb-0{
    padding: 0;
    margin:0 10px;
}
.pb-1{
    padding: 0;
    margin: 0 0 0 10px;
    display: inline;
    font-size: 18px;

}
.pb-2{
    padding: 0;
    margin: 0 0 0 20px;
    display: inline;
    font-size: 25px;
    color:#6b6b6b;

}
.pb-3{
    padding: 0;
    margin: 0 0 0 10px;
    display: inline;
    font-size: 25px;
    color:#6b6b6b;
}
.icon{
    margin: 0;
    padding: 0 10px;
}
.cartImg{
    height: 50px;
    width:50px;
    display: inline-block;
    margin: 0 5px;
}
.cartContent{
    display: inline-block;
    margin: 10px;
    padding: 0;
}
.cartSum{
    display: inline-block;
    margin:   5px;
    padding: 0;
}

.cartT{
    margin: 0px;
    padding: 0;
}
.cartQuant{
    display: inline-block;
}
.buyBtn{
    margin-right: 10% ;
    margin-top: 1.5%;
    margin-left: 10;
}
.back :hover{
    color: #efca16;
}

</style>