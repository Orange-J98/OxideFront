<template>
  <div class="ExistAccumuChart">
    <div ref="ExistAccumuChart" style="width: 800px; height: 620px"></div>
  </div>
</template>

<script>
export default {
  name: "ExistAccumuCharts",
  props: ["dataset", "CountryName"],
  data() {
    return {
      areaId: "",
      data: "",
    };
  },
  created() {
  },
  mounted() {
    this.$nextTick(()=>{
      this.areaId = this.CountryName;
      this.data = this.dataset;
      this.myExistAccumuCharts();
    })
  },
  computed: {
    all() {
      return {
        CountryName: this.CountryName,
        dataset: this.dataset,
      };
    },
  },
  watch: {
    all(curVal) {
      this.areaId = curVal.CountryName;
      this.data = curVal.dataset;
      this.myExistAccumuCharts();
    },
  },
  methods: {
    myExistAccumuCharts() {
      var myExistAccumuChart = this.$echarts.init(
        this.$refs.ExistAccumuChart
      );
      var titleName = this.areaId + "现有/累计确诊趋势对比图";
      var datay = [];
      for (let i = 0; i < this.data.length; i++) {
        var present_cases = "";
        var total_cases = "";
        var time = this.data[i].time * 1000;
        if (this.data[i].present_cases != -1) {
          present_cases = this.data[i].present_cases;
        }
        if (this.data[i].total_cases != -1) {
          total_cases = this.data[i].total_cases;
        }
        datay.push([time, present_cases, total_cases]);
      }

      var option = {
        dataset: {
          source: datay,
        },
        title: {
          text: titleName,
          textStyle: {
            color: "#7a0000",
            fontStyle: "oblique",
          },
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["现有确诊病例", "累计确诊病例"],
          right: "20%",
        },
        grid: {
          left: "3%",
          right: "8%",
          bottom: "8%",
          containLabel: true,
        },
        xAxis: {
          type: "time",
          boundaryGap: false,
        },
        yAxis: [{
          name: "现有确诊病例",
          type: "value",
          axisLine:{
              show:true,
              lineStyle:{
                color:'black',
                width:3,//这里是为了突出显示加上的
              }
            },
        },{
            name: '累计确诊病例',
            type: 'value',
            axisLine:{
              show:true,
              lineStyle:{
                color:'black',
                width:3,
              },
            },
        }],
        dataZoom: [
          {
            type: "inside",
            filterMode: "none",
            start: 50,
            end: 100,
          },
          {
            type: "slider",
            filterMode: "none",
            start: 70,
            end: 100,
            dataBackground: {
              areaStyle: {
                color: "rgba(245, 49, 0, 1)",
                shadowBlur: 50,
                shadowColor: "rgba(163, 0, 0, 1)",
              },
            },
            borderColor: "rgba(181, 6, 6, 1)",
            handleSize: "56%",
            handleStyle: {
              color: "rgba(247, 173, 173, 1)",
              borderColor: "rgba(225, 139, 139, 1)",
              borderWidth: 0,
              borderType: "solid",
              shadowBlur: 1,
              shadowColor: "rgba(255, 163, 163, 1)",
              opacity: 0.5,
            },
            moveHandleIcon: "circle",
            moveHandleSize: 8,
            moveHandleStyle: {
              color: "rgba(251, 175, 175, 1)",
              borderColor: "rgba(116, 1, 1, 1)",
              borderWidth: 0.5,
              shadowBlur: 0,
              opacity: 0.8,
              shadowColor: "rgba(237, 67, 67, 1)",
            },
            brushStyle: {
              color: "rgba(159, 22, 22, 1)",
            },
            emphasis: {
              handleStyle: {
                color: "rgba(176, 1, 1, 1)",
                borderColor: "rgba(170, 1, 1, 1)",
              },
              moveHandleStyle: {
                color: "rgba(191, 71, 71, 1)",
                borderColor: "rgba(247, 128, 128, 1)",
                opacity: 0.5,
              },
            },
          },
        ],
        series: [
          {
            name: "现有确诊病例",
            type: "line",
            // stack: '总量',
            symbol: "none",
            encode: { x: 0, y: 1 },
            yAxisIndex: 0,
            itemStyle: {
              color: "#ff7575",
              shadowColor: "#ff0000",
            },
          },
          {
            name: "累计确诊病例",
            type: "line",
            // stack: '总量',
            symbol: "none",
            yAxisIndex: 1,
            encode: { x: 0, y: 2 },
            itemStyle: {
              color: "#800000",
              shadowColor: "#ff0000",
            },
          },
        ],
      };
      myExistAccumuChart.setOption(option);
    },
  },
};
</script>

<style>
</style>
