<template>
  <div id="flip-list-demo" class="demo">
    <button @click="circleList">Move</button>
    <transition-group name="flip-list" tag="ul">
      <li v-for="item in items" v-bind:key="item">
        {{ item }}
      </li>
    </transition-group>
    <div class="test">test</div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      items: [1, 2, 3],
      waitList: [4]
    };
  },
  methods: {
    circleList() {
      // 循环列表
      this.waitList.push(this.items.shift());
      this.items.push(this.waitList.shift());
      // console.log(this.items);
    },
  },
};
</script>

<style lang="scss" scoped>
$tansDuration: 1s;

ul {
  list-style: none;
  position: relative;
  height: 100px;

  li {
    border: 1px solid #000000;
    // position: absolute;
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: #ccc;
    margin-bottom: 10px;
    text-align: center;
    line-height: 100px;
    // transition: all 1s;

    @for $i from 1 through 4 {
      &:nth-child(#{$i}) {
        // transform: translateX(-10% * ($i - 1));
        z-index: 5 - $i +1;
        // transform: scale(1 - 0.05 * ($i - 1));
        // margin-left: -10% * ($i - 1);

        // left: 20% * ($i - 1);
        // &.flip-list-leave {
        //   transform: translateX(-10% * ($i - 1));
        // }
      }
    }
  }
}

.flip-list-leave-active {
  position: absolute;
  transition: all $tansDuration;
}

.flip-list-leave-to {
  position: absolute;
  opacity: 0;
  transform: translateX(-100%);
}

.flip-list-enter {
  opacity: 0;
  transform: translateX(100%);
}

.flip-list-enter-active {
  z-index: -99;
  position: absolute;
  transition: all $tansDuration;
}

.flip-list-enter-to {
  z-index: -99;
  opacity: 1;
  transform: translateX(0%);
}

.flip-list-move {
  // position: absolute;
  transition: transform 1.5s 0.05s;
}

.test {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: #ccc;
  margin-bottom: 10px;
  text-align: center;
  line-height: 100px;
  transition: left 0.5s;
  left: 0;

  &:hover {
    left: -10%;
  }
}
</style>