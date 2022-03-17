<template>
  <div>
    <div class="flex justify-center" style="background-color: #66a9c9">
      <div class="HomePage">
        <div class="flex flex-row bg-white pt-1">
          <div class="columnleft">
            <div id="epidemic-panel" class="mb-6 flex flex-col justify-center">
              <div class="border-2 pb-8 pl-8 pr-8 rounded-md shadow-md">
                <epidemic-panel></epidemic-panel>
              </div>
              <div class="mt-4">
                <div class="flex justify-center items-center">
                  <div
                    class="
                      shadow-md
                      flex
                      justify-center
                      border-t-2
                      h-80
                      hover:border-green-300
                      border-2
                    "
                  >
                    <local-epidemic style="height: 280px"></local-epidemic>
                  </div>
                  <div
                    id="high-risk-areas"
                    class="hover:border-green-300 border-2 ml-4 h-80"
                    style="overflow: auto"
                  >
                    <risky-areas style="height: 280px"></risky-areas>
                  </div>
                </div>
              </div>
              <div class="TableBox" style="width: 900px; padding-top: 10px">
                <covid-table></covid-table>
              </div>
            </div>
          </div>
          <div class="columnright ml-4">
            <div class="calendarBox border-t-2 rounded-md">
              <calendar></calendar>
            </div>
            <div class="NewsBox mt-4">
              <news-overview></news-overview>
            </div>
          </div>
        </div>

        <div class="border-2 hover:border-green-300">
          <light-covid-map></light-covid-map>
        </div>
        <footer>
      <p>数据来源：</p>
      <div>
        <a
          target="_blank"
          href="https://voice.baidu.com/act/newpneumonia/newpneumonia/"
          class="hover:underline"
          >面板数据</a
        >
      </div>

      <div>
        <a target="_blank" href="https://cov19.cc/" class="hover:underline"
          >面板数据（疫苗）</a
        >
      </div>

      <div>
        <a
          target="_blank"
          href="https://wechat.wecity.qq.com/api/THPneumoniaOuterDataService/getForeignCountry"
          class="hover:underline"
          >国外历史数据（国家级别）</a
        >
      </div>

      <div>
        <a
          target="_blank"
          href="https://voice.baidu.com/act/newpneumonia/newpneumonia/"
          class="hover:underline"
          >国内历史数据（城市级，省级和国家级）</a
        >
      </div>

      <div>
        <a
          target="_blank"
          href="https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json"
          class="hover:underline"
          >疫苗接种数据（国家级别，剂次）</a
        >
      </div>
    </footer>
      </div>
    </div>
    
  </div>
</template>

<script>
import EpidemicPanel from "./panel/EpidemicPanel.vue";
import LocalEpidemic from "./LocalEpidemic.vue";
import LightCovidMap from "./LightCovidMap.vue";
import RiskyAreas from "./risky-areas.vue";
import CovidTable from "../CovidTable.vue";
import NewsOverview from "./panel/NewsOverview.vue";
import Calendar from "../Calendar.vue";

export default {
  components: {
    EpidemicPanel,
    LocalEpidemic,
    LightCovidMap,
    RiskyAreas,
    CovidTable,
    NewsOverview,
    Calendar,
  },
  name: "EldersHome",
};
</script>

<style scoped>
.HomePage {
  background-color: white;
}
</style>