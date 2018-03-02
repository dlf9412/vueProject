<template>
  <div class="left">
    <div class="tableHeader">
      <div class="nowData" @click="setTime"> 查看实时数据</div>
      <div class="block">

        <el-date-picker
          size="small"
          align="left"
          v-model="timeInterval"
          type="datetimerange"
          :picker-options="pickerOptions2"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="dataChange"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd,hh:mm:ss"
          :default-time="['12:00:00', '08:00:00']">
        </el-date-picker>
      </div>
    </div>
    <el-progress :percentage="title" v-if="progressFlag" />
    <!-- <div :id="divId" class="echarts"></div> -->
    
    <ele :echart-id="divId" 
         :chart-data="dataArr" 
         :load-state="loadState" 
         :title-text="titleTexts"
         :y-text="yText"
         :echarts-type="echartsTypes">
    </ele>
  </div>
</template>

<script>
  // 引入柱状图
  require('echarts/lib/chart/bar');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');

  import { requestDataHistory, requestDateMap, requestBeginTime } from '../../framework/network/test';
  import ele from "./echartType"
  let timer;

  export default {
    name: "test",
    props: ['id', 'itemData', 'MaxCount'],
    components: {
      ele
    },
    data() {
      return {
        echartsTypes:"Line",
        divId: this.id,
        dataArr:[],
        currentId: 0,
        titleTexts:'',
        chastate: 0,
        yText:'',
        loadState:false,
        firstrequest: true,
        timeInterval: "",
        progressFlag:false,
        title:20,
        startTime: Date.now() - 3600 * 1000 * 24 * 7,
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
            return  Date.now() < time.getTime() || time.getTime() < Date.now() - 3600 * 1000 * 24 * 7;
          }
        },
      }
    },
    methods: {
      initEcharts(res){
        
      },
      saveDate(res) {
        // 存储数据
        if(this.currentId !== res.id){
          for(let i=0; i<res.value.length; i++){
            if (this.firstrequest) {
              this.dataArr.unshift(res.value[i]);
             
            } else {
              this.dataArr.push(res.value[i]);
            }
            this.yText = this.itemData.description;
            this.titleTexts = this.itemData.description;
           
          }
          this.currentId = res.id;
          this.firstrequest = false;
        }
      },
      emptyEcharts(){
        // 清空数据和基本配置
        
        if(this.chastate === 1){
          
          this.dataArr.splice(0, this.dataArr.length);
          this.timeInterval = '';
          this.chastate = 0;
          this.currentId = 0;
        }
      },
      acceptData(){
        // 请求数据
        requestDataHistory({
            entitykey: this.itemData.entitykey,
            currentId: this.currentId,
            MaxCount: this.MaxCount
        })
          .then(res => {
            // 置空数组
            // debugger
            this.emptyEcharts();
            // this.myCharts.hideLoading();
            if(res.value !== "" && res.value !== undefined && res.value !== null){
              this.saveDate(res);
            }
          });
      },
      setTime(){
        // debugger
        this.chastate = 1;
        this.firstrequest = true;
        this.acceptData();
        // this.myCharts.showLoading({text:"读取数据中..."});

        let that = this;
        timer = setInterval(function() {
          that.acceptData();
        }, 2000);
      },
      openModel(res1, res2, fun) {
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
              this.chastate = 1;
              fun(res1,res2);
              done();
            } else {
              done();
            }
          }
        }).then(action => {
         
        });
      },
      open(msg, fun) {
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
      closeProgress(){
        this.progressFlag=false;
      },
      progressLoading(res1,res2){
        // 进度条和图表数据增加，判断当前页码和总页数是否相同
        let v1 = new Date(this.timeInterval[0]);
        let V1 = v1.getTime();
        let v2 = new Date(this.timeInterval[1]);
        let V2 = v2.getTime();
        let pagenum = 0;

        if(res1 > res2){
          // this.initEcharts
          // (this.chartOption);
          this.closeProgress();
          this.open("当前数据已经加载完毕",function(){});

          return
        }

        requestDateMap({
          entitykey: this.itemData.entitykey,
          startingTime: V1,
          endingTime: V2,
          page: res1,
          rows: 100
        })
          .then(res=>{
            this.progressFlag = true;
            pagenum = res.page + 1;
            let num = res.page / res2;
            this.title = parseInt( num * 100);

            for(let i = 0; i < res.value.length; i++){
              this.dataArr.unshift(res.value[i]);
            }
            // this.initEcharts(this.chartOption);
            this.progressLoading(pagenum, res.pages);
          });
      },
      dataChange(val){
        if (val) {
          // 添加历史记录确认事件，请求数据
          let v1 = new Date(this.timeInterval[0]);
          let V1 = v1.getTime();
          let v2 = new Date(this.timeInterval[1]);
          let V2 = v2.getTime();
          requestDateMap({
            entitykey: this.itemData.entitykey,
            startingTime: V1,
            endingTime: V2,
            page:0,
            rows: 300
          })
            .then(res => {
              // 判断当前的页码数是否大于1，如果大于1，则为大数据，提示用户
              if(res.pages > res.page+1){
                this.openModel(res.page, res.pages, this.progressLoading);
              }else if(res.pages === 0){
                this.open("当前时间段没有数据",function(){});
                this.emptyEcharts();
              }else{
                window.clearInterval(timer1);
                this.chastate = 1;
                this.emptyEcharts();

                for(let i = 0; i < res.value.length; i++){
                 this.dataArr.unshift(res.value[i]);
                }
                // this.initEcharts(this.chartOption);
                // this.myCharts.hideLoading();
              }
            });
        }
      },
    },
    mounted() {
      
      this.setTime();
    },
    watch: {
     
      chastate(val) {
        if (val === 1) {
          // this.myCharts.showLoading({text:"读取数据中..."});

          this.dataArr.splice(0,this.dataArr.length);
          this.chastate = 0;
          this.currentId = 0;
          this.firstrequest = true;
          requestBeginTime({
            entitykey: this.itemData.entitykey
          })
            .then(res=>{
            //TODO: startTime  抽离成一个组件内部状态
            // if(res !== ""){
            //   let time = new Date(res);
            //   Store.commit('START_TIME', { startTime: time.getTime() });
            //   console.log(res)
            // }
          })
        }
      }
    },
  }
</script>

<style scoped>
  .left{
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .chart {
    width: 100%;
    height: 400px;
  }

  .tableHeader{
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    border-bottom: 1px solid #ccc;
    padding:10px;
  }

  .block{
    width: 70%;
  }

  .nowData{
    cursor: pointer;
    color: blue;
  }
</style>
