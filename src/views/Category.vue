<template>
  <!-- ref: https://codepen.io/virtualadrian/pen/pOeVPX && Vuetify component: Card & Combobox & Chip-->
  <v-row>
    <v-row v-if="loading">
      <v-flex xs6 sm6 md6 v-for="item in 6" :key="item" class="card">
        <v-boilerplate class="md-6" type=" table-heading,list-item-three-line"></v-boilerplate>
      </v-flex>
    </v-row>
    <v-flex xs6 sm6 md6 v-else v-for="category of categories" :key="category._id" class="card">
      <v-card class="cardAll">
        <v-text-field
          class="headline"
          v-model="category.name"
          single-line
          solo
          flat
          hide-details
          :disabled="category.userId == null"
          @keyup.tab="updateCategory(category._id, card.name)"
          @paste="updateCategory(category._id, card.name)"
          @keyup.enter="updateCategory(category._id, card.name)"
        ></v-text-field>

        <v-btn
          icon
          class="deleteCard"
          :disabled="category.userId == null"
          v-on:click="deleteCategory(category._id, category.name)"
        >
          <v-icon>mdi-backspace</v-icon>
        </v-btn>

        <v-divider></v-divider>

        <v-combobox
          multiple
          v-model="category.hashtags"
          label="標籤"
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
          hint="輸入文字以新增標籤"
        ></v-combobox>
      </v-card>
    </v-flex>

    <v-flex xs6 sm6 md6 class="card" v-if="!loading">
      <v-card>
        <v-text-field
          label="NewCategory"
          placeholder="Add new Category"
          solo
          flat
          v-model="newCategory"
        ></v-text-field>

        <v-divider></v-divider>

        <v-combobox
          multiple
          v-model="newTag"
          label="Tags"
          append-icon
          chips
          deletable-chips
          class="tag-input"
          :search-input.sync="search"
          clearable
          solo
          flat
          hint="add category first"
          persistent-hint
        ></v-combobox>

        <v-card-actions>
          <v-btn icon class="add" @click="save">
            <v-icon large>mdi-plus-circle</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-row>
</template>

<script>
import { confirmed } from "vee-validate/dist/rules";

export default {
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
    deleteCategory(index, name) {
      // if (!disable) {
      if (confirm("刪除類別: " + name)) {
        this.$http.delete("/category/" + index).then(res => {
          console.log(res.data);
          this.$asyncComputed.categories.update();
          this.$alert("類別刪除成功", "success");
        });
      }
      /*
      } else {
        alert("預設類別無法刪除");
      }
      */
    },
    updateCategory(index, updateName) {
      this.$nextTick(() => {
        this.$http
          .patch("/category/" + index, { name: updateName })
          .then(res => {
            console.log(updateName);
          });
      });
    },
    updateTags(id, hashtags) {
      // console.log(this.$alert);
      this.$nextTick(function() {
        this.$http.get(`/category/${id}`, { hashtags }).then(res => {
          // this.$alert("標籤更新成功");
        });
      });
    },

    save() {
      if (this.newCategory != "") {
        this.$http
          .post("/category", { name: this.newCategory, hashtags: this.newTag })
          .then(res => {
            console.log(this.newTag);
            console.log(res.data);
            return this.$http.get("/user/categories");
          })
          .then(res => {
            this.hashtag = [];
            res.data.forEach(element => {
              this.hashtag.push({
                index: element._id,
                name: element.name,
                tag: element.hashtags,
                disable: !element.userId
              });
            });
            console.log(this.hashtag);
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
