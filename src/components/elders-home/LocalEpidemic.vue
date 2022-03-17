<template>
  <div style="width: 500px">
    <div class="flex flex-row justify-center pt-6 pb-4">
      <div class="text-lg" style="padding-top: 5px">你的位置：</div>
      <div class="text-green-600 text-2xl">{{ tableData_local.name }}</div>
    </div>

    <div style="height: 116px">
      <div
        id="cells"
        class="
          flex
          space-x-3
          justify-center
          mt-1
          bg-gray-100
          p-3
          rouned-lg
          shadow-lg
          border-2
          h-32
        "
      >
        <cell
          name="现有确诊"
          :figure="tableData_local.present_cases"
          :delta="0"
          color="#ff6a57"
        ></cell>

        <cell
          name="累计确诊"
          :figure="tableData_local.total_cases"
          :delta="tableData_local.new_cases"
          color="#e83132"
        ></cell>

        <cell
          name="累计治愈"
          :figure="tableData_local.total_cured"
          :delta="tableData_local.new_cured"
          color="#10aeb5"
        ></cell>

        <cell
          name="累计死亡"
          :figure="tableData_local.total_deaths"
          :delta="tableData_local.new_deaths"
          color="#476da0"
        ></cell>
      </div>
    </div>

    <div>
      <el-row class="demo-autocomplete pt-10">
        <el-col>
          <!-- <div>{{ this.local_list }}</div> -->
          <div class="sub-title">手动查询疫情情况</div>
          <el-autocomplete
            class="inline-input"
            v-model="state"
            :fetch-suggestions="querySearch"
            placeholder="请输入省/市名"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete
          ><el-button type="primary" @click="change_inf">查询</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import cell from "./panel/cell.vue";

export default {
  name: "LocalEpidemic",
  components: { cell },
  props: {},
  mounted() {},
  data() {
    return {
      local_list: [],
      state: "",
      tableData_local: {
        id: "record_北京市_1625788800",
        time: 1625788800,
        total_cases: 1078,
        new_cases: 0,
        present_cases: 8,
        total_deaths: 9,
        new_deaths: 0,
        total_cured: 1061,
        new_cured: 0,
        suspected_cases: -1,
        severe_cases: 0,
        total_vaccines: -1,
        name: "北京市",
      },
      //   activeName: "high",
    };
  },
  methods: {
    open() {
      this.$alert("无当前地区信息！", "", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    },
    wrong_name() {
      this.$message.error({
        message:
          "该城市不存在！请确认输入地区为市级或以上级别，且信息以“市”或“省”字结尾",
        duration: 5000,
      });
      // this.$alert(
      //   "该城市不存在！请确认输入地区为市级及以上级别，且信息以“市”或“省”字结尾！",
      //   "请求错误",
      //   {
      //     confirmButtonText: "确定",
      //     // callback: (action) => {
      //     //   this.$message({
      //     //     type: "info",
      //     //     message: `action: ${action}`,
      //     //   });
      //     // },
      //   }
      // );
    },
    change_inf() {
      this.usersApi
        .getCityAndProvinceRecords(this.state)
        .then((res) => {
          var myData = res.data[0];
          // console.log(myData);
          // console.log(res.data.length);
          // console.log(myData);
          // var xxdata = [];
          // if (xxdata.length == 0) this.open();
          if (res.data.length == 0) {
            this.open();
          } else {
            this.tableData_local = myData;
          }
        })
        .catch(() => this.wrong_name());
    },
    querySearch(queryString, cb) {
      // var last_char = queryString.charAt(queryString.length - 1);
      // if(last_char!='市')
      // console.log(queryString.charAt(queryString.length - 1));
      this.usersApi
        .ChangeLocation(queryString)
        .then((res) => {
          var myData = res.data;
          this.local_list = myData;
          //
          var r = [];
          this.local_list.forEach((e) => {
            var item = {
              value: e,
            };
            r.push(item);
          });
          var results = queryString
            ? r.filter(this.createFilter(queryString))
            : r;
          // 调用 callback 返回建议列表的数据
          cb(results);
        })
        .catch((p) => alert(p.response.data.message));
    },
    createFilter(queryString) {
      return (local_list) => {
        return (
          local_list.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    init_localList() {
      this.usersApi
        .getmylocation_data()
        .then((res) => {
          var myData = res.data[0];
          this.tableData_local = myData;
          console.log(this.tableData_local);
        })
        .catch((p) => alert(p.response.data.message));
    },
  },
};
</script>

<style>
/* 地区单独加粗 */
.localbox_ly {
  width: 500px;
  border-style: groove;
  border-width: 5px;
  border: 5px solid;
}
#local_aredname {
  font: 35px Arial;
  font-weight: bold;
  border-style: groove;
  border-right-width: 5px;
  border-bottom-width: 5px;
}

.box_local {
  width: 500px;
}

.line1,
.line3 {
  width: 120px;
  height: 50px;
  color: #333333;
  font: 25px Arial;
  font-weight: bold;
}

.line2,
.line4 {
  font-size: 25px;
}

/* 以下修改数字的颜色 */
#a2 {
  color: #ff6a57;
}

#a3 {
  color: #476da0;
}
#a4 {
  color: #545499;
}
#c1 {
  color: #ec9217;
}
#c2 {
  color: #e83132;
}
#c3 {
  color: #10aeb5;
}
#c4 {
  color: #4d5054;
}
</style>
