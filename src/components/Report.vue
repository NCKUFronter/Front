<template>
<v-container fluid class="tree">
  <v-card class="parent"  outlined v-if="current">
    <v-card-title class="justify-center">{{current.data.name}}</v-card-title>
      <v-card flat>
        <v-card-title class="justify-center">總覽</v-card-title>
        <v-simple-table class="total" dense>
            <template v-slot:default>
              <v-divider class="justify-center"></v-divider>
              <tbody >
                <tr v-for="child in current.children" :key="child.data.name">
                  <td>{{ child.data.name }}</td>
                  <td>{{ child.value}}</td>
                </tr>
                <tr>
                  <td>總和</td>
                  <td>{{current.value}}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
      </v-card>

      <v-card class="child" v-for="child in current.children" :key="child.data.name" flat>  
        <v-card-title class="justify-center">{{child.data.name}}</v-card-title>
          <v-simple-table class="descendant" dense>
            <template v-slot:default>
              <v-divider class="justify-center"></v-divider>
              <tbody >
                <tr v-for="descendant in child.children" :key="descendant.data.name">
                  <td>{{ descendant.data.name }}</td>
                  <td>{{ descendant.value}}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
      </v-card>  


  </v-card>
</v-container>  
  
  
</template>
<script>

import sumPersonal from "../data/sumPersonal";
import sumLedger from "../data/sumLedger";

export default {
    name:"Report",
    data(){
      return{
        currentChildren:[],
        depth: 0,
        sumLedger,
        sumPersonal
      }

    },
    props: {
        data: {
        type: Object,
        required: false
        },
        current: {
          required: false,
          type: Object
        },
    },computed:{
     
    },
    method:{
      items() {
      // console.log(this.current.data.name)
      const { current } = this;
      if(!current){
        // console.log(this.data);
        return this.sumLedger;
      }else{

        this.currentChildren = current.children

        // console.log(current.descendants())

        return current
            .descendants()
            .map(d => ({
              id: d.data.name + d.depth,
              // data: d.data,
              depth: d.depth,
              value: d.value,
              parent:d.parent.data.name,
              name: d.data.name
            })).filter(it => { return (it.depth==current.depth || it.depth==current.depth+1|| it.depth==current.depth+2)});
        // return this.currentTree.filter(it => { it.depth==current.depth || it.depth==current.depth+1});
      }

    },


    }
    
}
</script>
<style scoped>
  .tree{
    max-height: 70vh;
  }


  .parent{
    padding: 2% 5%;

  }


  
</style>
