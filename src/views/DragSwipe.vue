<template>
  <div class="container">
    <div class="swipe" ref="test">
      <img class="img" v-for="(url, index) in exhibitList" ref="img" :key="index" :src="url" alt=""
        @touchstart.prevent="(event) => handleTouchStart(event.target, event.touches[0])"
        @touchmove.prevent="(event) => handleTouchMove(event.target, event.touches[0])"
        @touchend.prevent="(event) => handleTouchEnd(event.target, event.changedTouches[0])">
    </div>
    <button @click="animation.play()">test</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList: [
        '/img/Scene-8.jpg',
        '/img/Scene-24.jpg',
        '/img/Scene-31.jpg',
        '/img/Scene-18.jpg'
      ], // 最少两张
      exhibitList: [], // 展示列表，最多三张, 用于循环展示,加上替换上来的一张，一共四张
      exhibitLength: 4, // 展示列表长度
      waitList: [],
      currentIndex: 0, // 当前展示图片的索引
      startX: 0,
      startY: 0,
      offsetX: 0,
      animation: null
    };
  },
  methods: {
    initExhibitList() {
      const len = this.imgList.length;
      if (len === 1) {
        // 静态图片
        return;
      }
      if (len <= this.exhibitLength) { // 4,3,2
        this.exhibitList = this.imgList.slice(0, len);
        const diffLen = this.exhibitLength - len;
        for (let index = 0; index < diffLen; index++) {
          this.exhibitList.push(this.imgList[index]);
        }
        // this.waitList.push(this.imgList[diffLen % len]);
        return;
      }
      if (len > this.exhibitLength) {
        this.exhibitList = this.imgList.slice(0, this.exhibitLength);
        this.waitList = this.imgList.slice(this.exhibitLength);
        return;
      }
    },
    cycleList() {
      // 循环列表
    },
    handleTouchStart(img, touch) {
      this.startX = touch.clientX; // startX是目前点击处距离屏幕左边的距离
      this.startY = touch.clientY;
      this.offsetX = this.startX - img.getBoundingClientRect().left; // offsetX是目前点击处距离盒子左边的距离
    },
    handleTouchMove(img, touch) {
      // 图片可随手指移动
      const moveX = touch.clientX;
      const moveY = touch.clientY;
      const isMoveToLeft = this.judgeMoveToLeft(moveX, moveY);
      if (isMoveToLeft) {
        const distance = moveX - this.offsetX; // distance实际上是已滑动的距离
        // img.style.left = distance + 'px';
        img.style.transform = `translateX(${distance}px) scale(1)`;
      }
    },
    handleTouchEnd(img, touch) {
      const distance = touch.clientX - this.offsetX;
      if (distance < -50) {
        // 划走,后面的图片往前移动
        this.animation.play();
      } else {
        // 归位
      }
    },
    judgeMoveToLeft(moveX, moveY) {
      const diffX = this.startX - moveX;
      const diffY = Math.abs(this.startY - moveY); // Y轴滑动距离
      const angle = Math.atan2(diffY, diffX) * 180 / Math.PI; // 滑动角度
      if (diffX > 0 && angle < 45) {
        return true;
      }
    },
    initAnimation() {
      const imgElements = this.$refs.img;
      this.animation = this.createAnimation(imgElements[0]);
    },
    createAnimation(ele) {
      const getOffset = (timeFrames, duration) => {
        return timeFrames.map((time) => {
          return time / duration;
        });
      };
      const keyframes = {
        transform: [
          'translateX(0px)', 'translateX(-100%)',
          'translateX(30%) scale(0.85)',
          'translateX(30%) scale(0.85)', 'translateX(20%) scale(0.90)',
          'translateX(20%) scale(0.90)', 'translateX(10%) scale(0.95)',
          'translateX(10%) scale(0.95)', 'translateX(0) scale(1)'
        ],
        opacity: [1, 0, 0, 0, 1, 1, 1, 1, 1],
        // transform: ['translateX(10%) scale(0.95)', 'translateX(0) scale(1)'],
        // transform: ['translateX(20%) scale(0.90)', 'translateX(10%) scale(0.95)'],
        // transform: ['translateX(30%) scale(0.85)', 'translateX(20%) scale(0.9)'],
        // transform: ['scale(0.85)', 'scale(0.9)'],
        // opacity: [0, 1],
        offset: getOffset([0, 500, 500, 1000, 1500, 2000, 2500, 3000, 3500], 3500),
        easing: ['ease-in-out'],
      };
      const options = {
        duration: 3000,
        fill: 'forwards',
        easing: 'linear',
      };
      const keyframeEffect = new KeyframeEffect(ele, keyframes, options);
      const ani = new Animation(keyframeEffect, document.timeline);
      return ani;
    }
  },
  beforeMount() {
    this.initExhibitList();
  },
  mounted() {
    this.initAnimation();
  },
};
</script>

<style lang="scss" scoped>
$imgCount: 4;

.container {
  height: 300vh;

  .swipe {
    height: 200px;
    position: relative;

    img {
      height: 100%;
      position: absolute;
      border-radius: 6px;

      @for $i from 1 through $imgCount {
        &:nth-child(#{$i}) {
          z-index: $imgCount - $i + 1;
          transform: translateX(10% * ($i - 1)) scale(1 - 0.05 * ($i - 1)); // 注意顺序;
        }

        @if $i ==$imgCount {
          &:nth-child(#{$i}) {
            opacity: 0;
          }
        }
      }
    }
  }
}
</style>