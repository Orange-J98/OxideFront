<template>
  <div class="barChartOnRight mt-8">
    <div class="title">
      <i class="type">{{ this.mapScope }}{{ typeName }}柱状图总览</i>
    </div>
    <div ref="barChartOnRight" style="width: 400px; height: 620px"></div>
  </div>
</template>

<script>
export default {
  name: "barChartOnRight",
  components: {},
  props: [
    "mapScope",
    "typeName", //数据类型名
    "subAreaDataSet", //分省数据集
  ],
  data() {
    return {
      isChina: true,
      chartData: [],
    };
  },
  watch: {
    watchThese(curVal) {
      this.chartData = curVal.districtData;
      this.myBarCharts();
    },
  },
  computed: {
    watchThese() {
      return {
        subAreaDataSet: this.subAreaDataSet,
      };
    },
  },
  methods: {
    myBarCharts() {
      var myBarChart = this.$echarts.init(
        this.$refs.barChartOnRight
      );
      var dataName = [];
      var dataValue = [];
      var data = this.subAreaDataSet.areaDataList;
      data = data.sort(function (a, b) {
        return a.value - b.value;
      });
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        dataName[i] = data[i].name;
        if (data[i].value === -1) {
          dataValue[i] = 0;
        } else {
          dataValue[i] = data[i].value;
        }
      }
      var option = {
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: dataName,
          axisLabel: {
            color: "black",
            fontSize: 16,
            fontWeight: "bold",
          },
        },
        grid: {
          x: 110,
          y: 5,
          x2: 46,
          y2: 65,
        },
        tooltip: {
          trigger: "axis",
          itemStyle: {
            opacity: 0.5,
          },
        },
        dataZoom: [
          {
            type: "inside",
            filterMode: "none",
            yAxisIndex: [0],
            start: 55,
            end: 100,
            maxSpan: 45,
            minSpan: 45,
          },
          {
            type: "slider",
            filterMode: "none",
            yAxisIndex: [0],
            start: 55,
            end: 100,
            maxSpan: 45,
            minSpan: 45,
            handleSize: "0%",
            moveHandleSize: 10,
          },
          {
            type: "slider",
            filterMode: "none",
          },
        ],
        series: [
          {
            name: this.typeName,
            // data: [120, 200, 150, 80, 70, 20, 23, 241, 23, 500, 442, 321],
            data: dataValue,
            type: "bar",
            barWidth: 30,
            itemStyle: {
              normal: {
                color: "#c23531",
                shadowColor: "rgba(0, 0, 0, 0.5)",
                label: {
                  show: true,
                  position: "right",
                  textstyle: {
                    color: "black",
                    fontSize: 16,
                  },
                },
              },
            },
          },
        ],
      };
      myBarChart.setOption(option);
    },
  },
  created() {},
  mounted() {
    this.myBarCharts();
  },
};
</script>

<style>
.type {
  font-family: "Microsoft Yahei";
  font-style: italic;
  font-weight: bold;
  font-size: 20px;
}
.num {
  color: #c23531;
  font-family: "Times New Roman";
  font-style: italic;
  font-weight: bold;
  font-size: 25px;
  margin-left: 10px;
}
</style>
