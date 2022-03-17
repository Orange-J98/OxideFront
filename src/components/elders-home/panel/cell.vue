<template>
  <div>
    <div class="text-lg">{{ name }}</div>
    <div :style="{ color: color }" class="text-3xl">{{ figure }}</div>
    <div v-if="delta != 0">
      昨日
      <span :style="{ color: color }">{{ formatDelta(delta) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    figure: Number,
    delta: Number,
    color: String,
  },
  methods: {
    formatDelta(x) {
      if (x >= 0) {
        return `+${x}`;
      } else {
        return x.toString();
      }
    },
  },
};
</script>

<style scoped>
</style>