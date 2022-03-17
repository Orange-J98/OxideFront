<template>
  <div>
    <div>
      <div class="text-3xl pt-3 pb-3 text-red-400">国内风险地区</div>
    </div>
    <div class="riskytable" v-if="riskyAreas">
      <table style="overflow: auto !important">
        <thead class="border-2">
          <tr class="m-3">
            <th class="p-2 border-r-2">风险类型</th>
            <th class="">详细位置</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="x of riskyAreas"
            :key="x.id"
            class="border-2"
          >
            <td
              v-if="x.risk == 'high'"
              class="text-red-600 border-r-2 m-auto"
            >
              高风险
            </td>
            <td
              v-if="x.risk != 'high'"
              class="text-yellow-400 border-r-2"
              style="height: 40px !important"
            >
              中风险
            </td>

            <td class="p-2">{{ x.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  mounted() {
    this.initList();
  },
  data() {
    return {
      riskyAreas: [],
    };
  },
  methods: {
    initList() {
      this.usersApi
        .getRiskyAreas()
        .then((res) => {
          // console.log(res.data);
          this.riskyAreas = res.data;
        })

        .catch((p) => alert(p.response.data.message));
    },
  },
};
</script>

<style>
.riskytable {
  box-sizing: border-box;
  height: 236px;
  width: 376px;
  /* overflow: scroll; */
}
.high-level {
  color: red;
}
</style>
