<template>
  <el-menu
    default-active="/abcd"
    background-color="#001529"
    text-color="#f2f2f2"
    active-text-color="#45B0EE"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
    class="el-menu-vertical-demo">
    <template v-for="item in data">
      <menu-item :data="item" />
    </template>
  </el-menu>
</template>
<script>
  import MenuItem from './menuitem'
  export default {
    name: 'ShMenu',
    componentName: 'ShMenu',
    extends: [],
    props: {
      data: {
        type: Array,
        default: []
      },
    },
    components: {MenuItem},
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
    }
  }
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    text-align: left;
  }
</style>
