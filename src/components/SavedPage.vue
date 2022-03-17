<template>
    <div class="saved">
        <el-table :data="tableData" :stripe="true" style="width: 100%" :cell-style="cellstyle" :header-cell-style="{background: 'lightgrey'}">
            <el-table-column prop="area" label="地区" width="180"></el-table-column>
            <el-table-column prop="total_con" label="累计确诊" width="120"></el-table-column>
            <el-table-column prop="new_con" label="新增确诊" width="120"></el-table-column>
            <el-table-column prop="now_con" label="现有确诊" width="120"></el-table-column>
            <el-table-column prop="total_death" label="累计死亡" width="120"></el-table-column>
            <el-table-column prop="new_death" label="新增死亡" width="120"></el-table-column>
            <el-table-column prop="total_covered" label="累计治愈" width="120"></el-table-column>
            <el-table-column prop="new_covered" label="新增治愈" width="120"></el-table-column>
            <el-table-column prop="test" label="现有疑似" width="120"></el-table-column>
            <el-table-column prop="icu" label="现有重症" width="120"></el-table-column>
            <el-table-column prop="vaccine" label="接种数目"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default({
    name: "saved",
    props: {},
    data(){
    return {
      tableData:[]
    }
  },

  mounted(){
     this.tableData = [
        {
            "area": "北京市 海淀区",
            "total_con": "1",
            "new_con": "1",
            "now_con": "1",
            "total_death": "1",
            "new_death": "1",
            "total_covered": "1",
            "new_covered": "1",
            "test": 1,
            "icu": 1,
            "vaccine": 1
        },
        {
            "area": "北京市 海淀区",
            "total_con": "1",
            "new_con": "1",
            "now_con": "1",
            "total_death": "1",
            "new_death": "1",
            "total_covered": "1",
            "new_covered": "1",
            "test": 1,
            "icu": 1,
            "vaccine": 1
        },
        {
            "area": "北京市 海淀区",
            "total_con": "1",
            "new_con": "1",
            "now_con": "1",
            "total_death": "1",
            "new_death": "1",
            "total_covered": "1",
            "new_covered": "1",
            "test": 1,
            "icu": 1,
            "vaccine": 1
        }
    ]
  },

  methods: {
      cellstyle(row){
          if(row.column.label==='累计确诊' || row.column.label==='新增确诊' || row.column.label==='现有确诊'){
              return 'color: orange'
          }
          if(row.column.label==='累计死亡' || row.column.label==='新增死亡'){
              return 'color: #CD5555'
          }
          if(row.column.label==='累计治愈' || row.column.label==='新增治愈'){
              return 'color: lightgreen'
          }
          if(row.column.label==='现有疑似'){
              return 'color: #f0d528'
          }
          if(row.column.label==='现有重症'){
              return 'color: red'
          }
          if(row.column.label==='接种数目'){
              return 'color: limegreen'
          }
      }
  }
})
</script>

<style scoped>

</style>
