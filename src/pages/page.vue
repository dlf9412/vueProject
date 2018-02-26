<template>
  <div class="div">
    <el-container>
      <el-aside class="el-aside" width="15%">
        <SideMenu />

      </el-aside>
      <el-main class="el-main">
        <router-view />
      </el-main>
    </el-container>

  </div>
</template>

<script>
  import Vue from 'vue';
  import { Container, Aside, Main } from 'element-ui';

  Vue.use(Container);
  Vue.use(Aside);
  Vue.use(Main);

  import SideMenu from '../components/sidemenu';

  export default {
    name: 'Home',
    components: {
      SideMenu
    },
    data() {
      return {}
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);

      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../assets/css/common/mixin.less';
  .el-aside {
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    background: #324053;
    overflow: auto;
    color: white;
    box-sizing: border-box;
  }

  .el-main {
    width: 85%;
    position: absolute;
    top: 60px;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 20px;
  }

  .div {
    display: flex;
    flex-direction: row;
  }

  .deco {
    text-decoration: none;
  }


</style>
