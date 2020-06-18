<template>
  <v-container class="category" fluid style="padding: 70px 50px 50px 50px;">
  <div v-if="$vuetify.breakpoint.smAndUp" style="height:70px"></div>
  <!-- ref: https://codepen.io/virtualadrian/pen/pOeVPX && Vuetify component: Card & Combobox & Chip-->
  <v-row >
    <v-row v-if="loading">
      <v-flex xs12 sm4 md3 v-for="item in 6" :key="item" class="pa-2">
        <v-boilerplate class="md-6" type=" table-heading,list-item-three-line"></v-boilerplate>
      </v-flex>
    </v-row>
    <v-row v-else>
    <v-flex xs12 sm12 md12 class="pl-2">
      <v-card-title class="ma-0 pa-0">自訂類別</v-card-title>
      <v-btn @click="newModal=true" class="elevation-0 mt-2 mb-2" style="background-color:transparent;border:white solid 1px;border-radius:2em;">新增類別</v-btn>
    </v-flex>
    <v-flex xs12 sm4 md3 v-for="category of categories" :key="category._id" class="pa-3">
      <v-card class="cardAll" style="border-radius:2em" :color="(category) ? category.color : '#d5ccb3'">
        <div class="pr-8 pl-8 pt-2 pb-2" style="width:100%;background-color:rgba(255,255,255,0.1);position: relative">
        <!-- <v-btn class="elevation-0" style="width:100%;height:fit-content;background-color:transparent"> -->
        <v-icon style="width:100%; opacity:0.6;padding:12px" size="8em" >{{category.icon}}</v-icon>
        <!-- </v-btn> -->
        <v-text-field
          class="headline"
          v-model="category.name"
          single-line
          solo
          dense
          flat
          hide-details
          hint="按下Enter以保存"
          style="position:absolute;bottom:0;left:0;"
          :disabled="category.userId == null"
          @keyup.tab="updateCategory(category._id, category.name)"
          @paste="updateCategory(category._id, category.name)"
          @keyup.enter="updateCategory(category._id, category.name)"
        >
        
        </v-text-field>
        </div>

        <v-btn
          icon
          class="editCard"
          v-if="category.userId != null"
          v-on:click="edit(category)"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        
        <v-btn
          icon
          class="deleteCard"
          v-if="category.userId != null"
          v-on:click="deleteCategory(category)"
        >
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>

        <v-combobox
          multiple
          v-model="category.hashtags"
          label="新增類別標籤"
          append-icon
          small-chips
          deletable-chips
          class="tag-input"
          style="border-radius:0;width:100%"
          :search-input.sync="category.search"
          @keyup.tab="updateTags(category._id,category.hashtags)"
          @paste="updateTags(category._id,category.hashtags)"
          @keyup.enter="updateTags(category._id,category.hashtags)"
          @change="updateTags(category._id,category.hashtags)"
          solo
          flat
          hint="輸入文字以新增標籤，按下Enter以保存"
          hide-details
        ></v-combobox>
      </v-card>
      <!-- <v-card-actions class="ma-0 mt-1 pa-0 px-7">
        <v-spacer />
        <v-btn v-if="category.userId != null" @click="edit(category)" class="ma-0 px-1 pa-0 elevation-0" style="font-size:10px;height:fit-content;width:fit-content;border-radius:0;">編輯</v-btn>
      </v-card-actions> -->
    </v-flex>


    <!-- for sm/md大小 -->
    <v-dialog v-if="$vuetify.breakpoint.smAndUp" v-model="newModal" width="60vw">
      <v-layout row class="pa-0 ma-0" style="background-color:#3D404E">
      <v-flex xs12 sm8 md8>
      <v-card flat class="modal px-4" color="#3D404E" v-if="newModal" >
        <!-- <div style="width:50vw"> -->
        <v-card-title v-if="oldCategory">編輯類別</v-card-title>
        <v-card-title v-else>新增類別</v-card-title>
        <v-text-field v-model="newCategoryName" label="請輸入類別名稱" class="px-4"></v-text-field>
        <v-card-title>選擇顏色</v-card-title>
        <v-card flat class="mx-4 scroll" color="#3D404E" max-height="12vh">
          <v-btn ref="category"  @click="colorSelected(item)" 
          v-for="(item,index) in categoryColor" :key="index" class="ma-1 elevation-0"
          style="width:fit-content;height:fit-content;border-radius:50px;background-color:#3D404E;padding:2px" :style="colorCircle(item)">
            <v-avatar :color="item" size="22" >
            </v-avatar>
          </v-btn> 
        </v-card> 

        <v-card-title>選擇圖示</v-card-title>
        <v-card flat class="mx-4 scroll" color="#3D404E" max-height="12vh">
          <v-btn ref="category"  @click="iconSelected(item)" 
          v-for="(item,index) in categoryIcon" :key="index" class="pa-1 elevation-0"
          style="width:fit-content;height:fit-content;border-radius:50px;background-color:#3D404E;" :style="iconCircle(item)">
            <v-icon>{{item}}</v-icon>
          </v-btn> 
        </v-card> 

        <v-card-actions>
          <v-spacer />
          <v-btn v-if="oldCategory==true" outlined class="button" @click="modify">修改</v-btn>
          <v-btn v-else outlined class="button" @click="save">新增</v-btn>
          <v-btn outlined class="button" @click="cancel">取消</v-btn>
        </v-card-actions>
        <!-- </div> -->
      </v-card>
      </v-flex>

      <!-- 預覽 -->
      <v-flex xs12 sm4 md4 class="my-auto">
        <v-card class="cardAll ma-5" style="border-radius:2em" :color="newCategoryColor">
        <div class="pr-8 pl-8 pt-2 pb-2" style="width:100%;background-color:rgba(255,255,255,0.1);position: relative">
        <v-icon style="width:100%" size="8em" >{{this.newCategoryIcon}}</v-icon>
        <v-text-field
          class="headline"
          v-model="newCategoryName"
          single-line
          solo
          dense
          flat
          hide-details
          style="position:absolute;bottom:0;left:0;"
        >
        </v-text-field>
        </div>

        <v-combobox
          multiple
          v-model="newTag"
          label="新增類別標籤"
          append-icon
          small-chips
          deletable-chips
          class="tag-input"
          style="border-radius:0;width:100%"
          :search-input.sync="search"
          solo
          flat
          hide-details
        ></v-combobox>
      </v-card>
      </v-flex>
      </v-layout>
    </v-dialog>

    <v-dialog v-else v-model="newModal" width="100vw">
      <v-layout row class="pa-0 ma-0" style="background-color:#3D404E">
      <!-- 預覽 -->
      <v-flex xs12 sm4 md4 class="my-auto" >
        <v-card-title v-if="oldCategory">編輯類別</v-card-title>
        <v-card-title v-else>新增類別</v-card-title>
        <v-card-text class="px-4 py-0" style="font-weight:bold"><v-icon class="px-2" size="18px">mdi-pencil</v-icon>編輯類別名稱</v-card-text>
        <v-card class="cardAll ma-5" style="border-radius:2em" :color="newCategoryColor">
        <div class="pr-8 pl-8 pt-2 pb-2" style="width:100%;background-color:rgba(255,255,255,0.1);position: relative">
        <v-icon style="width:100%" size="8em" >{{this.newCategoryIcon}}</v-icon>
        <v-text-field
          class="headline"
          label="新增類別名稱"
          v-model="newCategoryName"
          single-line
          solo
          dense
          flat
          hide-details
          style="position:absolute;bottom:0;left:0;"
        >
        </v-text-field>
        </div>

        <v-combobox
          multiple
          v-model="newTag"
          label="新增類別標籤"
          append-icon
          small-chips
          deletable-chips
          class="tag-input"
          style="border-radius:0;width:100%"
          :search-input.sync="search"
          solo
          flat
          hide-details
        ></v-combobox>
      </v-card>
      </v-flex>

      <v-flex xs12 sm8 md8>
      <v-card flat class="modal px-4" color="#3D404E" v-if="newModal" >
        <!-- <div style="width:50vw"> -->
        <!-- <v-text-field v-model="newCategoryName" label="請輸入類別名稱" class="px-4"></v-text-field> -->
        <v-card-text style="font-weight:bold" class="px-2 pt-0 pb-4"><v-icon class="px-2" size="18px">mdi-pencil</v-icon>編輯類別顏色</v-card-text>
        <!-- <v-card-title>選擇顏色</v-card-title> -->
        <v-card flat class="mx-4 scroll" color="#3D404E" max-height="12vh">
          <v-btn ref="category"  @click="colorSelected(item)" 
          v-for="(item,index) in categoryColor" :key="index" class="ma-1 elevation-0"
          style="width:fit-content;height:fit-content;border-radius:50px;background-color:#3D404E;padding:2px" :style="colorCircle(item)">
            <v-avatar :color="item" size="22" >
            </v-avatar>
          </v-btn> 
        </v-card> 
        <v-card-text style="font-weight:bold" class="px-2 py-4"><v-icon class="px-2" size="18px">mdi-pencil</v-icon>編輯類別圖示</v-card-text>
        <!-- <v-card-title>選擇圖示</v-card-title> -->
        <v-card flat class="mx-4 scroll" color="#3D404E" max-height="12vh">
          <v-btn ref="category"  @click="iconSelected(item)" 
          v-for="(item,index) in categoryIcon" :key="index" class="pa-1 elevation-0"
          style="width:fit-content;height:fit-content;border-radius:50px;background-color:#3D404E;" :style="iconCircle(item)">
            <v-icon>{{item}}</v-icon>
          </v-btn> 
        </v-card> 

        <v-card-actions>
          <v-spacer />
          <v-btn v-if="oldCategory==true" outlined class="button" @click="modify">修改</v-btn>
          <v-btn v-else outlined class="button" @click="save">新增</v-btn>
          <v-btn outlined class="button" @click="cancel">取消</v-btn>
        </v-card-actions>
        <!-- </div> -->
      </v-card>
      </v-flex>
      </v-layout>
    </v-dialog>

    <!-- <v-flex xs6 sm3 md3 class="pa-2" v-if="!loading">
      <v-card>
        <v-text-field
          label="新增類別名稱"
          prepend-inner-icon="mdi-shape-outline"
          dense
          solo
          flat
          hint="點擊右側按鈕以保存"
          v-model="newCategory"
        ></v-text-field>

        <v-divider></v-divider>

        <v-combobox
          prepend-inner-icon="mdi-tag-outline"
          multiple
          v-model="newTag"
          label="類別標籤"
          append-icon
          chips
          deletable-chips
          class="tag-input"
          :search-input.sync="search"
          clearable
          solo
          flat
          :disabled="!newCategory"
          :hint="!newCategory ? '請先輸入類別名稱': '輸入文字以新增標籤，點擊右上按鈕以保存'"
          :persistent-hint="!newCategory"
        ></v-combobox>

        <v-btn icon class="deleteCard" @click="save" :disabled="!newCategory">
          <v-icon style="transform:scaleX(-1)">mdi-shape-plus</v-icon>
        </v-btn>
      </v-card>
    </v-flex> -->
    </v-row>
  </v-row>
  </v-container>
</template>

<script>
import { confirmed } from "vee-validate/dist/rules";
import { ignoreNotLoginError } from "../utils";
export default {
  inject: ["$alert", "$confirm"],
  data: () => ({
    categoryIcon:["mdi-tag-outline",
    "mdi-silverware-fork-knife","mdi-silverware-spoon","mdi-food","mdi-noodles","mdi-pasta","mdi-food-croissant","mdi-food-apple","mdi-food-variant","mdi-rice","mdi-coffee","mdi-cookie","mdi-ice-pop","mdi-cake","mdi-hamburger","mdi-buffet","mdi-carrot",
    "mdi-bus","mdi-bus-stop","mdi-bus-side","mdi-train","mdi-airplane","mdi-subway-variant","mdi-car","mdi-car-hatchback","mdi-car-pickup","mdi-gas-station","mdi-bicycle","mdi-motorbike","mdi-moped","mdi-parking",
    "mdi-microphone","mdi-movie-open","mdi-movie-roll","mdi-filmstrip","mdi-bed","mdi-book-open-outline","mdi-bottle-wine","mdi-gamepad-variant","mdi-slot-machine","mdi-ferris-wheel","mdi-spa","mdi-theater",
    "mdi-hanger","mdi-tshirt-crew-outline","mdi-lingerie","mdi-glasses","mdi-hat-fedora","mdi-shoe-formal","mdi-watch","mdi-necklace","mdi-bag-personal-outline",
    "mdi-shopping-outline","mdi-cart","mdi-store",
    "mdi-school","mdi-eraser",
    "mdi-bank-transfer-out","mdi-atm","mdi-cash","mdi-charity","mdi-credit-card","mdi-cash-refund",
    "mdi-umbrella","mdi-key-variant","mdi-battery","mdi-broom","mdi-dresser","mdi-bottle-tonic",
    "mdi-cellphone","mdi-desktop-tower-monitor","mdi-floor-lamp","mdi-fridge-outline","mdi-headphones","mdi-laptop-windows","mdi-usb-flash-drive","mdi-speaker","mdi-mouse","mdi-tablet-ipad",
    "mdi-hair-dryer-outline","mdi-lightbulb","mdi-printer","mdi-camcorder","mdi-camera","mdi-fan",
    "mdi-desk","mdi-table-chair","mdi-clock-outline",
    "mdi-swim","mdi-table-tennis","mdi-basketball","mdi-volleyball","mdi-bedmintion","mdi-weight-lifter",
    "mdi-hospital-box-outline","mdi-doctor","mdi-pill","mdi-hospital-building",
    "mdi-gift","mdi-paw","mdi-content-cut","mdi-home","mdi-pipe-wrench","mdi-car-settings","mdi-ticket-confirmation-outline","mdi-script-text-outline","mdi-hammer-scredriver","mdi-currency-usd","mdi-cash-multiple"
    ],
    categoryColor:[
      "#D5CCB3","#FED37A","#FFA863","#DF764C","#D04F57","#D04F82","#A24A8E",
      "#594A8E","#5D63AF","#4472C9","#3767B9","#5088AE","#50989E",
      "#509883","#8ABA97","#C2CCB3",
    ],
    oldCategory:false,
    modifyId:"-1",
    newCategoryIcon:"mdi-tag-outline",
    newCategoryColor:"#D5CCB3",
    newCategoryName:"",
    newTag: [],
    newModal:false,
    loading: true,
    search: null //sync search
    // searchLength:0,
  }),
  created() {},
  asyncComputed: {
    categories: {
      get() {
        return this.$http.get("/user/categories").then(res => {
          this.loading = false;
          return res.data;
        });
      },
      default: []
    }
  },
  components: {
    VBoilerplate: {
      functional: true,
      render(h, { data, props, children }) {
        return h(
          "v-skeleton-loader",
          {
            ...data,
            props: {
              boilerplate: true,
              elevation: 2,
              ...props
            }
          },
          children
        );
      }
    }
  },
  methods: {
    iconCircle(item){
      if(item==this.newCategoryIcon){
        return `background:rgba(255,255,255,0.4);`
      }else{
        return ''
      }
    },
    colorCircle(item){
      if(item==this.newCategoryColor){
        return `border:solid 1.8px ${item}`
      }else{
        return ''
      }
    },
    colorSelected(item){
      // console.log(item)
      this.newCategoryColor=item;
    },
    iconSelected(item){
      this.newCategoryIcon=item;
    },
    update() {
      this.$asyncComputed.categories.update();
    },
    deleteCategory(category) {
      if (category.userId == null) return this.$alert.error("預設類別無法刪除");
      this.$confirm.open("確認刪除類別: " + category.name, () => {
        this.$http
          .delete("/category/" + category._id)
          .then(res => {
            this.update();
            this.$alert.success("成功類別刪除");
          })
          .catch(ignoreNotLoginError)
          .catch(err => {
            console.log(err);
            this.$alert.error("類別刪除失敗");
          });
      });
    },
    updateCategory(index, updateName) {
      this.$nextTick(() => {
        this.$http
          .patch("/category/" + index, { name: updateName })
          .then(res => {
            this.update();
            this.$alert.success("類別已更新");
            // console.log(updateName);
          })
          .catch(ignoreNotLoginError)
          .catch(err => {
            console.log(err);
            this.$alert.error("類別更新失敗");
          });
      });
    },
    updateTags(id, hashtags) {
      this.$nextTick(() => {
        this.$http
          .patch(`/category/${id}`, { hashtags })
          .then(res => {
            this.update();
            this.$alert.success("標籤已更新");
          })
          .catch(ignoreNotLoginError)
          .catch(err => {
            console.log(err);
            this.$alert.error("標籤更新失敗");
          });
      });
    },
    edit(item){
      this.newModal=true;
      this.newCategoryName = item.name;
      this.newCategoryColor= item.color;
      this.newCategoryIcon = item.icon;
      this.newTag=item.hashtags;
      this.oldCategory=true;
      this.modifyId=item._id;
    },
    cancel(){
      this.oldCategory=false;
      this.newModal=false;
      this.newTag = [];
      this.newCategoryName = "";
      this.newCategoryColor="#D5CCB3";
      this.newCategoryIcon = "mdi-tag-outline";
      this.modifyId="-1";
    },
    modify(){
      if (this.newCategoryName == "") return this.$alert.error("新類別名不得為空");
      //if(this.newCategoryIcon==""){this.newCategoryIcon="mdi-tag-outline"}
      this.$nextTick(() => {
        this.$loading
          .insideLoading(
            this.$http.patch("/category/"+this.modifyId, {
              name: this.newCategoryName,
              color: this.newCategoryColor,
              icon: this.newCategoryIcon,
              hashtags: this.newTag,
            })
          )
          .then(res => {
            this.update();
            this.$alert.success("成功修改類別");
            console.log(this.newTag);
            console.log(res.data);
          })
          .catch(ignoreNotLoginError)
          .catch(err => {
            console.log(err);
            this.$alert.error("類別修改失敗");
          });
          this.cancel();
      });

    },
    save() {
      if (this.newCategoryName == "") return this.$alert.error("新類別名不得為空");
      //if(this.newCategoryIcon==""){this.newCategoryIcon="mdi-tag-outline"}
      this.$nextTick(() => {
        this.$loading
          .insideLoading(
            this.$http.post("/category", {
              name: this.newCategoryName,
              hashtags: this.newTag,
              color: this.newCategoryColor,
              icon: this.newCategoryIcon,
            })
          )
          .then(res => {
            this.update();
            this.$alert.success("成功新增類別");
            console.log(this.newTag);
            console.log(res.data);
          })
          .catch(ignoreNotLoginError)
          .catch(err => {
            console.log(err);
            this.$alert.error("類別新增失敗");
          });
        this.cancel();
      });
    }
  }
};
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--default{
    min-width: 5px;
}
.card {
  padding: 1%;
  position: relative;
  
}
.deleteCard {
  position: absolute;
  top: 2%;
  right: 2%;
}
.editCard {
  position: absolute;
  top: 15%;
  right: 2%;
}

.loadCard {
  margin-bottom: 20px;
}

</style>