<template>
  <div id="echarts">
    <line1></line1>

  </div>
</template>

<script>

// 引入 ECharts 主模块
// var echarts = require('echarts/lib/echarts');
// // 引入柱状图
// require('echarts/lib/chart/bar');
// // 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
// import options from "../../mock/echarts/history1";
// import VuexStore from '../vuex/store';
// import { requestDataPoint, requestDatapointstates, sendDataPoint,requestDataHistory,requestDateMap} from './../framework/network/test';
import Line1 from "@/components/echarts/line";
  import Store from '../vuex';
  export default {
    name: 'echarts',
    components: {
      Line1,
    },
    mounted() {


    },
    methods: {


    },
    computed: {
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .h1 {
    font-weight: normal;
  }
  .echarts {
    width: 600px;
    height: 400px;
  }
  .box{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    align-items:flex-start
  }
  .el-button{
    display: block;
    margin: 10px 0;

  }
  .el-input__inner,.el-button{
   float: right;
  }
  .changeColor{
    border-color: red;
  }
</style>
