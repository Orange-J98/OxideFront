<template>
  <div class="CureDeathChart">
    <div ref="CureDeathChart" style="width: 800px;height:620px;"></div>
  </div>
</template>

<script>
export default {
  name: 'CureDeathCharts',
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
      this.myCureDeathCharts();
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
			this.data = curVal.dataset;
			this.myCureDeathCharts();
		}
	},
  methods:{
	myCureDeathCharts(){
        var myCureDeathChart = this.$echarts.init(this.$refs.CureDeathChart);
        var titleName = this.areaId + "治愈/死亡趋势对比图"
				var datay = [];
				for (let i = 0; i < this.data.length; i++) {
					var total_cured = "";
          var total_deaths = "";
          var new_cured = "";
          var new_deaths = "";
          var time = this.data[i].time*1000;
          if(this.data[i].total_cured!=-1){
            total_cured = this.data[i].total_cured;
          }
          if(this.data[i].total_deaths!=-1){
            total_deaths = this.data[i].total_deaths
          }
          if(this.data[i].new_cured!=-1){
            new_cured = this.data[i].new_cured
          }
          if(this.data[i].new_deaths!=-1){
            new_deaths = this.data[i].new_deaths
          }
          datay.push(
            [time,total_cured,total_deaths,new_cured,new_deaths]
          )
        }
				var option = {
        dataset:{
            source: datay
        },
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
            data: ['累计治愈病例','累计死亡病例','新增治愈病例','新增死亡病例'],
            selected:{'累计治愈病例':true,'累计死亡病例':true,'新增治愈病例':false,'新增死亡病例':false},
            right: '8%',
        },
        grid: {
            left: '3%',
            right: '8%',
            bottom: '8%',
            containLabel: true
        },
        xAxis: {
            type: 'time',
            boundaryGap: false,
        },
        yAxis: [{
            name: '治愈病例',
            type: 'value',
            position:'left',
            axisLine:{
              show:true,
              lineStyle:{
                color:'#409EFF',
                width:3,
              }
            },
        },{
            name: '死亡病例',
            type: 'value',
            position:'right',
            axisLine:{
              show:true,
              lineStyle:{
                color:'#000303',
                width:3,
              }
            },
        }],
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
        series: [
            {
                name: '累计治愈病例',
                type: 'line',
                encode:{x:0,y:1},
								symbol: 'none',
                yAxisIndex:0,
                itemStyle: {
                    color: '#409EFF',
                    shadowColor: '#007be4',
                },
            },
            {
                name: '累计死亡病例',
                type: 'line',
                encode:{x:0,y:2},
								symbol: 'none',
                yAxisIndex: 1,
                itemStyle: {
                    color: '#000303',
                    shadowColor: '#0d0916',
                },
            },
            {
                name: '新增治愈病例',
                type: 'line',
                encode:{x:0,y:3},
								symbol: 'none',
                yAxisIndex:0,
                itemStyle: {
                    color: '#10aeb5',
                    shadowColor: '#007be4',
                },
            },
            {
                name: '新增死亡病例',
                type: 'line',
                yAxisIndex: 1,
                encode:{x:0,y:4},
								symbol: 'none',
                itemStyle: {
                    color: '#476da0',
                    shadowColor: '#0d0916',
                },
            },
        ]
        };        
        myCureDeathChart.setOption(option);
    }
    },
}
</script>
