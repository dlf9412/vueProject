<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
  };
</script>

<style lang="less">
  @import './assets/css/common/common.less';
  .app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;

    .btn-ui {
      width: 100px;
      height: 64px;
      background-color: powderblue;
      color: white;
    }
  }
</style>
