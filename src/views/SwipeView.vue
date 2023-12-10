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
            <div class="current-indicator" ref="currentIndicator">
              <div class="cur-ind-segment" v-for="(item, index) in 7" :key="index"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <button @click="handleSwipe">Next</button>
    <div :class="{ worm: true, 'worm-moved': wormMoved }" @click="handleClick">
      <div class="worm__segment" v-for="(item, index) in 30" :key="index"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picList: [
        '/img/Scene-18.jpg',
        '/img/Scene-24.jpg',
        '/img/Scene-8.jpg'
      ],
      currentIndex: 0,
      // isSwiping: false,
      wormMoved: false,
    };
  },
  methods: {
    handleSwipe() {
      this.currentIndex = (this.currentIndex + 1) % this.picList.length;
    },
    handleClick() {
      console.log('click');
      this.wormMoved = !this.wormMoved;
    },
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
    // this.handleIndicatorSwipe();
  },
};
</script>

<style lang="scss" scoped>
$picCount: 3;
$transition-duration: 0.8s;
$imgWidth: 5000;
$imgHeight: 3334;
$ratio: $imgHeight/$imgWidth;
$segmentNum: 7;

.swipe-view {
  height: 300vh;

  .swipe-container {
    height: calc(100vw*$ratio);
    position: relative;
    overflow: hidden;

    .img-indicator-container {
      height: calc(90vw*$ratio);
      width: 90%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;

      img {
        width: 100%;
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
      bottom: 0px;

      .indicator-list {
        display: flex;
        gap: 12px;
        position: relative;

        .indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #ffffff;
          opacity: 0.9;

          @for $i from 1 through $picCount {
            &:nth-child(#{$i}).isCurrent~.current-indicator {
              .cur-ind-segment {
                transform: translateX(#{18px * ($i - 1)});
              }
            }
          }

          @for $i from 2 through $picCount {
            &:nth-child(#{$i}).isCurrent~.current-indicator {
              @for $i from 2 through $segmentNum {
                $delay: $transition-duration/70 * ($i - 1);

                .cur-ind-segment:nth-last-child(#{$i}) {
                  transition-delay: $delay;
                }
              }
            }
          }

          &:nth-child(1).isCurrent~.current-indicator {
            @for $i from 2 through $segmentNum {
              $delay: $transition-duration/70 * ($i - 1);

              .cur-ind-segment:nth-child(#{$i}) {
                transition-delay: $delay;
              }
            }
          }
        }
      }

      .current-indicator {
        position: absolute;
        width: 100%;

        .cur-ind-segment {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #ffffff;
          position: absolute;
          transition: transform $transition-duration ease-in-out;

          @for $i from 1 through $segmentNum {
            &:nth-of-type(#{$i}) {
              left: #{($i - 1) * 1 - 3}px;
            }
          }
        }
      }
    }
  }
}


.worm {
  height: 50px;
  position: relative;

  .worm__segment {
    width: 50px;
    height: 50px;
    background-color: #845EC2;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
    transition: all 0.8s linear;
  }

  @for $i from 1 through 30 {
    .worm__segment:nth-child(#{$i}) {
      left: #{$i * 2}px;
    }

    &.worm-moved {
      .worm__segment:nth-child(#{$i}) {
        transform: translateX(80px);
      }
    }
  }


  @for $i from 2 through 30 {
    $delay: 0.8s/40 * ($i - 1);

    .worm__segment:nth-last-child(#{$i}) {
      transition-delay: $delay;
    }
  }
}
</style>