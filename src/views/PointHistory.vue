<template>
  <v-card flat>
    <v-row>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-flex xs6 sm2 md2>
        <v-select 
        v-model="typeSelected"
          :items="type"
          label="Type"
          class="selector"
          dense=""
        ></v-select>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs6 sm4 md4>
      <v-text-field 
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        no-results-text
        class="search"
      ></v-text-field>
      </v-flex>

    </v-row>
    <v-data-table
      :headers="headers"
      :items="filterHistory"
      :search="search"
      no-data-text
    ></v-data-table>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Activity',
            align: 'start',
            sortable: false,
            value: 'activity',
          },
          { text: 'Point', 
            value: 'point', 
            sortable: true,
          },
          { text: 'Type', 
            value: 'type',   
            sortable: false,
          },
        ],
        history: [
          {activity:'xunTowish',point:'200',type:'轉移'},
          {activity:'兌換虛寶1',point:'500',type:'消耗'},
          {activity:'連續點數',point:'200',type:'獲得'},
          //activity=db.pointActibity.detail
        ],
        type:[
          'ALL','獲得','消耗','轉移'
        ],
        typeSelected:'ALL',
      }
    },
    computed:{
      filterHistory() {
        return (this.typeSelected!='ALL')
        ? this.history.filter(item => {
          return (item.type === this.typeSelected);
        })
        : this.history
      },
    }
  }
</script>
<style  scoped>
  v-card{
    font-family: 微軟正黑體,Arial, Helvetica, sans-serif;
  }
  .selector{
    position: relative;
    top: 19px;
    margin:5px 20px;


  }
  .search{
  margin:5px 20px;


  }
</style>