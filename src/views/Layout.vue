<template>
  <div id="view">
    <div class="header absolute top-0 inset-x-0">
      <Header></Header>
    </div>
    <div class="main-page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  export default {
    name: "Layout",
    components: {
      Header
    }
  }
</script>

<style scoped>

</style>
