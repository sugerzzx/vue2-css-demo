<template>
  <div class="home">
    <nav>
      <router-link to="/swipe">Swipe</router-link>
      <router-link to="/canvas">Canvas</router-link>
      <router-link to="/indicators">Indicators</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {}
};
</script>


<style lang="scss">
nav {
  padding: 30px;
  display: flex;
  flex-direction: column;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>