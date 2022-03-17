<template>
  <div class="tendencyChart">
    <div ref="tendencyChart" style="width: 800px;height:620px;"></div>
  </div>
</template>

<script>
export default {
  name: 'tendencyCharts',
  props: ["dataset","CountryName"],
  data() {
    return {
      areaId:"",
      data:"",
    };
  },
  created(){
  },
  mounted() {    
    this.$nextTick(()=>{
    this.areaId = this.CountryName;
      this.data = this.dataset
      this.myTendencyCharts();
    })
  },
	computed:{
		all(){
			return {
        CountryName:this.CountryName,
        dataset: this.dataset
      };
		}
	},
	watch:{
		all(curVal){
      this.areaId = curVal.CountryName;
      this.data = curVal.dataset
			this.myTendencyCharts();
		}
	},
  methods:{
	myTendencyCharts(){
        var myTendencyChart = this.$echarts.init(this.$refs.tendencyChart);
        var titleName = this.areaId + "疫情趋势";
        var datay = [];
        // var test = [];
        console.log("data",this.data);
        for (let i = 0; i < this.data.length; i++) {
          var value = this.data[i].new_cases;
          var time = this.data[i].time*1000;
          if(value != -1){
              datay.push([time,value]);
          }else{
            datay.push([time,""]);
          }
         
        }

        var option = {        
        title: {
            text: titleName,
            textStyle: {
                color: '#7a0000',
                fontStyle: 'oblique',
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['新增病例'],
            right: '20%'
        },
        grid: {
            left: '3%',
            right: '8%',
            bottom: '8%',
            containLabel: true
        },
        xAxis: {
            type: 'time',
        },
        yAxis: {
            name: '新增病例',
            type: 'value',
            axisLine:{
              show:true,
              lineStyle:{
                color:'#c23531',
                width:3,
              },
            },
        },
        series: [
            {
              name: '新增病例',
              type: 'line',
              symbol: 'none',
              data: datay,
              connectNulls: true,
              itemStyle: {
                color: '#c23531',
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
        ],
        dataZoom: [
        {
          type: 'inside',
          filterMode: 'none',
          start:50,
          end:100,
					
        }, 
				{
            type: 'slider',
            filterMode: 'none',
						start:70,
						end:100,
						dataBackground: {
							areaStyle: {
								color: "rgba(245, 49, 0, 1)",
								shadowBlur: 50,
								shadowColor: "rgba(163, 0, 0, 1)"
							}
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
							opacity: 0.5
						},
						moveHandleIcon: "circle",
						moveHandleSize: 8,
						moveHandleStyle: {
							color: "rgba(251, 175, 175, 1)",
							borderColor: "rgba(116, 1, 1, 1)",
							borderWidth: 0.5,
							shadowBlur: 0,
							opacity: 0.8,
							shadowColor: "rgba(237, 67, 67, 1)"
						},
						brushStyle: {
							color: "rgba(159, 22, 22, 1)"
						},
						emphasis: {
							handleStyle: {
								color: "rgba(176, 1, 1, 1)",
								borderColor: "rgba(170, 1, 1, 1)"
							},
							moveHandleStyle: {
								color: "rgba(191, 71, 71, 1)",
								borderColor: "rgba(247, 128, 128, 1)",
								opacity: 0.5
							}
						}
						},
        ],
        };        
        myTendencyChart.setOption(option);
    }
    },

}
</script>

<style>

</style>
