<template>
<v-container fluid>
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
            <v-img :src="item.img" class="img"></v-img>
            <div class="contentx">
                <v-card-title class="pb-0">{{item.name}}</v-card-title>
                <v-card-text class="pb-0" style="font-size: 12px;">{{item.intro}}</v-card-text>
            </div>
    </template>
    <template v-slot:item.point="{ item }">
        {{(item.point*item.quantity)}}
    </template>
    <template v-slot:item.quantity="{ item }">
          <v-icon v-on:click="modifyQuantity(item)" class="quan">mdi-menu-left</v-icon>
          <h4 class="quan">{{ item.quantity }}</h4>
          <v-icon @click="item.quantity++" class="quan">mdi-menu-right</v-icon>
    </template>
  </v-data-table>
  <v-card>
      <v-row>
        <v-spacer></v-spacer>
        <v-icon >mdi-alpha-p-circle-outline</v-icon>
        <v-card-title >{{point}}</v-card-title>
        <v-card-title>總額 {{sumcart}}</v-card-title>
        <v-btn v-on:click="buy()">確認購買</v-btn>
      </v-row>
  </v-card>
</v-container>
</template>

<script>
  export default {
    data () {
      return {
        point:this.totalPoint,
        singleSelect: false,
        selected: this.redeemGoods,
        headers: [
          { text: 'Item', align: 'start',
            sortable: false,value: 'name' },
          { text: 'Point', value: 'point' },
          { text: 'Quantity', value: 'quantity' },
        ],
        goods:[
            {img:"https://fakeimg.pl/100x100/cccccc/",name:"竹蜻蜓",intro:"飛飛飛飛飛飛飛飛飛飛飛飛飛飛飛飛飛飛",point:"200",quantity:"2"},
            {img:"https://fakeimg.pl/100x100/cccccc/",name:"翻譯機",intro:"翻翻翻翻翻翻翻翻翻翻翻翻翻翻翻翻翻翻",point:"100",quantity:"1"},
            {img:"https://fakeimg.pl/100x100/cccccc/",name:"黑洞",intro:"黑黑黑黑黑黑黑黑黑黑黑黑黑黑黑黑黑黑",point:"500",quantity:"1"},
            {img:"https://fakeimg.pl/100x100/cccccc/",name:"蟲洞",intro:"蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲",point:"900",quantity:"1"},
            {img:"https://fakeimg.pl/100x100/cccccc/",name:"30秒無敵",intro:"蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲蟲",point:"900",quantity:"1"},
            
        ],
        sumPoint:0,
      }
    },
    props:{
        redeemGoods: {
        type:Object,
        },
        totalPoint:{
            type:Number,
        }
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
        modifyQuantity(item){
            if(item.quantity>0){
                item.quantity--
            }
            


            // if(item.quantity<=0){
            //     var idx=0;
            //     this.redeemGoods.forEach(element => {
            //         if(element.name==item.name){
            //             this.redeemGoods.splice(idx, 1)
            //         }
            //         idx++
            //     });
            // }

        },
        buy(){
            if(this.totalPoint>=this.sumcart){
                this.point-=this.sumcart;
                this.totalPoint=this.point;
                this.redeemGoods.splice(0, this.redeemGoods.length);
                this.selected.splice(0, this.selected.length);
                this.sumcart;
                confirm("確認購買");
                console.log(this.totalPoint);  
            }else{
                confirm("點數不夠QQ");
            }
            
        }
    }

  }
</script>


<style scoped>

.img{
    height: 50px;
    width:50px;
    display: inline-block;
    margin: 0 5px;
}
.contentx{
    display: inline-block;
}
.quan{
    display: inline-block;
}


</style>