<template>
  <div>
    <el-row class="tac">
      <el-col :span="24"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-tree :data="treeMenu" :props="defaultProps" @node-click="handleNodeClick" default-expand-all />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Row, Col, Menu, MenuItem, Submenu, MenuItemGroup, Tree, Loading} from 'element-ui';

  Vue.use(Row);
  Vue.use(Col);
  Vue.use(Menu);
  Vue.use(MenuItem);
  Vue.use(Submenu);
  Vue.use(MenuItemGroup);
  Vue.use(Tree);
  Vue.use(Loading);
  import {requestChildEntitys, requestRootEntitys} from '../framework/network/test';
  import Store from '../vuex';
  import { toTreeData, pushData } from '../utils';

  export default {
    components: {},
    name: "Sidemenu",
    data() {
      return {
        rootEntitys: [],
        temp: [],
        defaultProps: {
          children: 'children',
          label: 'assertname'
        }
      }
    },
    methods: {
      handleNodeClick(data) {
        if (data.childcount !== 0) {
          let params = {
            entitykey: data.entitykey
          };
          requestChildEntitys(params).then(res => {
            const newMenu = toTreeData(pushData(Store.state.datatree.treeArr, res));
            Store.commit('DATATREE_CHANGE', { treeMenu: newMenu, treeArr: pushData(Store.state.datatree.treeArr, res)});
            Store.commit('CHILDENTITYS_CHANGE', { childEntitys: res});
          })
        }
        let state=1;
        let curren=0;

        Store.commit('ENTITYKEY_CHANGE', { data });
        Store.commit('CHASTATE_CHANGE', { state });
        Store.commit('CURRENTID_CHANGE', { curren });
        this.$router.push({name:'echarts',params: { data }});
      }
    },
    mounted() {
      requestRootEntitys().then(res => {
        this.rootEntitys = res;
        Store.commit('DATATREE_CHANGE', { treeMenu: res, treeArr: res});
      })
    },
    computed: {
      treeMenu () {
        return Store.state.datatree.treeMenu
      },
      loading () {
        return Store.state.datatree.dataTreeLoading
      }
    },
  }
</script>

<style lang="less">
  .el-tree {
    cursor: default;
    background: #545c64;
    color: #fff;

    .el-tree-node:focus > .el-tree-node__content, .el-tree-node__content:hover {
      background-color: #ffd04b;
    }
  }
  .el-menu{
    border: 0;
  }

  .el-loading-spinner {
    top: 10%;
    margin-top: -21px;
    width: 100%;
    text-align: center;
    position: absolute;
  }

</style>
