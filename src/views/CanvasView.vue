<template>
  <div>
    <canvas id="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
// import drawPointLine from '@/utils/drawPointLine.js';
import drawIndicator from '@/utils/drawIndicator.js';
export default {
  data() {
    return {};
  },
  methods: {
  },
  mounted() {
    drawIndicator();
  }
};
</script>

<style lang="scss" scoped>
canvas {
  background: #222;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>