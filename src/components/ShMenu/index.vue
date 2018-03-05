<template>
  <el-container>
    <el-container>
      <sh-menu
        :data="leftMenus"
      />
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import ShMenu from './shmenu'

  export default {
    mixins: [],
    extends: {},
    props: {},
    data() {
      return {
        leftMenus: [
          {
            value: '设备管理',
            menuCode: 'equipmentmanagement',
            enabled: true,
            path: '/',
            submenu: [
              {
                value: '添加设备',
                enabled: true,
                path: '/addequipment',
                menuCode: 'addequipment',
                submenu: [
                  {
                    value: '添加设备1',
                    menuCode: 'addequipment1',
                    enabled: true,
                    path: '/abcd',
                    submenu: []
                  },
                ]
              }, {
                value: '设备模板',
                menuCode: 'equipmentmodule',
                enabled: true,
                path: '/dcba',
                submenu: []
              }, {
                value: '设备列表',
                path: '/cccc',
                menuCode: 'equipmentlist',
                enabled: true,
                submenu: []
              }
            ]
          }
        ],
      }
    },
    computed: {},
    components: {
      ShMenu
    },
    watch: {},
    methods: {
      menuSelected(index, indexPath) {
        console.log(index);
        console.log(indexPath);
      },
    },
    beforeCreate() {
    },
    mounted() {
    },
  }
</script>

<style lang="less">
  @import '../../assets/css/common/default.less';
  @import '../../assets/css/common/sidenav.less';
</style>
