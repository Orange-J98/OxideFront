<template>
  <div id="app">
    <Layout></Layout>
  </div>
</template>

<script>
import Layout from "@/views/Layout.vue";

export default {
  created() {
    // 请在router/index.js设置跳转
    // this.$router.push("CovidMap");
  },
  name: "app",
  components: {
    Layout,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
