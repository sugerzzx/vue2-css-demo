<template>
  <div class="box">
    <div class="trans-container" ref="container">
      <span class="icon hidden" ref="icon" v-for="item in 5" :key="item.id"></span>
      <div class="title" ref="title">TitleTitleTitleTitleTitleTitleTitleTitleTitle</div>
    </div>
    <button @click="startAnimation">START</button>
    <button @click="stopAnimation">STOP</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      container: null,
      icons: [],
      title: null,
      animations: [],
    };
  },
  methods: {
    init() {
      this.initRef();
      this.createAnimation();
    },
    initRef() {
      this.container = this.$refs.container;
      this.icons = this.$refs.icon;
      this.title = this.$refs.title;
    },
    createAnimation() {
      class animationMaker {
        constructor(positionSnapShot, timeFrames, duration) {
          this.positionSnapShot = positionSnapShot;
          this.timeFrames = timeFrames;
          this.duration = duration;
          this.keyframes = {
            transform: this.getTrnasform(this.positionSnapShot),
            opacity: [1, 1],
            offset: this.getOffset(this.timeFrames, this.duration),
            easing: ['ease-in-out'],
          };
        }
        getTrnasform = () => {
          return this.positionSnapShot.map((position) => {
            return `translateY(${position}px)`;
          });
        };
        getOffset = () => {
          return this.timeFrames.map((time) => {
            return time * 1000 / this.duration;
          });
        };
        getOptions = (delay) => {
          return {
            duration: this.duration,
            delay,
            iterations: Infinity,
            fill: 'both',
            easing: 'linear',
          };
        };
        getAnimation = (ele, delay) => {
          const keyframeEffect = new KeyframeEffect(ele, this.keyframes, this.getOptions(delay));
          const ani = new Animation(keyframeEffect, document.timeline);
          return ani;
        };
      }

      const containerHeight = this.container.offsetHeight; // 容器高度
      const duration = 6000; // 动画持续时间

      const iconDistance = (containerHeight + this.icons[0].clientHeight) / 2; // 图标移动距离
      const iconSnapShot = [-iconDistance, 0, 0, iconDistance, iconDistance]; // 图标移动快照
      const iconTimeFrames = [0, 0.5, 3, 3.5, 6]; // 图标移动时间点

      const titleDistance = (containerHeight + this.title.clientHeight) / 2; // 标题移动距离
      const titleSnapShot = [0, titleDistance, titleDistance, -titleDistance, 0, 0]; // 标题移动快照
      const titleTimeFrames = [0, 0.5, 3.4, 3.4, 4, 6]; // 标题移动时间点

      const iconAniMaker = new animationMaker(iconSnapShot, iconTimeFrames, duration);
      const titleAniMaker = new animationMaker(titleSnapShot, titleTimeFrames, duration);
      this.icons.forEach((icon, index) => {
        const delay = index * 100;
        this.animations.push(iconAniMaker.getAnimation(icon, delay));
      });
      this.animations.push(titleAniMaker.getAnimation(this.title, 0));
    },
    startAnimation() {
      this.animations.forEach((animation) => {
        animation.play();
      });
    },
    stopAnimation() {
      this.animations.forEach((animation) => {
        animation.pause();
      });
    },
    startObserver() {
      let options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      };

      let observer = new IntersectionObserver((e) => {
        const ratio = e[0].intersectionRatio;
        if (ratio < 1) {
          this.stopAnimation();
        } else if (ratio === 1) {
          this.startAnimation();
        }
      }, options);
      observer.observe(this.$refs.container);
    },
    doSomething() {
      let height = this.container.getBoundingClientRect().top;
      const inquireDistance = () => {
        const containerHeight = this.container.getBoundingClientRect().top;
        if (containerHeight !== height) {
          console.log('do something', containerHeight);
          height = containerHeight;
        }
        requestAnimationFrame(inquireDistance);
      };
      inquireDistance();
    }
  },
  mounted() {
    this.init();
    this.startObserver();
    document.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        if (this.animations[0].playState === 'running') {
          this.stopAnimation();
        } else if (this.animations[0].playState === 'paused' || this.animations[0].playState === 'idle') {
          this.startAnimation();
        }
      }
    });
    this.doSomething();
  }
};
</script>

<style lang="scss" scoped>
.box {
  padding-top: 100vh;
  height: 300vh;
  overflow: scroll;

  .trans-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 60px;
    border: 1px solid #ccc;
    position: relative;
    overflow: hidden;

    .icon {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #02a7f3;
      opacity: 0;
    }

    .title {
      position: absolute;
    }
  }
}
</style>