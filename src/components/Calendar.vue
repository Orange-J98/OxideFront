<template>
  <div class="local_calendar">
    <div class="bg-white opacity-60">
      <div class="day font-bold">{{ this.date_line1 }}</div>
      <div class="miao font-bold">
        {{ this.date_line2 }}
      </div>
      <div class="year font-bold">
        {{ this.date_line3 }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Calendar",
  data() {
    return {
      // data_day: "11",
      // data_month: "7",
      // data_year: "2021",
      // data_hour: "23",
      // data_min: "12",
      // data_second: "06",
      date_line1: "",
      date_line2: "",
      date_line3: "",
    };
  },
  created() {
    setInterval(this.get_time, 1000);
  },

  methods: {
    get_time() {
      var time = new Date();
      // console.log(1);
      // this.data_day = time.getDate();
      // this.data_month = time.getMonth() + 1;
      // this.data_year = time.getFullYear();
      this.date_line1 = this.$moment(time).format("DD日");
      this.date_line2 = this.$moment(time).format("HH:mm:ss");
      this.date_line3 = this.$moment(time).format("yyyy 年 M 月");
    },
  },
};
</script>

<style>
.local_calendar {
  background-image: url(image2.jpg);
  overflow: hidden;
  width: 320px;
  height: 100%;
  border-radius: 0.375rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.day {
  width: 100%;
  /* background-color: #409eff; */
  font: 75px Aril;
  height: 40%;
}
.miao {
  width: 100%;
  /* background-color: #409eff; */
  font: 42px Aril;
  height: 30%;
}
.year {
  /* background-color: #ebeef5; */
  font: 35px Aril;
  height: 30%;
}
</style>