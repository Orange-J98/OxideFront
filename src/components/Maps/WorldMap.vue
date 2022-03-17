<template>
  <div class="WorldMap flex flex-col justify-center">
    <p class="text-2xl font-bold mt-2">世界疫情分布</p>
    <p class="hint">点击地图上的区域可查看该地历史数据分析</p>
    <!-- Todo：高风险区 -->
    <div
      ref="myMapWorld"
      class="ml-auto mr-auto"
      style="width: 900px; height: 600px"
    ></div>
    <div v-if="this.areaId">
      <hist-data-chart :areaId="this.areaId"></hist-data-chart>
    </div>
  </div>
</template>

<script>
import histDataChart from "@/components/histDataChart.vue";
export default {
  name: "WorldMap",
  props: ["geoJSON", "districtData", "dataType"],
  components: {
    histDataChart,
  },
  watch: {
    watchThese(curVal) {
      this.chartData = curVal.districtData;
      this.drawMap();
    },
    // deep: true,
  },
  created() {},
  mounted() {
    this.chartData = this.districtData;
    this.drawMap();
  },
  computed: {
    watchThese() {
      return {
        geoJSON: this.geoJSON,
        districtData: this.districtData,
        charDowntowns: this.charDowntowns,
      };
    },
  },
  methods: {
    drawMap() {
      var myChart = this.$echarts.init(this.$refs.myMapWorld);
      this.$echarts.registerMap("myMapWorld", this.geoJSON);
      var option;
      console.log("render", this.charDowntowns);
      option = {
        title: {
          text: "",
          left: "right",
        },
        tooltip: {
          trigger: "item",
        },
        visualMap: {
          left: "left",
          min: 0,
          max: this.findMax(),
          inRange: {
            color: ["#fff", "#ff6666", "#bb0000", "#770000", "#660000"],
          },
          show: true, // 隐藏的是右下角滑块，参考图2
          calculable: true,
        },
        series: [
          {
            name: this.dataType,
            type: "map",
            map: "myMapWorld",
            roam: false,
            top: "100",
            data: this.chartData,
          },
        ],
      };

      myChart.setOption(option);
      myChart.on("click", (params) => {
        this.areaId = params.name;
        this.$store.commit("changeDarawer");
      });
    },
    findMax() {
      var max = 0;
      this.districtData.forEach((element) => {
        if (element.value > max) {
          max = element.value;
        }
      });
      return max;
    },
  },
  data() {
    return {
      areaId: "",
      chartData: [],
    };
  },
};
</script>

<style scoped>
.hint {
  margin-left: 40px;
  font-size: 20px;
  line-height: 32px;
  font-weight: bold;
  color: #1772b4;

  font-style: oblique;
}
</style>
