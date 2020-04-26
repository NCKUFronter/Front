<template
  >

  <!-- ref: https://codepen.io/virtualadrian/pen/pOeVPX && Vuetify component: Card & Combobox & Chip-->
  <v-card
    class="mx-auto"
    max-width="82vw"
  >
    

    <v-container fluid>
      <v-row >
        <v-col
          v-for="card in hashtag"
          :key="card.name"
          :cols="6"
        >
          <v-card
          >


            
            <v-list-item >
              <v-list-item-content >
                <v-list-item-title class="headline" >{{card.name}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
        
            <v-combobox 
              multiple
              v-model="card.tag" 
              label="Tags" 
              append-icon
              chips
              deletable-chips
              class="tag-input"
              :search-input.sync="search" 
              @keyup.tab="updateTags(card.id)"
              @paste="updateTags(card.id)"
              @keyup.enter="updateTags(card.id)"          
              solo
              flat 
              hint="Creat Tags by typing"  
            >         
            </v-combobox>

          </v-card>

          
        </v-col>
        <V-col
        :cols="6"
          >
          <v-card
          >
            
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
              @keyup.tab="addNewTags()"
              @paste="addNewTags()"
              @keyup.enter="addNewTags()"          
              clearable
              solo
              flat 
              disabled 
              hint="add category first"
              persistent-hint=""
            >         
            </v-combobox>

            
            
            <v-card-actions>

              <v-btn icon class="add" @click="save">
                <v-icon large>mdi-plus-circle</v-icon>
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    data: () => ({

      hashtag: [
        {id:0,name:"食物",tag:['早餐', '午餐','晚餐']},
        {id:1,name:"交通",tag:['高鐵', '台鐵','客運']},
        {id:2,name:"治裝",tag:['上衣', '長褲','外套']},
        {id:3,name:"娛樂",tag:['電影', 'KTV']},
      ],
      categoryLength:3,
       
      newCategory:'',
      newTag:[],
      newHahtag:[],
     
      search: "" //sync search

    }),
    methods:{
      updateTags(index) {
        console.log(index)
        this.$nextTick(() => {
          this.hashtag[index].tag.push(...this.search.split(","));
          this.$nextTick(() => {
            this.search = "";
          });
        });
        console.log(this.hashtag[index].tag[4])
      },
      // addNewTags() {
      //   this.$nextTick(() => {
      //     this.newHahtag.push(...this.search.split(","));
      //     this.$nextTick(() => {
      //       this.search = "";
      //     });
      //   });
      //   console.log(this.newHashtag[1])
      // },
      save () {
        console.log(this.newHahtag[0])
        if (this.newCategory !='') {
          var obj={id:this.categoryLength,name:this.newCategory,tag:this.newHahtag}
          // Object.assign(this.desserts[this.editedIndex], this.editedItem)
          this.hashtag.push(obj)
          this.categoryLength=this.hashtag.length-1
          console.log(this.categoryLength)
          this.newCategory=''
          this.newHahtag=[]

        }
        
      },
      // remove (card,chip) {
      //   index=this.hashtag
      //   this.hashtag.tag.splice(this.hashtag.indexOf(chip), 1)
      //   // this.hashtag = [...this.chips]
      // },
    }
  }
</script>

<style scoped>




</style>