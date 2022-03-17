<template>
  <div>
    <div id="cells" class="flex justify-around">
      <cell
        name="现有确诊"
        :figure="tableData.active"
        :delta="tableData.activeDelta"
        color="#ff6a57"
      ></cell>

      <cell
        name="累计确诊"
        :figure="tableData.totalCases"
        :delta="tableData.totalCasesDelta"
        color="#e83132"
      ></cell>

      <cell
        name="累计治愈"
        :figure="tableData.cured"
        :delta="tableData.curedDelta"
        color="#10aeb5"
      ></cell>

      <cell
        name="累计死亡"
        :figure="tableData.death"
        :delta="tableData.deathDelta"
        color="#476da0"
      ></cell>

      <cell
        name="累计接种"
        :figure="tableData.vaccine"
        :delta="tableData.vaccineDelta"
        color="#10aeb5"
      ></cell>
    </div>
  </div>
</template>

<script>
import cell from "./cell.vue";
export default {
  components: { cell },
  name: "EpidemicTable",
  props: {
    tableData: {
      id: "",
      areaId: "",
      time: "",
      active: "", //现有确诊
      activeDelta: "", //
      totalCases: "", //累计确诊
      totalCasesDelta: "", //
      cured: "", //累计治愈
      curedDelta: "",
      death: "", //累计死亡
      deathDelta: "",
      vaccine: "", //累计接种
      vaccineDelta: "",
    },
  },
  data() {
    return {
      activeName: "high",
    };
  },
  methods: {},
};
</script>

<style scoped>
</style>
