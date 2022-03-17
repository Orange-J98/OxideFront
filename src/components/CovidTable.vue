<template>
  <div>
    <el-table
      :data="areaData"
      style="width: 100%"
      :default-sort="{ prop: 'vaccine', order: 'descending' }"
      height="600"
      :header-cell-style="{
        fontFamilt: 'Microsoft YaHei',
        fontSize: '22px',
        textAlign: 'center',
      }"
      :cell-style="cellStyle"
    >
      <el-table-column prop="areaId" label="地区"> </el-table-column>
      <el-table-column prop="new_cases" label="新增病例" sortable>
      </el-table-column>
      <el-table-column prop="new_cured" label="新增治愈" sortable>
      </el-table-column>
      <el-table-column prop="vaccine" label="疫苗接种率" sortable>
      </el-table-column>
      <el-table-column
        prop="present_cases"
        label="现有确诊病例"
        sortable
        :formatter="formatter"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CovidTable",
  props: ["mapScope"],
  mounted() {
    //TODO：当作为组件使用时，使用↓
    this.getAreaData(this.$store.state.mapScope);
    //单独测试使用↓
    // this.getAreaData('china');
  },
  computed: {
    all() {
      return {
        localMapScope: this.$store.state.mapScope,
        // historyData: this.districtData,
      };
    },
  },
  watch: {
    all(curVal) {
      this.localMapScope = curVal.localMapScope;
      this.getAreaData(this.localMapScope);

      // this.historyData = this.getHistData(curVal.areaId);
    },
  },
  data() {
    return {
      localMapScope: "",
      areaData: [],
    };
  },
  methods: {
    formatter(row) {
      return row.present_cases;
    },
    getAreaData(mapScope) {
      this.usersApi
        .getTableData(mapScope)
        .then((res) => {
          var temp = res.data;
          this.axios
            .get("/api/static/vaccination_rate.json")
            .then((res) => {
              for (let i = 0; i < temp.length; i++) {
                for (var key in res.data) {
                  if (temp[i].areaId == key) {
                    var str1 = parseFloat(res.data[key].rate);
                    temp[i].vaccine = str1;
                  }
                }
                if (temp[i].vaccine == null) {
                  temp[i].vaccine = 0;
                }
              }
              this.areaData = temp;
            })
            .catch((p) => {
              this.$message.error("无法获取疫苗接种信息");
              console.log("获取疫苗接种率错误：", p);
            });
        })
        .catch((p) => this.$message.error("出错了...." + p));
    },

    cellStyle(row) {
      //根据报警级别显示颜色
      if (row.column.label === "新增病例") {
        return "color:#f04a3a; fontSize:20px; fontWeight:bold; textAlign:center";
      } else if (row.column.label === "新增治愈") {
        return "color:#1781b5; fontSize:20px; fontWeight:bold; textAlign:center";
      } else if (row.column.label === "疫苗接种率") {
        return "color:#20894d; fontSize:20px; fontWeight:bold; textAlign:center";
      } else if (row.column.label === "现有确诊病例") {
        return "color:#ac1f18; fontSize:20px; fontWeight:bold; textAlign:center";
      } else if (row.column.label === "地区") {
        return 'fontFamily:"Microsoft YaHei";fontSize:20px; fontWeight:bold; textAlign:center';
      }
    },
  },
};
</script>

<style>
.el-table__body-wrapper::-webkit-scrollbar {
  width: 10px !important;
  height: 10px !important;
}
.el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #a1a3a9 !important;
  border-radius: 3px !important;
}
</style>