<template>
  <div class="container">
    <div class="target" ref="target">
      observer target
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    startObserver() {
      const callback = (e) => {
        const ratio = e[0].intersectionRatio;
        console.log(ratio);
      };
      const observer = new IntersectionObserver(callback, {
        root: null,
        // rootMargin: '20px 0px 20px 0px',
        threshold: [0, 1.0]
      });
      observer.observe(this.$refs.target);
    }
  },
  mounted() {
    this.startObserver();
    // window.parent.window.addEventListener('scroll', () => {
    //   console.log('scroll');
    // });
  },
};
</script>

<style lang="scss" scoped>
.container {
  overflow: hidden;
  position: relative;
  // height: 200px;
  width: 200px;

  .target {
    height: 100px;
    border: 1px solid red;
    // margin-top: 10px;
    // width: 200%;
    // height: 201px;
    // position: fixed;
    // position: absolute;
    // top: -5px;
  }
}
</style>