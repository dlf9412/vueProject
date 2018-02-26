<template>
  <el-container>
    <el-header>嗣衡科技小镇管理系统</el-header>
    <router-view/>
  </el-container>
</template>
<script>
  // import Vue from "vue";
  // import {Container, Header,Aside, Main} from "element-ui";
  // Vue.use(Container);
  // Vue.use(Header);
  // Vue.use(Aside);
  // Vue.use(Main);`

  // import 'element-ui/lib/theme-chalk/index.css';
  import Page from './page';

  export default {
    name: "Home",
    data() {
      return {};
    },
    components: {
      Page
    }
  }
</script>
<style lang="less">

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 1.5rem;
    font-weight: bold;
    padding-left: 10px;
  }
</style>


