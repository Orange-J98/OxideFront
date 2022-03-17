<template>
    <div v-if="areaId">
        <el-drawer
            title="疫情数据分析"
            :visible.sync="$store.state.drawerForHist"
            :with-header="false"
            @close="handleClose"
            size="50%">
            <span><el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="疫情新增趋势" name="first">
                    <tendency-chart :dataset="historyData" :CountryName="areaId"></tendency-chart>
            </el-tab-pane>
            <el-tab-pane label="现有/累计确诊趋势" name="second">
                    <exist-accumu-chart :dataset="historyData" :CountryName="areaId"></exist-accumu-chart>
            </el-tab-pane>
            <el-tab-pane label="治愈/死亡" name="third">
                    <cure-death-chart :dataset="historyData" :CountryName="areaId"></cure-death-chart>
            </el-tab-pane>
            <el-tab-pane label="疫苗接种/新增病例" name="fourthith">
                    <vaccine-tend-chart :dataset="historyData" :CountryName="areaId"></vaccine-tend-chart>
            </el-tab-pane>
        </el-tabs></span>
        </el-drawer>
    </div>
</template>

<script>
  import tendencyChart from "./tendencyChart.vue"
  import ExistAccumuChart from "./ExistAccumuChart.vue"
  import CureDeathChart from "./CureDeath.vue"
  import VaccineTendChart from "./VaccineTendChart.vue"

  export default {
    name: "histDataChart",
    props: ["areaId"],
    data() {
      return {
        activeName: 'first',
        drawer: false,
        //TODO: 把这里的Name应该为上一个页面传入的。
        historyData:[],
        areaName:"",
      };
    },
    computed: {
      all() {
        return {
          areaId: this.areaId,
          // historyData: this.districtData,
        }
      }
    },
    watch: {
      all(curVal){
        this.areaName = curVal.areaId;
        this.getHistData();
        // this.historyData = this.getHistData(curVal.areaId);
      },
    },
    components: {
        tendencyChart,
        ExistAccumuChart,
        CureDeathChart,
        VaccineTendChart,
    },
    created(){
      this.areaName = this.areaId;
      this.getHistData()
    },
    mounted(){
        // var temp = this.getData();
    },
    methods: {
      handleClose(){
       this.$store.commit('closeDarawer');
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getHistData(){
        this.usersApi
          .getDistrictHistory(this.areaName)
          .then((res)=>{
            this.historyData = res.data;
          })
          .catch((p) => alert(p.response.data.message));
      },
      getData(){
          //TODO: axios.get(Areaname)=>response(historyData)
          var data = {
            CountryName: "马来西亚",
            NumSet: [],
          };
          var rnd0=[];
          for(var j=0;j<10;j++){
            var rnd=[];
            for(var i=0;i<10;i++){
              rnd[i] = Math.floor(Math.random()*1500);
            }
            rnd0[j] = rnd
          }
          rnd0[0].unshift("2021-7-5");
          rnd0[1].unshift("2021-7-4");
          rnd0[2].unshift("2021-7-3");
          rnd0[3].unshift("2021-7-2");
          rnd0[4].unshift("2021-7-1");
          rnd0[5].unshift("2021-6-30");
          rnd0[6].unshift("2021-6-29");
          rnd0[7].unshift("2021-6-28");
          rnd0[8].unshift("2021-6-27");
          rnd0[9].unshift("2021-6-26");
          data.NumSet =  rnd0.reverse();
          return data;
      },
    },
    }
</script>