<template>
  <div class="Map">
    <div v-if="geoJSON && districtData">
      <!-- Todo：高风险区 -->
      <div ref="myMap" style="width: 900px; height: 600px"></div>
      <div v-if="this.areaId">
        <hist-data-chart :areaId="this.areaId"></hist-data-chart>
      </div>
    </div>
  </div>
</template>

<script>
import histDataChart from "./histDataChart.vue";
export default {
  name: "map",
  props: ["mapScope", "geoJSON", "districtData", "districtHighRiskAreas", 'dataType'],
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
    this.dealData();
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
      var myChart = this.$echarts.init(this.$refs.myMap);
      this.$echarts.registerMap("myMap", this.geoJSON);
      var option;
      console.log("render", this.charDowntowns);
      if (this.mapScope == "china") {
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
              map: "myMap",
              roam: true,
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
      } else {
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
              map: "myMap",
              roam: true,
              top: "100",
              data: this.chartData,
              markPoint: {
                data: null,
              },
            },
          ],
        };
      }

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
      chartData: [
        { name: "北京市", value: 100 },
        { name: "天津市", value: 21 },
        { name: "上海市", value: 15 },
        { name: "重庆市", value: 20 },
        { name: "河北省", value: 77 },
        { name: "河南省", value: 26 },
        { name: "云南省", value: 10 },
        { name: "辽宁省", value: 56 },
        { name: "黑龙江省", value: 21 },
        { name: "湖南省", value: 88 },
        { name: "安徽省", value: 100 },
        { name: "山东省", value: 43 },
        { name: "新疆维吾尔自治区", value: 19 },
        { name: "江苏省", value: 65 },
        { name: "浙江省", value: 34 },
        { name: "江西省", value: 82 },
        { name: "湖北省", value: 26 },
        { name: "广西壮族自治区", value: 84 },
        { name: "甘肃省", value: 55 },
        { name: "山西省", value: 42 },
        { name: "内蒙古自治区", value: 12 },
        { name: "陕西省", value: 60 },
        { name: "吉林省", value: 75 },
        { name: "福建省", value: 12 },
        { name: "贵州省", value: 40 },
        { name: "广东省", value: 74 },
        { name: "青海省", value: 45 },
        { name: "西藏自治区", value: 92 },
        { name: "四川省", value: 42 },
        { name: "宁夏回族自治区", value: 18 },
        { name: "海南省", value: 62 },
        { name: "台湾省", value: 17 },
        { name: "香港特别行政区", value: 83 },
        { name: "澳门特别行政区", value: 25 },
      ],
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
</style>
