<template>
  <v-content>
  <v-container fluid style="width: 960px"> 
    <v-card flat >
    <v-card-title>
      點數管理
    </v-card-title>

    <v-tabs
      v-model="tab"
    >
      <v-tab
        v-for="item in items"
        :key="item.title"
        :to="item.link"
      >
        {{ item.title }}
      </v-tab>
    </v-tabs>
    <router-view></router-view>

    <!-- <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="(item,index) in items"
        :key="index"
      >
      {{item.link}}
      </v-tab-item>
    </v-tabs-items> -->
    </v-card>
    <!-- <PointHistory/> -->

  </v-container>
  </v-content>
</template>

<script>
  // import PointHistory from '../components/PointHistory.vue'
  export default {
    data () {
      return {
        tab: null,
        items: [
          {title: '點數兌換', link:'/point'},
          {title: '點數贈送', link:'/point/delivery'},
          {title: '歷史紀錄', link:'/point/history'},
        ],
        
      }
    },
    // components:{
    //   PointHistory
    // }
  }
</script>

<style>


</style>