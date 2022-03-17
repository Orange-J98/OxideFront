<template>
  <div class="MidRiskAreas">
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
      <el-table-column prop="level" label="风险等级" class-name="middle-level"
        >中风险</el-table-column
      >
    </el-table>
  </div>
</template>

<script>
export default {
  name: "MidRiskAreas",
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
        //     level: "中风险"
        // }
      ],
    };
  },
  methods: {
    initList() {
      console.log("------");
      this.usersApi
        .getRiskyAreas()
        .then((res) => {
          // console.log(res.data);
          var myData = res.data;
          myData.forEach((element) => {
            if (element.risk == "mid") {
              this.tableData.push(element);
            }
          });
        })
        // .catch((p) => alert(p.response.data.message));
        .catch((p) => console.log(p));
    },
  },
};
</script>

<style>
.high-level {
  color: red;
}

.middle-level {
  color: orange;
}
</style>
