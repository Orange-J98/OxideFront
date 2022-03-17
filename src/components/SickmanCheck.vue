<template>
  <div>
    <!-- 查询表单 -->
    <div style="width: 50%">
      <el-form
        ref="sizeForm"
        :model="sizeForm"
        label-width="80px"
        size="medium"
      >
        <el-form-item label="火车车次/航班号" label-width="120px">
          <el-input v-model="sizeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地区">
          <el-input v-model="sizeForm.region"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="sizeForm.date"
              style="width: 100%"
              format="yyyy年 MM月 dd日"
              value-format="MM-dd"
            ></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据展示 -->
    <div>
      <el-table
        :data="tableData"
        stripe
        style="width: 50%"
        :border="true"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="date" label="日期" sortable> </el-table-column>
        <el-table-column prop="fNumber" label="车次/航班"> </el-table-column>
        <el-table-column prop="origin" label="始发地"> </el-table-column>
        <el-table-column prop="dest" label="目的地"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      sizeForm: {
        name: "", //火车车次/航班号
        region: "", //区域
        date: "", //时间
      },
    };
  },
  methods: {
    getinf() {
      var sickdate = [
        {
          date: "06-26",
          fNumber: "3U8392",
          origin: "上海",
          dest: "成都",
        },
        {
          date: "06-23",
          fNumber: "G72405",
          origin: "武汉",
          dest: "广元",
        },
        {
          date: "06-02",
          fNumber: "T40293",
          origin: "宁夏",
          dest: "重庆",
        },
        {
          date: "08-22",
          fNumber: "G2887",
          origin: "武汉",
          dest: "北京",
        },
        {
          date: "05-30",
          fNumber: "CZ3377",
          origin: "绵阳",
          dest: "太原",
        },
        {
          date: "09-21",
          fNumber: "CZ5784",
          origin: "郑州",
          dest: "石家庄",
        },
        {
          date: "03-01",
          fNumber: "D8237",
          origin: "济宁",
          dest: "青岛",
        },
        {
          date: "04-22",
          fNumber: "CZ2840",
          origin: "苏州",
          dest: "南昌",
        },
      ];
      return sickdate;
    },
    onSubmit() {
      this.$message({
        message: "查询成功",
        type: "success",
      });
      this.tableData = this.getinf();
      console.log(this.sizeForm.date);
    },
  },
};
</script>