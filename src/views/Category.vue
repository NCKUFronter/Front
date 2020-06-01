<template>
  <!-- ref: https://codepen.io/virtualadrian/pen/pOeVPX && Vuetify component: Card & Combobox & Chip-->
  <v-row style="padding: 8% 5% 0% 2%;">
    <v-row v-if="loading">
      <v-flex xs6 sm3 md3 v-for="item in 6" :key="item" class="pa-2">
        <v-boilerplate class="md-6" type=" table-heading,list-item-three-line"></v-boilerplate>
      </v-flex>
    </v-row>
    <v-row v-else>
    <v-flex xs12 sm12 md12 class="pl-2">
      <v-card-title class="ma-0 pa-0">自訂類別</v-card-title>
      <v-btn class="elevation-0 mt-2 mb-2" style="background-color:transparent;border:white solid 1px;border-radius:2em;">新增類別</v-btn>
    </v-flex>
    <v-flex xs6 sm3 md3 v-for="category of categories" :key="category._id" class="pa-2">
      <v-card elevation="4" class="cardAll" style="back" :color="(category) ? category.color : '#d5ccb3'">
        <v-text-field
          class="headline"
          v-model="category.name"
          prepend-inner-icon="mdi-shape"
          single-line
          solo
          dense
          flat
          hint="按下Enter以保存"
          :disabled="category.userId == null"
          @keyup.tab="updateCategory(category._id, category.name)"
          @paste="updateCategory(category._id, category.name)"
          @keyup.enter="updateCategory(category._id, category.name)"
        ></v-text-field>

        <v-btn
          icon
          class="deleteCard"
          :disabled="category.userId == null"
          v-on:click="deleteCategory(category)"
        >
          <v-icon>mdi-backspace</v-icon>
        </v-btn>

        <v-divider></v-divider>

        <v-combobox
          multiple
          v-model="category.hashtags"
          label="新增類別標籤"
          prepend-inner-icon="mdi-tag"
          append-icon
          chips
          deletable-chips
          class="tag-input"
          :search-input.sync="category.search"
          @keyup.tab="updateTags(category._id,category.hashtags)"
          @paste="updateTags(category._id,category.hashtags)"
          @keyup.enter="updateTags(category._id,category.hashtags)"
          @change="updateTags(category._id,category.hashtags)"
          solo
          flat
          hint="輸入文字以新增標籤，按下Enter以保存"
        ></v-combobox>
      </v-card>
    </v-flex>

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
</template>

<script>
import { confirmed } from "vee-validate/dist/rules";
import { ignoreNotLoginError } from "../utils";
export default {
  inject: ["$alert", "$confirm"],
  data: () => ({
    newCategory: "",
    newTag: [],
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
    save() {
      if (this.newCategory == "") return this.$alert.error("新類別名不得為空");
      this.$nextTick(() => {
        this.$loading
          .insideLoading(
            this.$http.post("/category", {
              name: this.newCategory,
              hashtags: this.newTag
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
        this.newTag = [];
        this.newCategory = "";
      });
    }
  }
};
</script>

<style scoped>
.card {
  padding: 1%;
  position: relative;
  
}
.deleteCard {
  position: absolute;
  top: -1%;
  right: -1%;
}
.loadCard {
  margin-bottom: 20px;
}
</style>