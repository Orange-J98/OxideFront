<template>
  <div class="ChinaMap flex flex-col justify-center">
    <!-- <div class="flex flex-row justify-center"> -->
    <p class="text-2xl font-bold mt-2" style="font-size: 30px">全国疫情分布</p>
    <p class="hint">点击地图上的区域可查看该地历史数据分析</p>
    <!-- </div> -->
    <!-- Todo：高风险区 -->
    <div
      ref="myMapChina"
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
  name: "ChinaMap",
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
    this.$nextTick(() => {
      this.chartData = this.districtData;
      this.dealData();
      this.drawMap();
    });
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
    dealData() {
      // 调用api
      this.usersApi
        .getCapitalInfo()
        .then((res) => {
          var data = res.data;
          data.forEach((element) => {
            var item = {
              name: element.areaId,
              coord: null,
              value: "",
            };
            for (let i = 0; i < this.coords.length; i++) {
              if (element.areaId == this.coords[i].name) {
                item.coord = this.coords[i].coord;
                break;
              }
            }

            var highStr = "";
            var midStr = "";
            element.subRisks.forEach((e) => {
              if (e.riskType == "mid") {
                if (midStr.length == 0) {
                  midStr = midStr + e.description;
                } else {
                  midStr = midStr + "、" + e.description;
                }
              } else if (e.riskType == "high") {
                if (highStr.length == 0) highStr = highStr + e.description;
                else highStr = highStr + "、" + e.description;
              }
            });
            item.value = "高、中风险区: " + highStr + midStr;
            // console.log("a", item)
            this.charDowntowns.push(item);
            // console.log("b",this.charDowntowns)
          });
        })
        .catch((p) => {
          console.log(p);
        });
    },

    drawMap() {
      var myChart = this.$echarts.init(this.$refs.myMapChina);
      this.$echarts.registerMap("myMapChina", this.geoJSON);
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
            map: "myMapChina",
            roam: false,
            top: "100",
            data: this.chartData,
            // 省会标记
            markPoint: {
              tooltip: {
                show: true,
                position: function (point) {
                  // 固定在顶部
                  return [point[0] - 10, point[1] + 10];
                },
                formatter: "{b}<br />{c}",
              },
              label: {
                show: false,
              },
              symbol: "circle",
              symbolSize: 5,
              itemStyle: {
                color: "#990000",
              },
              data: this.charDowntowns,
            },
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
      charDowntowns: [],
      coords: [
        { name: "沈阳市", coord: [123.429092, 41.796768, 0] },
        { name: "长春市", coord: [125.324501, 43.886841, 0] },
        {
          name: "哈尔滨市",
          coord: [126.642464, 45.756966, 0],
        },
        { name: "北京市", coord: [116.405289, 39.904987, 0] },
        { name: "天津市", coord: [117.190186, 39.125595, 0] },
        {
          name: "呼和浩特市",
          coord: [111.75199, 40.84149, 0],
        },
        { name: "银川市", coord: [106.23248, 38.48644, 0] },
        { name: "太原市", coord: [112.549248, 37.857014, 0] },
        {
          name: "石家庄市",
          coord: [114.502464, 38.045475, 0],
        },
        { name: "济南市", coord: [117.000923, 36.675808, 0] },
        { name: "郑州市", coord: [113.665413, 34.757977, 0] },
        { name: "西安市", coord: [108.948021, 34.263161, 0] },
        { name: "武汉市", coord: [114.298569, 30.584354, 0] },
        { name: "南京市", coord: [118.76741, 32.041546, 0] },
        { name: "合肥市", coord: [117.283043, 31.861191, 0] },
        { name: "上海市", coord: [121.472641, 31.231707, 0] },
        { name: "长沙市", coord: [112.982277, 28.19409, 0] },
        { name: "南昌市", coord: [115.892151, 28.676493, 0] },
        { name: "杭州市", coord: [120.15358, 30.287458, 0] },
        { name: "福州市", coord: [119.306236, 26.075302, 0] },
        { name: "广州市", coord: [113.28064, 23.125177, 0] },
        { name: "台北市", coord: [121.520076, 25.030724, 0] },
        { name: "海口市", coord: [110.19989, 20.04422, 0] },
        { name: "南宁市", coord: [108.320007, 22.82402, 0] },
        { name: "重庆市", coord: [106.504959, 29.533155, 0] },
        { name: "昆明市", coord: [102.71225, 25.040609, 0] },
        { name: "贵阳市", coord: [106.713478, 26.578342, 0] },
        { name: "成都市", coord: [104.065735, 30.659462, 0] },
        { name: "兰州市", coord: [103.83417, 36.06138, 0] },
        { name: "西宁市", coord: [101.77782, 36.61729, 0] },
        { name: "拉萨市", coord: [91.1145, 29.64415, 0] },
        { name: "乌鲁木齐市", coord: [87.61688, 43.82663, 0] },
        { name: "香港", coord: [114.16546, 22.27534, 0] },
        { name: "澳门", coord: [113.54913, 22.19875, 0] },
      ],
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
