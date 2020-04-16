<template>
    <div class="side-account">
                <div class="account-upper">
                    <div class="date-wrap">
                        <a class="material-icons" v-on:click="getYearMonthDate(-1)">arrow_left</a>
                        <div class="date" >{{getYearMonthDate}}</div>
                        <a class="material-icons" v-on:click="getYearMonthDate(1)">arrow_right</a>
                    </div>
                    <div class="point">
                        <h1 >累積點數</h1>
                        <!-- {{ hello }} -->

                    </div>
                    <div class="total">
                        <div class="income">
                            <h1>總收入</h1>
                        </div>
                        <div class="expenses">
                            <h1>總支出</h1>
                        </div>
                    </div>
                </div>

                

                <div class="account-down">
                    <div class="account-item" v-for="(item,index) in accountData" :key="index">
                        <img src="https://fakeimg.pl/30x30/efca16" class="categroyIcon" alt="categoryicon">
                        <h1 class="category">{{item.category}}</h1>
                        <h1 class="money">{{item.money}}</h1>
                        <h1 class="accountName">{{item.account}}</h1>
                    </div>

                    <!-- 原本用v-on:click控制modal變數，顯示modal，現在改以不同view -->
                    <!-- <a v-on:click="modal = !modal" href="##additem###" class="material-icons">add_circle</a> -->
                    <router-link to="/sideAccount/addIncome"  class="material-icons">add_circle</router-link>
                </div>

                <router-view></router-view>

                
                    
                  
                
            </div>
</template>

<script>

let data={
    
    accountData:[
        {src:'#',category:'收支項名',money:'金額',account:'帳戶',flow:'income',Year:'',Month:'',Day:''},
        {src:'#',category:'收支項名',money:'金額',account:'帳戶',flow:'expense',Year:'',Month:'',Day:''},
        {src:'#',category:'收支項名',money:'金額',account:'帳戶',flow:'income',Year:'',Month:'',Day:''}
        
    ],
    
    //後端連接變數方法
    // hello: 'init',
    
    // modal: false,

}



export default {
  name: 'SideAccount',
  data() {
    return data;
  },
  // props: ['accountData'], //引入變數
  components: {
  },
  created() { //Vue開始生命週期
 
  },
  computed:{
        getYearMonthDate(){
            let t = new Date()
            return `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`
        } 
    },
    methods:{
        

        // onclick() {
        //     // Vue.prototype.$http
        //     this.$http.get('http://ncku-courses.herokuapp.com/api/hello').then((res) => {
        //     this.hello = res.data; //更改hello的值
        //     //res.data[0].name
        //     console.log(res)
        //     })
        // }

    }
    
}


</script>

<style scoped>
.side-account{
    /* border-color: chartreuse;
    border-style: solid; */
    width: 90vw;
    height: 94vh;
}

.account-upper{
    height: 10vh;
    border-bottom: 3px #CCCCCC solid;
    display: flex;
    /* justify-content: center; */
    /* border-color: red;
    border-style: solid; */
}

.date-wrap{
    margin:auto;
    width: 33%;
    margin-left: 3%;
    align-items: center;
    display: flex;
}

.account-upper .material-icons{
    color:#CCCCCC;
    font-size: 48px;
    display: inline-flex;
}

.date{
    display: inline-flex;
    margin: 0 5%;
    justify-content: center;
}



.account-upper h1{
    font-size: 20px;
    font-weight: normal;
}

.point{
    margin: auto;
}

.total{
    margin: auto;
}

.total h1{
    font-size: 12px;
}


.account-down{
    height: 83vh;
}

.account-down .material-icons{
    color:#efca16;
    position: absolute;
    bottom: 20px;
    right: 30px;
    font-size: 48px;
    text-decoration: none;
}


.account-item{
    display: flex;
    border-bottom: 1.5px black solid;
    height: 8vh;
    margin: 0 3%;
}

.account-item h1{
    font-weight: normal;
    font-size: 18px;
}

.account-item img{
    display: inline-block;
    margin:auto 15px;
    border-radius: 50%;
}

.category{
    margin: auto;
}

.money{
    margin: auto;
}

.accountName{
    margin: auto;
    width: 20%;
}



</style>