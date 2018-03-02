<template>
  <div class="navMenu">
    <p v-for="menu in navMenus">
      <el-menu-item
        v-if="menu.submenu.length === 0"
        :key="menu.menuCode"
        :index="menu.path"
        :disabled="!menu.enabled">
        <!--<i class="el-icon-edit"></i>-->
        <span slot="title">{{ menu.value }}</span>
      </el-menu-item>
      <el-submenu
        v-if="menu.submenu.length !== 0"
        :key="menu.menuCode"
        :index="menu.path"
        :disabled="!menu.enabled">
        <template slot="title">
          <!--<i class="el-icon-edit"></i>-->
          <span>{{ menu.value }}</span>
        </template>
        <NavMenu :navMenus="menu.submenu"/>
      </el-submenu>
    </p>

  </div>
</template>

<script>
  export default {
    name: 'NavMenu',
    props: {
      navMenus: {
        type: Array,
        default: []
      }
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
 .navMenu {
   text-align: left;
 }
</style>
