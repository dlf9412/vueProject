<template>
  <div>
   
    <p hidden="true"></p>
    
    <div class="box">
      
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
                  @change="change"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd,hh:mm:ss">
                </el-date-picker>
            </div>
          </div>
        <div id="myChart" class="echarts"></div>
      </div>
      <div class="btnGroup">
        
        <p @click="open4">发送指令</p>
         <el-input v-model="input" placeholder="请输入需要控制的值" :class="changeColor"></el-input>
         <el-button type="primary" @click="sendText">发送</el-button>
         
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

import options from "../../../mock/echarts/history1";
import VuexStore from '../../vuex/store';
import { requestDataPoint, requestDatapointstates, sendDataPoint,requestDataHistory,requestDateMap,requestBeginTime} from '../../framework/network/test';
let timer1;
  export default {
    name: 'Line1',
    data() {
      return {
       myCharts:{},
        option:options,
        input:"",
        dataLength:0,
        changeColor:0,
        currentId:0,
        MaxCount:30,
        value4: "",
        entitykey2:"",
        sendState:0,
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
              return  Date.now()<time.getTime() ||time.getTime()< VuexStore.state.startTime;
            }
        },

      };
    },
    mounted() {
       this.myCharts=this.$echarts.init(document.getElementById('myChart'));
        this.setTime();
      
    },
    methods: {
      setTime(){
        
        //  debugger
        VuexStore.state.entityState=1;
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
          this.myCharts.setOption(res);
          window.onresize = this.myCharts.resize;
      },
      saveDate(res){
                for(let i=0;i<res.value.length;i++){
                    this.option.series.data.push(res.value[i][0]);
                    this.option.xAxis.data.push(res.value[i][1]);
                    VuexStore.state.currentId=res.id;
                    this.initEcharts(this.option);
                  }
      },
      acceptData(){
         requestDataHistory({entitykey: VuexStore.state.entitykey,currentId:VuexStore.state.currentId,MaxCount:this.MaxCount}).then(res => {
            // 置空数组
            
            this.emptyEcharts();
            console.log(res);
            if(res.value!=""&&res.value!=undefined&&res.value!=null){
                  this.myCharts.hideLoading();
                  this.saveDate(res);
                 
            } 
         });

      },
      sendText(){
          if(this.input==""){
             this.changeColor=1;
            }else{
                if(this.sendState==0){
                  this.sendState=1
                    sendDataPoint({entitykey:VuexStore.state.entitykey,key:this.input}).then(res=>{
                       this.sendState=0;
                       alert(res.state);
                    });
                }
        }

      },
      emptyEcharts(){
        // console.log(VuexStore.state.currentId);
        if(VuexStore.state.entityState==1){
          this.myCharts.showLoading({text:"读取数据中..."});
         
          this.option.series.data.splice(0,this.option.series.data.length);
          this.option.xAxis.data.splice(0,this.option.xAxis.data.length);
          this.initEcharts(this.option);
          VuexStore.state.entityState=0;
          VuexStore.state.currentId=0;
          this.value4="";
        }

      },
      change(){
        console.log(this.value4);
        // 添加历史记录确认事件，请求数据
        let v1=new Date(this.value4[0]);
        let V1=v1.getTime();
        let v2=new Date(this.value4[1]);
        let V2=v2.getTime();
        let that=this;
        requestDateMap({entitykey:VuexStore.state.entitykey,startingTime:V1,endingTime:V2,page:0,rows:100}).then(res=>{
            console.log(res);
            // 判断当前的页码数是否大于1，如果大于1，则为大数据，提示用户
            if(res.pages>1){
              this.open4();
            }else if(res.pages==0){

            }else{
              window.clearInterval(timer1);
              VuexStore.state.entityState=1;
              that.emptyEcharts();
              
              this.saveDate(res);
              this.myCharts.hideLoading();

            }
        });
        
      },
       open2() {
        this.$confirm('当前数据过大，将有可能出现卡顿或者卡死的情况, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      open4() {
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
              
              
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          });
        });
      },
      


    },
    computed: {
     entitykey1(){
      return VuexStore.state.entityState;
     }
    },
    watch: {
      entitykey1(val){
        // 监测entityState的变化
        if(val==1){
          this.myCharts.showLoading({text:"读取数据中..."});
         
          this.option.series.data.splice(0,this.option.series.data.length);
          this.option.xAxis.data.splice(0,this.option.xAxis.data.length);
          this.initEcharts(this.option);;
          VuexStore.state.entityState=0;
          VuexStore.state.currentId=0;
          this.value4="";
          this.myCharts.clear();
          requestBeginTime({entitykey:VuexStore.state.entitykey}).then(res=>{
           
           if(res!=""){
              var time=new Date(res);
              VuexStore.state.startTime=time.getTime();
              console.log(VuexStore.state.startTime)
           }
          })
          // console.log(VuexStore.state.entitykey);
        }
      }
      
      
    }

  }
  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .h1 {
    font-weight: normal;
  }
  .echarts {
    width: 100%;
    height: 400px;
  }
  .box{
    width: 100%;
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    align-items:flex-start
  }
  .left{
    width: 60%;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .el-button{
    display: block;
    margin: 10px 0;

  }
  .el-input__inner,.el-button{
   float: right;
   width: 100%
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
</style>
