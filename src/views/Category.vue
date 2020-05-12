<template>
  <!-- ref: https://codepen.io/virtualadrian/pen/pOeVPX && Vuetify component: Card & Combobox & Chip-->

        <v-row>
          <v-row v-if="loading">
            <v-flex xs6 sm6 md6 v-for="item in 6" :key="item" class="card">
            <v-boilerplate
              class="md-6"
              type=" table-heading,list-item-three-line"
            ></v-boilerplate>
            </v-flex>
          </v-row>
          <v-flex xs6 sm6 md6 v-else v-for="(card,idx) in hashtag" :key="idx" class="card">
        
      
            <v-card class="cardAll">

              <v-text-field class="headline"
                v-model="card.name"
                single-line
                solo
                flat
                hide-details
                :disabled="card.disable"
                @keyup.tab="updateCategory(card.index,card.name)"
                @paste="updateCategory(card.index,card.name)"
                @keyup.enter="updateCategory(card.index,card.name)"
              >
              </v-text-field>

              <v-btn icon class="deleteCard" v-on:click="deleteCategory(card.index,card.name,card.disable)">
                <v-icon>mdi-backspace </v-icon>
              </v-btn>
              <!-- <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="headline">
                    {{
                    card.name
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item> -->

            <v-divider></v-divider>

            <v-combobox
              multiple
              v-model="card.tag"
              label="Tags"
              append-icon
              chips
              deletable-chips
              class="tag-input"
              :search-input.sync="card.search"
              @keyup.tab="updateTags(card.index,card.tag)"
              @paste="updateTags(card.index,card.tag)"
              @keyup.enter="updateTags(card.index,card.tag)"
              @change="updateTags(card.index,card.tag)"
              solo
              flat
              hint="Creat Tags by typing"
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
import { confirmed } from 'vee-validate/dist/rules';
export default {
  data: () => ({
    hashtag: [],
    newCategory: "",
    newTag: [],
    loading:true,
    search: null, //sync search
    // searchLength:0,
  }),
  created(){

    this.$http.get('/user/categories').then((res) => {
      res.data.forEach(element => {
        this.hashtag.push({index: element._id, name:element.name, tag: element.hashtags ,disable: !element.userId,search: null})
      });
      // this.search.length=this.hashtag.length;
      // console.log(this.search.length)
      this.loading=false;
      console.log(this.hashtag)
    })


  },
  // mounted(){
  //     window.addEventListener('load', () => {
  //       this.loading=false;
  //       console.log('window onload')
  //   })
  // },
  components:{
         VBoilerplate: {
        functional: true,

        render (h, { data, props, children }) {
          return h('v-skeleton-loader', {
            ...data,
            props: {
              boilerplate: true,
              elevation: 2,
              ...props,
            },
          }, children)
        },
      },
  },
  methods: {
    deleteCategory(index,name,disable){
      if(!disable){
        if(confirm("刪除類別: "+name)){
          this.$http.delete('/category/'+index).then((res) => {
            console.log(res.data)
            return this.$http.get('/user/categories')
        }).then((res) => {
          this.hashtag=[];
          res.data.forEach(element => {
            this.hashtag.push({index: element._id, name:element.name, tag: element.hashtags ,disable: !element.userId})
          });
          console.log(this.hashtag)
        })
        }
      }else{
        alert("預設類別無法刪除")
      }
    },
    updateCategory(index,updateName) {
      this.$nextTick(() => {
        this.$http.patch('/category/'+index,{name:updateName}).then((res) => {
          console.log(updateName)
        })
        
      });

    },
    updateTags(index,addTag) {
 
      this.$nextTick(() => {
        this.$http.patch('/category/'+index,{hashtags:addTag}).then((res) => {
        })
        console.log(addTag)
      });

    },

    save() {
      if (this.newCategory != "") {

        this.$http.post('/category',{name:this.newCategory,hashtags:this.newTag}).then((res) => {
          console.log(this.newTag);
          console.log(res.data)
          return this.$http.get('/user/categories')
        }).then((res) => {
          this.hashtag=[];
          res.data.forEach(element => {
            this.hashtag.push({index: element._id, name:element.name, tag: element.hashtags ,disable: !element.userId})
          });
          console.log(this.hashtag)
        })
        this.newTag=[];
        this.newCategory = "";
      
      }
    },


  },
};
</script>

<style scoped>
  .card{
    padding: 1%;
    position: relative;
  }



  .deleteCard{
    position: absolute;
    top: -1%;
    right: -1%;
  }

  .loadCard{
    margin-bottom: 20px;
  }

  
</style>
