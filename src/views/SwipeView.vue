<template>
  <div class="swipe-view">
    <div class="swipe-container">
      <div class="img-indicator-container">
        <transition name="swipe" v-for="(url, index) in picList" :key="index">
          <img :src="url" alt="" v-show="currentIndex === index">
        </transition>

        <div class="indicator-container">
          <div class="indicator-list">
            <div :class="{ indicator: true, isCurrent: currentIndex === index }" v-for="(item, index) in picList.length"
              :key="index"></div>
            <div class="currentIndicator" ref="currentIndicator"></div>
          </div>
        </div>
      </div>

    </div>
    <button @click="handleSwipe">Next</button>
    <div class="rectangle" @click="test"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picList: [
        '/img/36.jpg',
        '/img/37.jpg',
        '/img/39.jpg',
        '/img/38.jpg'
      ],
      currentIndex: 0,
      // isSwiping: false,
    };
  },
  methods: {
    handleSwipe() {
      this.currentIndex = (this.currentIndex + 1) % this.picList.length;
    },
    handleIndicatorSwipe() {

    },
    test() {
      // JavaScript 触发样式改变
      box.classList.add('move');
      const box = document.querySelector('.rectangle');
      // 一段时间后
      // setTimeout(() => {
      //   box.classList.remove('move');
      // }, 3000);
    }
  },
  watch: {
    currentIndex() {
      this.$refs.currentIndicator.classList.add('moving');
      setTimeout(() => {
        this.$refs.currentIndicator.classList.remove('moving');
      }, 800);
    }
  },
  mounted() {
    this.handleIndicatorSwipe();
  },
};
</script>

<style lang="scss" scoped>
$tab-count: 4;
$transition-duration: 0.8s;

.swipe-view {
  height: 300vh;

  .swipe-container {
    height: 250px;
    width: 100%;
    position: relative;
    overflow: hidden;
    // border: 1px solid black;
    // background: rgb(223, 223, 223);

    .img-indicator-container {
      width: 90%;
      height: 74%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;

      img {
        width: 100%;
        object-fit: contain;
        position: absolute;
        border-radius: 15px;
      }

      .swipe-enter {
        opacity: 0;
        transform: translateX(100%);
      }

      .swipe-enter-active {
        transition: all $transition-duration;
      }

      .swipe-enter-to {
        opacity: 1;
        transform: translateX(0);
      }

      .swipe-leave-active {
        transition: all $transition-duration;
      }

      .swipe-leave-to {
        opacity: 0;
        transform: translateX(-100%);
      }
    }

    .indicator-container {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;

      .indicator-list {
        display: flex;
        gap: 8px;

        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #fff;
          opacity: 0.7;
        }

        .currentIndicator {
          width: 16px;
          height: 8px;
          border-radius: 4px;
          background-color: #fff;
          position: absolute;
          left: -4px;
          transition: transform $transition-duration linear;
        }

        @for $i from 1 through $tab-count {
          .indicator:nth-child(#{$i}).isCurrent~.currentIndicator {
            transform: translateX(#{100% * ($i - 1)});
          }
        }

        .currentIndicator.moving {
          animation: stretch $transition-duration linear;
        }

        @keyframes stretch {
          0% {
            width: 16px;
          }

          50% {
            width: 20px;
          }

          100% {
            width: 16px;
          }
        }
      }
    }
  }

  .rectangle {
    width: 100px;
    height: 50px;
    background-color: blue;
    position: relative;
  }

  .rectangle.move {
    animation: stretchAndMove 3s ease-in-out forwards;
  }

  @keyframes stretchAndMove {
    0% {
      width: 100px;
      left: 0;
    }

    50% {
      width: 200px;
      left: 0px;
    }

    100% {
      width: 100px;
      left: 100px;
    }
  }
}
</style>