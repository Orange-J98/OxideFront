<template>
  <div class="Flightbox">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="航班号"> </el-table-column>
      <el-table-column prop="origin" label="始发地"> </el-table-column>
      <el-table-column prop="des" label="目的地"> </el-table-column>
      <el-table-column prop="go" label="出发时间"> </el-table-column>
      <el-table-column prop="arrival" label="到达时间"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "FlightInf",
  props: {},
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    // 返回航班数据。赋值给tabledata
    var mydate = [
      {
        id: "9c8956",
        origin: "厦门",
        des: "邯郸",
        go: "2021-07-04 20:45:12",
        arrival: "2021-07-04 20:45:15",
      },
      {
        id: "9c8957",
        origin: "北京",
        des: "上海",
        go: "2021-07-03 20:45:12",
        arrival: "2021-07-03 20:45:12",
      },
      {
        id: "9c8958",
        origin: "成都",
        des: "广元",
        go: "2021-07-05 20:45:12",
        arrival: "2021-07-05 20:45:12",
      },
      {
        id: "9c8959",
        origin: "乌鲁木齐",
        des: "呼和浩特",
        go: "2021-07-06 20:45:12",
        arrival: "2021-07-06 20:45:12",
      },
      {
        id: "9c8959",
        origin: "乌鲁木齐",
        des: "银川",
        go: "2021-07-06 20:45:12",
        arrival: "2021-07-06 20:45:12",
      },
      {
        id: "9c8959",
        origin: "广州",
        des: "深圳",
        go: "2021-07-06 20:45:12",
        arrival: "2021-07-06 20:45:12",
      },
      {
        id: "9c8959",
        origin: "海口",
        des: "重庆",
        go: "2021-07-06 20:45:12",
        arrival: "2021-07-06 20:45:12",
      },
      {
        id: "9c8959",
        origin: "合肥",
        des: "南京",
        go: "2021-07-06 20:45:12",
        arrival: "2021-07-06 20:45:12",
      },
      {
        id: "9c8959",
        origin: "兰州",
        des: "上海",
        go: "2021-07-06 20:45:12",
        arrival: "2021-07-06 20:45:12",
      },
      {
        id: "9c8959",
        origin: "西安",
        des: "香港",
        go: "2021-07-06 20:45:12",
        arrival: "2021-07-06 20:45:12",
      },
      {
        id: "9c8959",
        origin: "厦门",
        des: "拉萨",
        go: "2021-07-06 20:45:12",
        arrival: "2021-07-06 20:45:12",
      },
      {
        id: "9c8959",
        origin: "长春",
        des: "沈阳",
        go: "2021-07-06 20:45:12",
        arrival: "2021-07-06 20:45:12",
      },
    ];
    this.tableData = mydate;
  },
};
</script>