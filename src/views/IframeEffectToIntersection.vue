<template>
  <div class="iframeContainer">
    <div class="placeholder"></div>
    <iframe width="100%" height="200" src="http://localhost:8081/#/observerView">
    </iframe>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.iframeContainer {
  width: 100%;
  height: 1000vh;
  overflow: scroll;
  overflow-y: scroll;

  .placeholder {
    height: 200vh;
  }

  iframe {
    border: none;
    // overflow: hidden;
  }
}
</style>