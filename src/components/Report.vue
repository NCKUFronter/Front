<template>
  <!--v-container fluid class="tree"-->
  <v-card flat class="parent" v-if="current" color="#26282d">
    <v-card flat color="#26282d">
      <v-card-title style="justify-content:flex-end">{{current.data.name}}</v-card-title>
      <!--v-card-title class="justify-center">總覽</v-card-title-->
      <v-simple-table class="total" dense>
        <template v-slot:default>
          <!-- <v-divider class="justify-center"></v-divider> -->
          <!-- 點數或不是最後一層的就顯示children -->
          <tbody v-if="current.children && current.children.length">
            <tr v-for="child in current.children" :key="child.data.name">
              <td class="text-right">{{ child.data.name }}</td>
              <td class="text-right">{{ child.value }}</td>
            </tr>
            <tr>
              <td class="text-right">總和</td>
              <td class="text-right">{{current.value}}</td>
            </tr>
          </tbody>
          <!-- 不是點數且最後一層的hashtags資訊 -->
          <tbody v-else-if="current.hashtags && current.hashtags.length">
            <tr v-for="taginfo of current.hashtags" :key="taginfo.name">
              <td class="text-right">{{ taginfo.tag }}</td>
              <td class="text-right">{{ taginfo.count }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="2" class="text-center">無資訊可顯示</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <!--v-card class="child" v-for="child in current.children" :key="child.data.name" flat>
        <v-card-title class="justify-center">{{child.data.name}}</v-card-title>
        <v-simple-table class="descendant" dense>
          <template v-slot:default>
            <v-divider class="justify-center"></v-divider>
            <tbody>
              <tr v-for="descendant in child.children" :key="descendant.data.name">
                <td>{{ descendant.data.name }}</td>
                <td>{{ descendant.value}}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
    </v-card-->
  </v-card>
  <!--/v-container-->
</template>

<script>
export default {
  name: "Report",
  props: {
    nodes: {
      required: true,
      type: Object
    }
  },
  created(){
    console.log(this.nodes);
    
  },
  computed: {
    current() {
      return this.nodes.clicked ? this.nodes.clicked : this.nodes.root;
    }
  }
};
</script>

<style scoped>
.tree {
  max-height: 70vh;
}

.parent {
  padding: 2% 5%;
}
.parent
.theme--dark.v-data-table tbody tr:not(:last-child) td:not(.v-data-table__mobile-row){
  border-bottom: none;
}
</style>
