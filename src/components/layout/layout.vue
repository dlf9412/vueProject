<template>
  <el-container>
    <el-container>
      <el-aside width="15%">
        <v-sidenav/>
      </el-aside>
      <el-main>
        <el-header>
          <v-header />
        </el-header>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import vHeader from './header'
  import vSidenav from './sidenav'

  import Vue from 'vue';
  import {Container, Aside, Main, Header} from 'element-ui';

  Vue.use(Container);
  Vue.use(Aside);
  Vue.use(Main);
  Vue.use(Header);

  export default {
    data() {
      return {}
    },
    computed: {},
    components: {
      vHeader,
      vSidenav
    }
  }
</script>
<style lang="less">
  @import '../../assets/css/common/mixin.less';
  .el-aside{
    min-height: 600px;
    background-color: #001529;
  }

  .el-header{
    padding: 0;
  }
  .el-main {
    width: 85%;
    -webkit-box-flex: 1;
    padding: 0;
  }
</style>

