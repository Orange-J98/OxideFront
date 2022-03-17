<template>
  <div id="covidmap">
    <div class="flex flex-row justify-center">
      <div class="ChinaMap">
        <div class="flex justify-center space-x-20">
          <el-radio-group
            v-model="china.currentTypeString"
            @change="changeTypeChina"
          >
            <el-radio-button label="累计确诊"></el-radio-button>
            <el-radio-button label="新增确诊"></el-radio-button>
          </el-radio-group>
        </div>
        <div>
          <div v-if="china.districtCount && china.geoJSON">
            <ChinaMap
              :geoJSON="china.geoJSON"
              :districtData="
                china.districtCount[china.currentType].areaDataList
              "
              :dataType="typeDict[china.currentType]"
            ></ChinaMap>
          </div>
        </div>
      </div>
      <div class="ChinaBar mr-8">
        <barChartOnRight
          :mapScope="'中国'"
          :typeName="typeDict[china.currentType]"
          :subAreaDataSet="china.districtCount[china.currentType]"
        ></barChartOnRight>
      </div>
    </div>
    <div class="flex flex-row justify-center">
      <div class="WorldMap">
        <div class="flex justify-center space-x-20">
          <el-radio-group
            v-model="world.currentTypeString"
            @change="changeTypeWorld"
          >
            <el-radio-button label="累计确诊"></el-radio-button>
            <el-radio-button label="新增确诊"></el-radio-button>
          </el-radio-group>
        </div>
        <div>
          <div v-if="world.districtCount && world.geoJSON">
            <WorldMap
              :geoJSON="world.geoJSON"
              :districtData="
                world.districtCount[world.currentType].areaDataList
              "
              :dataType="typeDict[world.currentType]"
            ></WorldMap>
          </div>
        </div>
      </div>
      <div class="ChinaBar mr-8">
        <world-bar
          :mapScope="'世界'"
          :typeName="typeDict[world.currentType]"
          :subAreaDataSet="world.districtCount[world.currentType]"
        ></world-bar>
      </div>
    </div>
  </div>
</template>

<script>
import ChinaMap from "@/components/Maps/ChinaMap";
import WorldMap from "@/components/Maps/WorldMap";
import barChartOnRight from "../barChartOnRight.vue";
import WorldBar from "../WorldBar.vue";
export default {
  components: {
    // Map,
    ChinaMap,
    WorldMap,
    barChartOnRight,
    WorldBar,
  },
  created() {
    this.createCovidMap();
  },
  data() {
    return {
      typeDict: ["累计确诊", "新增确诊"],
      china: {
        currentType: 1,
        districtCount: null,
        geoJSON: null,
        currentTypeString: "新增确诊",
      },
      world: {
        currentType: 1,
        districtCount: null,
        geoJSON: null,
        currentTypeString: "新增确诊",
      },
    };
  },
  methods: {
    changeTypeChina() {
      console.log(this.china.currentTypeString);
      if (this.china.currentTypeString == "累计确诊") {
        this.china.currentType = 0;
      } else {
        this.china.currentType = 1;
      }
    },
    changeTypeWorld() {
      console.log(this.world.currentTypeString);
      if (this.world.currentTypeString == "累计确诊") {
        this.world.currentType = 0;
      } else {
        this.world.currentType = 1;
      }
      // this.$store.commit("changeMapScope",this.mapScope);
    },
    createCovidMap() {
      // 获取全国GeoJSON
      this.usersApi
        .getGeoJSON("china")
        .then((res) => {
          this.china.geoJSON = res.data;
        })
        .catch((p) => alert(p.response.data.message));

      // 获取全国各个行政区的数据
      this.usersApi
        .getDistrictCount("china")
        .then((res) => {
          this.china.districtCount = res.data;
        })
        .catch((p) => alert(p.response.data.message));

      // 获取世界GeoJSON
      this.usersApi
        .getGeoJSON("world")
        .then((res) => {
          this.world.geoJSON = res.data;
        })
        .catch((p) => alert(p.response.data.message));

      // 获取世界各个行政区的数据
      this.usersApi
        .getDistrictCount("world")
        .then((res) => {
          this.world.districtCount = res.data;
        })
        .catch((p) => alert(p.response.data.message));
    },
  },
};
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
