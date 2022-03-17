<template>
  <div>
    <div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="中国" name="first">
          <epidemic-table :tableData="tableData1"> </epidemic-table>
        </el-tab-pane>
        <el-tab-pane label="世界" name="second">
          <epidemic-table :tableData="tableData2"> </epidemic-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import EpidemicTable from "./EpidemicTable.vue";
export default {
  components: { EpidemicTable },
  data() {
    return {
      activeName: "first",
      tableData1: {
        id: 0,
        areaId: 0,
        time: 0,
        active: 0, //现有确诊
        activeDelta: 0,
        totalCases: 0, //累计确诊
        totalCasesDelta: 0,
        cured: 0, //累计治愈
        curedDelta: 0,
        death: 0, //累计死亡
        deathDelta: 0,
        vaccine: 0, //累计接种
        vaccineDelta: 0,
      },
      tableData2: {
        id: 0,
        areaId: 0,
        time: 0,
        active: 0, //现有确诊
        activeDelta: 0, //
        totalCases: 0, //累计确诊
        totalCasesDelta: 0, //
        cured: 0, //累计治愈
        curedDelta: 0,
        death: 0, //累计死亡
        deathDelta: 0,
        vaccine: 0, //累计接种
        vaccineDelta: 0,
      },
    };
  },
  created() {
    this.initList();
  },
  methods: {
    handleClick() {
      // console.log(this.activeName);
      // console.log(this.tableData1);
    },
    initList() {
      this.usersApi
        .getPanelRecords("中国")
        .then((res) => {
          console.log(res);
          var myData = res.data[0];
          this.tableData1 = myData;
        })
        .catch((p) => alert(p.response.data.message));

      this.usersApi
        .getPanelRecords("世界")
        .then((res) => {
          var myData = res.data[0];
          this.tableData2 = myData;
        })
        .catch((p) => alert(p.response.data.message));
    },
  },
};
</script>
<style scoped>
</style>