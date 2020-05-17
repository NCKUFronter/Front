<template>
  <!-- ref: https://codepen.io/virtualadrian/pen/pOeVPX && Vuetify component: Card & Combobox & Chip-->
  <v-row>
    <v-row v-if="loading">
      <v-flex xs6 sm6 md6 v-for="item in 6" :key="item" class="card">
        <v-boilerplate class="md-6" type=" table-heading,list-item-three-line"></v-boilerplate>
      </v-flex>
    </v-row>
    <v-flex xs6 sm6 md6 v-else v-for="category of categories" :key="category._id" class="card">
      <v-card elevation="4" class="cardAll">
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

    <v-flex xs6 sm6 md6 class="card" v-if="!loading">
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
          <v-icon>mdi-plus-box</v-icon>
        </v-btn>
      </v-card>
    </v-flex>
  </v-row>
</template>

<script>
import { confirmed } from "vee-validate/dist/rules";

export default {
  title: "管理類別",
  inject: ["$alert"],
  data: () => ({
    hashtag: [],
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
      if (category.userId == null)
        return this.$alert.open("預設類別無法刪除", "error");

      if (confirm("刪除類別: " + category.name)) {
        this.$http
          .delete("/category/" + category._id)
          .then(res => {
            console.log(res.data);
            this.update();
            this.$alert.open("成功類別刪除", "success");
          })
          .catch(err => {
            console.log(err);
            this.$alert.open("類別刪除失敗", "error");
          });
      }
    },
    updateCategory(index, updateName) {
      this.$nextTick(() => {
        this.$http
          .patch("/category/" + index, { name: updateName })
          .then(res => {
            this.update();
            this.$alert.open("類別已更新", "success");
            console.log(updateName);
          });
      });
    },
    updateTags(id, hashtags) {
      this.$nextTick(function() {
        this.$http.patch(`/category/${id}`, { hashtags }).then(res => {
          this.update();
          this.$alert.open("標籤已更新", "success");
        });
      });
    },

    save() {
      if (this.newCategory != "") {
        this.$http
          .post("/category", { name: this.newCategory, hashtags: this.newTag })
          .then(res => {
            this.update();
            this.$alert.open("成功新增類別", "success");
            console.log(this.newTag);
            console.log(res.data);
          });
        this.newTag = [];
        this.newCategory = "";
      }
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
