<template>
  <el-submenu v-if="data.submenu.length !== 0" :index="data.path">
    <template slot="title">
      <!--<i class="el-icon-edit"></i>-->
      <span>{{ data.value }}</span>
    </template>
    <template v-for="obj in data.submenu">
      <menu-item :data="obj"/>
    </template>
  </el-submenu>
  <el-menu-item v-else :index="data.path">
    <!--<i class="el-icon-edit"></i>-->
    <span slot="title">{{ data.value }}</span>
  </el-menu-item>

</template>
<script>
  export default {
    name: 'MenuItem',
    props: {
      data: {
        type: Object,
        default: []
      }
    },
  }
</script>

<style scoped>

</style>
