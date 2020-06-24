<template>
  <v-container
    fluid
    style="padding: 120px 0px 10px 50px;position:fixed; max-width:1250px;"
    v-if="$vuetify.breakpoint.mdAndUp"
  >
    <!-- v-if="!cartModal" -->
    <!-- laptop title-->
    <v-row xs6 sm2 md2 lg2 v-if="!cartModal " class="sub-header d-flex">
      <v-flex>
        <v-card-title class="offset-8">
          <v-icon size="30">mdi-alpha-p-circle-outline</v-icon>
          {{totalPoint}}
        </v-card-title>
      </v-flex>
      <v-flex xs6 sm2 md2 lg2>
        <v-badge :content="cart" :value="cart" class="mt-4 mr-8">
          <v-icon v-on:click="lookCart()" color="#cccccc" size="30">mdi-cart-arrow-right</v-icon>
        </v-badge>
      </v-flex>
      <v-flex xs6 sm2 md2 lg2 class="d-flex align-center">
        <v-select
          v-model="propTypeSelected"
          :items="goods"
          item-text="name"
          item-value="name"
          label="name"
          class="selector"
          dense
        ></v-select>
      </v-flex>
    </v-row>

    <!-- laptop cart -->
    <v-flex xs12 sm12 md12 v-if="cartModal && $vuetify.breakpoint.mdAndUp">
      <div class="sub-header">
        <v-card flat style="background-color: #ffffff00;">
          <v-card-actions class="icon">
            <v-btn icon class="back">
              <v-icon @click="cartModal=!cartModal" large>mdi-arrow-left-circle</v-icon>
            </v-btn>
            <v-icon large class="offset-6">mdi-alpha-p-circle-outline</v-icon>
            <v-card-title>{{totalPoint}}</v-card-title>
            <v-spacer />
            <v-card-title>總額 {{sumcart}}</v-card-title>
            <v-spacer />
            <v-btn v-on:click="buy()" color="#6d6b6b">確認購買</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <v-card flat class="scroll" style="height:70vh;background-color:#ffffff00;">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="redeemGoods"
          :single-select="false"
          item-key="_id"
          show-select
          class="elevation-1 col-12"
          hide-default-footer
        >
          <template v-slot:item.name="{ item }">
            <v-img :src="item.photo" class="cartImg mt-3"></v-img>
            <div class="cartContent">
              <v-card-title class="cartT">{{item.name}}</v-card-title>
              <v-card-text class="cartT" style="font-size: 12px;">{{item.intro}}</v-card-text>
            </div>
          </template>
          <template v-slot:item.point="{ item }">{{(item.point*item.quantity)}}</template>
          <template v-slot:item.quantity="{ item }">
            <v-icon v-on:click="modifyQuantity(item,-1)" class="cartquant">mdi-menu-left</v-icon>
            <h4 class="cartQuant">{{ item.quantity }}</h4>
            <v-icon v-on:click="modifyQuantity(item,1)" class="cartQuant">mdi-menu-right</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>

    <!-- goods -->
    <v-card flat style="height:70vh;background-color:#ffffff00;" class="scroll">
      <v-row v-if="loading">
        <v-flex xs6 sm4 md3 v-for="item in 8" :key="item" class="item">
          <v-skeleton-loader type="card" :loading="loading"></v-skeleton-loader>
        </v-flex>
      </v-row>
      <v-row v-if="!loading && !cartModal">
        <v-flex xs6 sm4 md2 v-for="item in filterPropType" :key="item.name" class="item">
          <v-card flat class="py-2 px-2">
            <v-img :src="item.photo" class="img"></v-img>

            <v-card-title class="pb-0">{{item.name}}</v-card-title>
            <v-card-text class="pb-0" style="font-size: 12px;">{{item.intro}}</v-card-text>
            <v-icon class="pb-1">mdi-alpha-p-circle-outline</v-icon>
            <v-card-subtitle class="pb-1">{{item.point}}</v-card-subtitle>
            <v-card-actions class="icon mb-0" style="float:right;padding:0 0 0 0;">
              <!-- <v-btn icon v-on:click="addLike(item)">
                            <v-icon @click="heart++">mdi-heart</v-icon>
              </v-btn>-->

              <v-btn icon v-on:click="addCart(item)">
                <v-icon size="20">mdi-cart-arrow-down</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-row>
    </v-card>
  </v-container>
  <v-container fluid style="padding: 47px 22px 10px 50px;position:fixed;max-width:350px;" v-else>
    <!-- mobile title-->
    <v-row
      xs6
      sm2
      md2
      lg2
      v-if="!cartModal && $vuetify.breakpoint.smAndDown"
      class="sub-header d-flex"
    >
      <v-flex>
        <v-card-title class="mt-6 pa-0">
          <v-icon size="25">mdi-alpha-p-circle-outline</v-icon>
          {{totalPoint}}
        </v-card-title>
      </v-flex>
      <v-flex xs4 sm2 md2 lg2>
        <v-badge :content="cart" :value="cart" class="mt-6">
          <v-icon v-on:click="lookCart()" color="#cccccc" size="25">mdi-cart-arrow-right</v-icon>
        </v-badge>
      </v-flex>
      <v-flex xs4 sm2 md2 lg2 class="mt-4 d-flex align-center">
        <v-select
          v-model="propTypeSelected"
          :items="goods"
          item-text="name"
          item-value="name"
          label="name"
          class="selector"
          dense
        ></v-select>
      </v-flex>
    </v-row>
    <!-- mobile cart -->

    <v-flex xs12 sm12 v-if="cartModal && $vuetify.breakpoint.smAndDown">
      <div class="sub-header">
        <v-card flat style="background-color: #ffffff00;">
          <v-card-actions class="icon">
            <v-btn icon class="back mt-3">
              <v-icon size="25" @click="cartModal=!cartModal">mdi-arrow-left-circle</v-icon>
            </v-btn>
            <v-icon size="25" class="mt-3">mdi-alpha-p-circle-outline</v-icon>
            <v-card-title class="pa-0 mt-3" style="font-size:15px;">{{totalPoint}}</v-card-title>
            <v-spacer />
            <v-card-title class="pa-0 mt-3" style="font-size:15px;">總額 {{sumcart}}</v-card-title>
            <v-spacer />
            <v-btn v-on:click="buy()" class="pa-0 mt-3" color="#6d6b6b" style="font-size:12px;">確認購買</v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <v-card flat class="scroll" style=" height:83vh;background-color: #ffffff00;">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="redeemGoods"
          :single-select="false"
          item-key="_id"
          show-select
          class="elevation-1 col-12 redeemCart"
          hide-default-footer
        >
          <template v-slot:item.name="{ item }">
            <v-img :src="item.photo" style="height:100px;width:100px;" contain></v-img>
            <div class="cartContent">
              <v-card-text class="cartT mt-1" style="font-size: 20px;text-align:left;">{{item.name}}</v-card-text>
              <v-card-text
                class="cartT mt-1"
                style="font-size: 12px;text-align:left;"
              >{{item.intro}}</v-card-text>
            </div>
          </template>
          <template v-slot:item.point="{ item }">
            <v-card-text style="font-size: 20px;">{{(item.point*item.quantity)}}</v-card-text>
          </template>
          <template v-slot:item.quantity="{ item }">
            <v-icon v-on:click="modifyQuantity(item,-1)" class="cartquant">mdi-menu-left</v-icon>
            <h4 class="cartQuant">{{ item.quantity }}</h4>
            <v-icon v-on:click="modifyQuantity(item,1)" class="cartQuant">mdi-menu-right</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
    <!-- goods -->
    <v-card flat style="height:83vh;background-color:#ffffff00;" class="scroll">
      <v-row v-if="loading">
        <v-flex xs6 sm4 md3 v-for="item in 8" :key="item" class="item">
          <v-skeleton-loader type="card" :loading="loading"></v-skeleton-loader>
        </v-flex>
      </v-row>
      <v-row v-if="!loading && !cartModal">
        <v-flex xs6 sm4 md2 v-for="item in filterPropType" :key="item.name" class="item">
          <v-card flat class="py-2 px-2">
            <v-img :src="item.photo" class="img"></v-img>

            <v-card-title class="pa-0 ml-3">{{item.name}}</v-card-title>
            <v-card-text class="pa-0 ml-3" style="font-size: 12px;">{{item.intro}}</v-card-text>
            <v-icon class="pb-1">mdi-alpha-p-circle-outline</v-icon>
            <v-card-subtitle class="pb-1 pl-0">{{item.point}}</v-card-subtitle>
            <v-card-actions class="pa-0 mt-0" style="float:right;">
              <v-btn icon v-on:click="addCart(item)">
                <v-icon size="20">mdi-cart-arrow-down</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
// import PointRedeemCart from "../components/PointRedeemCart";
import { ignoreNotLoginError } from "../utils";

export default {
  name: "PointRedeem",
  inject: ["$alert", "$confirm"],
  data: () => ({
    loading: true,

    cartModal: false,

    goods: [],

    redeemGoods: [],
    likeGoods: [],
    cart: 0,

    selected: [],
    headers: [
      { text: "Item", align: "start", sortable: false, value: "name" },
      { text: "Point", value: "point" },
      { text: "Quantity", value: "quantity" }
    ],
    sumPoint: 0,
    propTypeSelected: "All"
  }),
  components: {
    // PointRedeemCart
  },
  asyncComputed: {
    goods: {
      get() {
        return this.$http.get("/goods").then(res => {
          this.loading = false;
          return res.data;
        });
      },
      default: []
    }
  },
  computed: {
    totalPoint() {
      return this.$api.user.profile.rewardPoints;
    },
    sumcart() {
      var total = 0;
      this.selected.forEach(element => {
        total += element.point * element.quantity;
      });
      return total;
    },
    filterPropType() {
      return this.propTypeSelected != "All"
        ? this.goods.filter(item => item.name === this.propTypeSelected)
        : this.goods;
    }
  },
  methods: {
    addCart(item) {
      this.cart++;
      var goodExist = false;

      this.redeemGoods.forEach(element => {
        if (element.name == item.name) {
          element.quantity++;
          goodExist = true;
        }
      });

      if (!goodExist) {
        this.redeemGoods.push({
          _id: item._id,
          photo: item.photo,
          name: item.name,
          intro: item.intro,
          point: item.point,
          quantity: 1
        });
      }
    },
    addLike(item) {
      if (this.likeGoods.includes(item)) {
        this.likeGoods.push(item);
      } else {
        this.likeGoods.push(item);
      }
    },
    modifyQuantity(item, idx) {
      if (item.quantity > 0 || idx == 1) {
        item.quantity += idx;
        this.cart += idx;
      }
    },

    buy() {
      if (this.sumcart == 0) {
        this.$alert.warning("請選擇商品");
      } else if (this.totalPoint >= this.sumcart) {
        this.$confirm.open("確認購買?", () => {
          const proms = [];

          for (const goods of this.selected) {
            proms.push(
              this.$http.post(`/point/consume/${goods._id}`, {
                quantity: goods.quantity
              })
            );

            this.redeemGoods.forEach((item, index) => {
              if (item.name == goods.name) {
                this.redeemGoods.splice(index, 1);
              }
            });
          }

          this.cart -= this.selected.length;
          this.selected = [];

          Promise.all(proms)
            .then(() => {
              this.$api.updateProfile();
              this.$alert.success("購買成功");
            })
            .catch(ignoreNotLoginError)
            .catch(err => {
              console.log(err);
              this.$alert.error("購買失敗，可能部份商品未購買成功");
            });
        });
      } else {
        this.$alert.warning("點數不夠QQ");
      }
    },
    lookCart() {
      this.selected = this.redeemGoods.slice();
      this.cartModal = !this.cartModal;
    }
  }
};
</script>
<style>
.item {
  padding: 5px;
}
.img {
  margin: 10px;
  border-radius: 5px;
}
.py-2.theme--dark.v-sheet {
  background-color: transparent;
}
.py-2 .v-card__text {
  width: 90%;
}
.pb-0 {
  padding: 0;
  margin: 10px 10px 10px 10px;
}
.pb-1 {
  padding: 0;
  margin: 0 0 0 10px;
  display: inline;
  font-size: 18px;
}
.pb-2 {
  padding: 0;
  margin: 0 0 0 20px;
  display: inline;
  font-size: 25px;
  color: #6b6b6b;
}
.pb-3 {
  padding: 0;
  margin: 0 0 0 10px;
  display: inline;
  font-size: 25px;
  color: #6b6b6b;
}
.icon {
  margin: 0;
  padding: 0 10px;
}
.cartImg {
  height: 50px;
  width: 50px;
  display: inline-block;
  margin: 0 5px;
}
.cartContent {
  display: inline-block;
  margin: 10px;
  padding: 0;
}
.cartSum {
  display: inline-block;
  margin: 5px;
  padding: 0;
}

.cartT {
  margin: 0px;
  padding: 0;
}
.cartQuant {
  display: inline-block;
}
.buyBtn {
  margin-right: 10%;
  margin-top: 1.5%;
  margin-left: 10;
}
.back :hover {
  color: #6d6b6b;
}
.redeemCart .cartContent {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0px;
}
.redeemCart .cartT {
  padding: 0px;
}
.redeemCart .v-responsive {
  display: flex;
}
.redeemCart .v-data-table__mobile-row__cell {
  display: inline-block;
  width: 200px;
}
.redeemCart .v-input--selection-controls__ripple {
  display: none;
}
.redeemCart .v-data-table__checkbox.v-simple-checkbox {
  left: 0px;
}
</style>
