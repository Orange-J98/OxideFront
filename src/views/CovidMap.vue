<template>
  <div id="covidmap" class="flex flex-row">
    <div class="side-bar flex flex-column">
        <el-radio-group v-model="mapScopeZH" @change="changeMapScope">
            <el-radio-button label="全国"></el-radio-button>
            <el-radio-button label="世界"></el-radio-button>
        </el-radio-group>
      
        <el-menu
          :default-active="currentType"
          class="el-menu-vertical-demo"
          style="position: absolute; width:300px; top:60px; bottom: 0px"
          @select="changeType"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"><br>
        <h5 style="color:white">选择查看</h5>
        <el-menu-item index="0">
          <i class="el-icon-menu"></i>
          <span slot="title">累计确诊</span>
        </el-menu-item>
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">新增确诊</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- {{districtCount[0].areaDataList}} -->
    <div style="margin-left: 300px">
      <div v-if="districtCount && geoJSON && capitalInfo">
        <Map :mapScope="mapScope" :geoJSON="geoJSON" :districtData="districtCount[currentType].areaDataList" :dataType="this.typeDict[currentType]"></Map>
      </div>

    </div>
    
  </div>
</template>

<script>
import Map from '@/components/Map'

  export default {
    name: "CovidMap",
    components: {
      Map,
    },
    created() {
      this.createCovidMap(this.mapScope);
    },
    data(){
      return {
        typeDict:[
          "累计确诊",
          "新增确诊",
          "现有确诊",
          "累计死亡",
          "新增死亡",
          "累计治愈",
          "新增治愈",
          "现有疑似",
          "现有重症",
          "接种数目"
        ],
        currentType: "0",
        mapScope: "china",
        mapScopeZH: "全国",
        totalCount: [
          "1000",
          "50",
          "21",
          "49",
          "17",
          "78",
          "27",
          "13",
          "99",
          "123"
        ],
        districtCount: null,
        geoJSON: null,
        capitalInfo: null,

      }
    },
    methods: {
      changeType(key){
        console.log(key);
        this.currentType = key;
      },
      changeMapScope(){
        if(this.mapScopeZH == "全国"){
          this.mapScope = "china";
          this.createCovidMap();
        }
        else{
          this.mapScope = "world";
          this.createCovidMap();
        }
      },
      createCovidMap(){
        // 获取GeoJSON
        this.usersApi
          .getGeoJSON(this.mapScope)
          .then((res)=>{
            this.geoJSON = res.data;
          })
          .catch((p) => alert(p.response.data.message));


        //获取整体数据
        this.usersApi
          .getTotalCount(this.mapScope)
          .then((res)=>{
            this.totalCount = res.data
          })
          .catch((p) => alert(p.response.data.message));
        
        // 获取各个行政区的数据
        this.usersApi
          .getDistrictCount(this.mapScope)
          .then((res)=>{
            this.districtCount = res.data
          })
          .catch((p) => alert(p.response.data.message));
        
        // 获取国内省会的高风险区数据
        if(this.mapScope == "china"){
          this.usersApi
            .getCapitalInfo()
            .then((res)=>{
              this.capitalInfo = res.data
            })
            .catch((p) => alert(p.response.data.message));
        }
      }
    }
  }
</script>

<style scoped>
.side-bar {
  position: fixed;
  top: 70px;
  height: 100%;
  width: 300px;
  z-index: 1;
}

</style>
