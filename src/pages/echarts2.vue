<template>
  <div>
    <div class="box">
      <VariableForm :model="model" :formData="formData"/>

      <div v-if="0 === echartsData.length">没有需要显示的图表</div>
      <div v-else>
        <template v-for="item in echartsData">
          <template v-if="item.entitytype === 11">
            <comp-test :id="item.name" :itemData="item" :MaxCount="MaxCount"/>
          </template>
        </template>
      </div>
    </div>

  </div>
</template>

<script>

// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
// import "@/assets/css/echarts.css";

import options from "../../mock/echarts/history1";
import Store from '../vuex';
import Vue from 'vue';
import { requestDataPoint, requestDatapointstates, sendDataPoint,requestDataHistory,requestDateMap,requestBeginTime} from '../framework/network/test';
import { Button, Col, Row, Collapse, CollapseItem } from 'element-ui';
Vue.use(Button);
Vue.use(Col);
Vue.use(Row);
Vue.use(Collapse);
Vue.use(CollapseItem);
import VariableForm from '../components/variableForm';
import compTest from '../components/echarts/test';

let timer1;
let firstrequest = true;
  export default {
    name: 'Echarts',
    components: { VariableForm, compTest },
    data() {
      return {
       myCharts:{},
       title:20,
        option:options,
        input:"",
        dataLength:0,
        changeColor:0,
        currentId:0,
        MaxCount:30,
        sendtime:"",
        entitykey2:"",
        sendState:0,
        progressFlag:false,
        
      
      };
    },
    beforeMount() {
      this.echarts = Store.state.datatree.childEntitys;
    },
    mounted() {
     

    },
    methods: {
      
      sendText(){
        // 发送指令
          if(this.input==""){
             this.changeColor=1;
            }else{
                if(this.sendState==0){
                  this.sendState=1
                    sendDataPoint({entitykey:Store.state.datatree.entitykey,key:this.input}).then(res=>{
                       this.sendState=0;
                       alert(res.state);
                    });
                }
        }

      },
    },
    computed: {
     entitykey1(){
      return Store.state.datatree.entityState;
     },
      formData() {
        let tempDatas = Store.state.datatree.childEntitys.filter(
          item => item && item.entitytype === 11 && item.name.indexOf('aii') === -1 && item.name.indexOf('dii') === -1
        );
        const nodeProps = Store.state.datatree.entityData;
        let result = tempDatas;
        if (nodeProps && nodeProps.description && nodeProps.serial) {
          const deviceInformation = [ {
            name: nodeProps.description,
            description: '设备描述',
            assertname: nodeProps.description,
            entitytype: 11,
          }, {
            name: nodeProps.serial,
            description: 'SN码',
            assertname: nodeProps.serial,
            entitytype: 11,
          }];
          result = deviceInformation.concat(tempDatas)
        }
        return result;
      },
      model() {
        let model = {};
        Store.state.datatree.childEntitys.forEach((item, index) => {
          model[item.name] = '';
        });
        return model;
      },
      echartsData() {
        let tempDatas = Store.state.datatree.childEntitys.filter(
          item => item && item.entitytype === 11 && (item.name.indexOf('aii') !== -1 || item.name.indexOf('dii') !== -1)
        );
        return tempDatas;
      }
    },
    watch: {
      entitykey1(val){
        // 监测entityState的变化
        if(val===1){
          // this.myCharts.showLoading({text:"读取数据中..."});

          this.option.series.data.splice(0,this.option.series.data.length);
          this.option.xAxis.data.splice(0,this.option.xAxis.data.length);
          // this.initEcharts(this.option);
          Store.commit('CHASTATE_CHANGE', { state: 0 });
          Store.commit('CURRENTID_CHANGE', { curren: 0 });
          this.value4="";
          // this.myCharts.clear();
          firstrequest = true;
          requestBeginTime({entitykey:Store.state.datatree.entitykey}).then(res=>{

           if(res!=""){
              var time=new Date(res);
              Store.commit('START_TIME', { startTime: time.getTime() });
              console.log(res)
           }
          })
          // console.log(Store.state.datatree.entitykey);
        }
      }


    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .h1 {
    font-weight: normal;
  }
  .echarts {
    width: 100%;
    height: 400px;
  }
  .box{
    width: 100%;
    /*display: flex;*/
    /*display: -webkit-flex;*/
    /*justify-content: space-around;*/
    /*align-items:flex-start*/
  }
  .left{
    width: 90%;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .el-date-editor{
    width: 100%;
  }
  .block{
    width: 70%;
  }

  .btnGroup{
    width: 35%;
    border: 1px solid #ccc;
    padding: 0 10px;
    border-radius: 5px;
  }
  .btnGroup p{
    text-align: left;
  }
  .tableHeader{
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    border-bottom: 1px solid #ccc;
    padding:10px;

  }
  .nowData{
    cursor: pointer;
    color: blue;
  }

  .el-collapse-item {
    text-align: left;
    .el-collapse-item__content {
      padding: 20px;
      font-size: 13px;
      color: #303133;
      line-height: 1.769230769230769;
    }

    .el-collapse-item__header {
      height: 48px;
      line-height: 48px;
      cursor: pointer;
      font-weight: 500;
      -webkit-transition: border-bottom-color .3s;
      transition: border-bottom-color .3s;
      outline: 0;
      font-size: 24px;
      color: #ffd04b;
      background: #545c64;
      padding-left: 10px;
    }
  }



</style>
