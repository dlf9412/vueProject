<template>
  <el-menu
    class="side-nav"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
    :collapse="isCollapse"
    background-color="#001529"
    text-color="#f2f2f2"
    active-text-color="#45B0EE">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>设备管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="add-equipment">添加设备</el-menu-item>
        <el-menu-item index="equipment-module">设备模板</el-menu-item>
        <el-menu-item index="equipment-list">设备列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
  import Vue from 'vue';
  import {Menu, MenuItem, Submenu, MenuItemGroup} from 'element-ui';

  Vue.use(Menu);
  Vue.use(MenuItem);
  Vue.use(Submenu);
  Vue.use(MenuItemGroup);

  export default {
    name: "sidenav",
    data() {
      return {
        isCollapse: false
      }
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
        switch (key) {
          case 'add-equipment':
            this.$router.push('/AddEquipment/OptionalModule');
            break;
          case 'equipment-module':
            this.$router.push('/AAAA');
            break;
          case 'equipment-list':
            this.$router.push('/BBBB');
            break;
          default:
        }
      },

    }
  }
</script>

<style lang="less">
  @import '../../assets/css/common/mixin.less';

  .el-menu {
    border: 0;
    list-style: none;
    position: relative;
  }
</style>
