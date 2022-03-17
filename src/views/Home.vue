<template>
  <div class="home">
    <!-- <flight-inf></flight-inf> -->
    <news-overview></news-overview>
    <div style="height: 200px"></div>
    <covid-table></covid-table>
    <sickman-check></sickman-check>
    <img class="ml-auto mr-auto" alt="Vue logo" src="../assets/logo.png" />
    <div>
      <button
        @click="registerUser"
        class="text-lg bg-blue-100 shadow-md hover:shadow-lg p-2 rounded"
      >
        注册
      </button>
    </div>

    <div class="mt-4">
      <el-button type="primary" class="m-3">主要按钮</el-button>
      <el-button type="primary" plain>主要按钮</el-button>
    </div>

    <div>23456789</div>

    <div
      ref="exampleChart"
      class="ml-auto mr-auto"
      style="width: 600px; height: 400px"
    ></div>
    <hr />
    <mid-risk-areas></mid-risk-areas>
    <div style="height: 200px"></div>
    <high-risk-areas></high-risk-areas>
    <div style="height: 20px; background-color: red"></div>
    <!-- <tips-list></tips-list> -->
    <local-epidemic></local-epidemic>
    <light-covid-map></light-covid-map>
    <Calendar></Calendar>
    <div style="height: 100px; background-color: red"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import SickmanCheck from "../components/SickmanCheck.vue";
import MidRiskAreas from "../components/MidRiskArea.vue";
import HighRiskAreas from "../components/elders-home/HighRiskAreas.vue";
import LocalEpidemic from "../components/elders-home/LocalEpidemic";
import LightCovidMap from "../components/elders-home/LightCovidMap.vue";
import CovidTable from "../components/CovidTable.vue";
import Calendar from "../components/Calendar.vue";
import NewsOverview from "@/components/elders-home/panel/NewsOverview.vue"
export default {
  name: "Home",
  components: {
    sickmanCheck: SickmanCheck,
    MidRiskAreas,
    HighRiskAreas,
    LocalEpidemic,
    LightCovidMap,
    CovidTable,
    Calendar,
    NewsOverview,
  },
  created() {},
  mounted() {
    // 图表初始化
    var myChart = this.$echarts.init(this.$refs.exampleChart);
    var myChart_option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    };
    myChart.setOption(myChart_option);
  },
  methods: {
    registerUser() {
      // 将网络请求模块化，提升代码可维护性
      // 定义 UsersApi类 在 src/api
      // UsersApi实例化为 usersApi 在 main.js
      this.usersApi
        .createUser("string", "string")
        .catch((p) => alert(p.response.data.message));
    },
  },
};
</script>
