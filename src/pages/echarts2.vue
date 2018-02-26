<template>
  <div>
    <div class="box">
      <VariableForm :model="model" :formData="formData"/>
      <div class="left">
          <div class="tableHeader">
            <div class="nowData" @click="setTime"> 查看实时数据</div>
            <div class="block">

                <el-date-picker
                  size="small"
                  align="left"
                  v-model="value4"
                  type="datetimerange"
                  :picker-options="pickerOptions2"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00', '08:00:00']"
                  @change="change"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd,hh:mm:ss">
                </el-date-picker>
            </div>
          </div>
        <div>
          <el-progress :percentage="title" v-if="progressFlag"></el-progress>
          <div id="myChart" class="echarts"></div>
        </div>
      </div>
      <!--<div class="btnGroup">-->

        <!--<p @click="open4">发送指令</p>-->
         <!--<el-input v-model="input" placeholder="请输入需要控制的值" :class="changeColor"></el-input>-->
         <!--<el-button type="primary" @click="sendText">发送</el-button>-->

      <!--</div>-->
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
import compTest from '../components/echarts/echartsComp';
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
        value4: "",
        sendtime:"",
        entitykey2:"",
        sendState:0,
        progressFlag:false,
        startTime:Date.now()-3600 * 1000 * 24 * 7,
        pickerOptions2: {
          shortcuts: [{
            text: '昨天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近两周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
              picker.$emit('pick', [start, end]);
            }
          }],
          disabledDate(time) {
            // debugger
              return  Date.now()<time.getTime() ||time.getTime()< Store.state.datatree.startTime;
            }
        },
      };
    },
    beforeMount() {
      this.echarts = Store.state.datatree.childEntitys;
    },
    mounted() {
       this.myCharts=this.$echarts.init(document.getElementById('myChart'));
        this.setTime();

    },
    methods: {
      setTime(){

        //  debugger
        Store.commit('CHASTATE_CHANGE', { state: 1 });
        this.acceptData();
        this.myCharts.showLoading({text:"读取数据中..."});
        // this.initEcharts(this.option);
        let that=this;
        timer1=setInterval(function(){
             that.acceptData();

        },2000);
      },

      initEcharts(res){
        //   debugger
        // 实例化echarts
          this.myCharts.setOption(res);
          // window.onresize = this.myCharts.resize;
      },
      saveDate(res){
        // 存储数据
               if(Store.state.curren!=res.id){
                  for(let i=0;i<res.value.length;i++){
                    if (firstrequest) {
                      this.option.series.data.push(res.value[i][0]);
                      this.option.xAxis.data.push(res.value[i][1]);
                    } else {
                      this.option.series.data.unshift(res.value[i][0]);
                      this.option.xAxis.data.unshift(res.value[i][1]);
                    }
                    this.initEcharts(this.option);
                  }
                Store.commit('CURRENTID_CHANGE', { curren: res.id });
                 firstrequest = false;
               }
      },
      acceptData(){
        // 请求数据
         requestDataHistory({entitykey: Store.state.datatree.entitykey,currentId:Store.state.datatree.currentId,MaxCount:this.MaxCount}).then(res => {
            // 置空数组

            this.emptyEcharts();
            // console.log(res);
           this.myCharts.hideLoading();
            if(res.value!=""&&res.value!=undefined&&res.value!=null){
                  // this.myCharts.hideLoading();
                  this.saveDate(res);

            }
         });

      },
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
      emptyEcharts(){
        // 清空数据和基本配置
        // console.log(Store.state.datatree.currentId);
        if(Store.state.datatree.entityState===1){
          this.myCharts.showLoading({text:"读取数据中..."});
          this.option.series.data.splice(0,this.option.series.data.length);
          this.option.xAxis.data.splice(0,this.option.xAxis.data.length);
          this.initEcharts(this.option);
          Store.commit('CHASTATE_CHANGE', { state: 0 });
          Store.commit('CURRENTID_CHANGE', { curren: 0 });
          this.value4="";
        }

      },
      change(){
        // 发送选中时间获取历史数据
        this.sendtime=this.value4;
        console.log(this.sendtime);
        // 添加历史记录确认事件，请求数据
        let v1=new Date(this.sendtime[0]);
        let V1=v1.getTime();
        let v2=new Date(this.sendtime[1]);
        let V2=v2.getTime();

        let that=this;
        requestDateMap({entitykey:Store.state.datatree.entitykey,startingTime:V1,endingTime:V2,page:0,rows:10}).then(res=>{
            console.log(res);
            // 判断当前的页码数是否大于1，如果大于1，则为大数据，提示用户
            if(res.pages>res.page){
              this.open4(res.page,res.pages,this.progressLoading);
            }else if(res.pages==0){
              this.emptyEcharts();
            }else{
              window.clearInterval(timer1);
              Store.commit('CHASTATE_CHANGE', { state: 1 });
              this.emptyEcharts();

              this.saveDate(res);
              this.myCharts.hideLoading();

            }
        });

      },
      closeProgress(){
        this.progressFlag=false;
      }
      ,
      progressLoading(res1,res2){
        // 进度条和图表数据增加，判断当前页码和总页数是否相同
        // 递归--异步调用数据请求
        let v1=new Date(this.sendtime[0]);
        let V1=v1.getTime();
        let v2=new Date(this.sendtime[1]);
        let V2=v2.getTime();
        let pagenum=0;
        let that=this;
        this.initEcharts(this.option);



        // this.myCharts.hideLoading();

          if(res1>res2){
            this.initEcharts(this.option);
            this.closeProgress();
            this.open("当前数据已经加载完毕",function(){});

            return
          }
            requestDateMap({entitykey:Store.state.datatree.entitykey,startingTime:V1,endingTime:V2,page:res1,rows:10}).then(res=>{
              this.progressFlag=true;
              console.log(res);
              pagenum=res.page+1;
              let num=res.page/res2;
              console.log(parseInt(num*100));
              this.title=parseInt(num*100);

              for(let i=0;i<res.value.length;i++){
                this.option.series.data.unshift(res.value[i][0]);
                this.option.xAxis.data.unshift(res.value[i][1]);
              }
              this.progressLoading(pagenum,res.pages);
              // this.initEcharts(this.option);
            });






        // this.title=30;
      },
      open(msg,fun) {
        this.$alert(msg, '提示', {
          confirmButtonText: '确定',
          beforeClose:(action,instance,done)=>{
            if(action==="confirm"){
              fun();
              done();
            }

          }
        });
      },
      open4(res1,res2,fun) {
        const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '当前数据过大，将有可能出现卡顿或者卡死的情况, '),
            h('i', { style: 'color: teal' }, '是否继续')
          ]),
          showCancelButton: true,
          confirmButtonText: '继续',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {

              Store.commit('CHASTATE_CHANGE', { state: 1 });
              fun(res1,res2);

              done();

            } else {
              done();
            }
          }
        }).then(action => {

        });
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
          item => item && item.entitytype === 11 && item.name.indexOf('aii') !== -1
        );
        return tempDatas;
      }
    },
    watch: {
      entitykey1(val){
        // 监测entityState的变化
        if(val===1){
          this.myCharts.showLoading({text:"读取数据中..."});

          this.option.series.data.splice(0,this.option.series.data.length);
          this.option.xAxis.data.splice(0,this.option.xAxis.data.length);
          // this.initEcharts(this.option);
          Store.commit('CHASTATE_CHANGE', { state: 0 });
          Store.commit('CURRENTID_CHANGE', { curren: 0 });
          this.value4="";
          this.myCharts.clear();
          firstrequest = true;
          requestBeginTime({entitykey:Store.state.datatree.entitykey}).then(res=>{

           if(res!=""){
              var time=new Date(res);
              Store.commit('START_TIME', { startTime: time.getTime() });
              console.log(Store.state.datatree.startTime)
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
