<template>
  <div class="HighRiskAreas">
    <el-table
      :data="tableData"
      :stripe="true"
      style="width: 50%"
      height="300"
      :header-cell-style="{
        background: '#f0f9eb',
        fontFamily: 'Helvetica',
        fontSize: '14px',
      }"
    >
      <el-table-column prop="areaId" label="地区"></el-table-column>
      <el-table-column prop="description" label="地址"></el-table-column>
      <el-table-column prop="level" label="风险等级" class-name="high-level"
        >高风险</el-table-column
      >
    </el-table>
  </div>
</template>

<script>
export default {
  name: "HighRiskAreas",
  props: {},
  mounted() {
    this.initList();
  },
  data() {
    return {
      activeName: "high",

      tableData: [
        // {
        //     area: "广东省 深圳市 宝安区",
        //     address: "福永街道下十围商住街71号新蓝天公寓",
        //     level: "高风险"
        // }
      ],
    };
  },
  methods: {
    initList() {
      this.usersApi
        .getRiskyAreas()
        .then((res) => {
          // console.log(res.data);
          var myData = res.data;
          myData.forEach((element) => {
            if (element.risk == "high") {
              this.tableData.push(element);
            }
          });
        })

        .catch((p) => alert(p.response.data.message));
    },
  },
};
</script>

<style>
.high-level {
  color: red;
}
</style>
