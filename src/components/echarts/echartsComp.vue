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
          @change="dateChange"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd,hh:mm:ss">
        </el-date-picker>
      </div>
    </div>
    <div :id="divId" class="echarts"></div>
  </div>
</template>

<script>
  // 引入柱状图
  require('echarts/lib/chart/bar');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');

  import options from "../../../mock/echarts/history1";
  import { requestDataHistory, requestDateMap } from '../../framework/network/test';
  let timer;

  export default {
    name: "test",
    props: ['id', 'itemData', 'MaxCount'],
    data() {
      return {
        divId: this.id,
        chartOption: options,
        currentId: 0,
        chastate: 0,
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
        this.myCharts.setOption(res);
      },
      saveDate(res) {
        // 存储数据
        if(this.currentId !== res.id){
          for(let i=0; i<res.value.length; i++){
            if (this.firstrequest) {
              this.chartOption.series.data.unshift(res.value[i][0]);
              this.chartOption.xAxis.data.unshift(res.value[i][1]);
            } else {
              this.chartOption.series.data.push(res.value[i][0]);
              this.chartOption.xAxis.data.push(res.value[i][1]);
            }
            this.chartOption.series.name = this.itemData.description;
            this.chartOption.title.text = this.itemData.description;
            this.initEcharts(this.chartOption);
          }
          this.currentId = res.id;
          this.firstrequest = false;
        }
      },
      emptyEcharts(){
        // 清空数据和基本配置
        // console.log(Store.state.datatree.currentId);
        if(this.chastate === 1){
          this.myCharts.showLoading({text:"读取数据中..."});
          this.chartOption.series.data.splice(0, this.chartOption.series.data.length);
          this.chartOption.xAxis.data.splice(0, this.chartOption.xAxis.data.length);
          this.initEcharts(this.chartOption);
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
            this.emptyEcharts();
            this.myCharts.hideLoading();
            if(res.value !== "" && res.value !== undefined && res.value !== null){
              this.saveDate(res);
            }
          });
      },
      setTime(){
        this.chastate = 1;
        this.acceptData();
        this.myCharts.showLoading({text:"读取数据中..."});

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
              fun(res1,res2);
              done();
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
      progressLoading(res1,res2){
        // 进度条和图表数据增加，判断当前页码和总页数是否相同
        let v1 = new Date(this.timeInterval[0]);
        let V1 = v1.getTime();
        let v2 = new Date(this.timeInterval[1]);
        let V2 = v2.getTime();
        requestDateMap({
          entitykey: this.itemData.entitykey,
          startingTime: V1,
          endingTime: V2,
          page: 0,
          rows: 100
        })
          .then(res=>{});
        this.progressFlag = true;
        this.title = 30;
      },
      dateChange(){
        // 添加历史记录确认事件，请求数据
        let v1 = new Date(this.timeInterval[0]);
        let V1 = v1.getTime();
        let v2 = new Date(this.timeInterval[1]);
        let V2 = v2.getTime();
        let that = this;
        requestDateMap({
          entitykey: this.itemData.entitykey,
          startingTime: V1,
          endingTime: V2,
          page:0,
          rows: 2
        })
          .then(res => {
          console.log(res);
          // 判断当前的页码数是否大于1，如果大于1，则为大数据，提示用户
          if(res.pages > res.page){
            this.openModel(res.page, res.pages, this.progressLoading);
          }else if(res.pages === 0){

          }else{
            window.clearInterval(timer1);
            this.chastate = 1;
            this.emptyEcharts();

            this.saveDate(res);
            this.myCharts.hideLoading();

          }
        });

      },
    },
    beforeMount() {
      console.log(this.itemData);
    },
    mounted() {
      this.myCharts = this.$echarts.init(document.getElementById(this.divId));
      this.setTime();
      this.chartOption = options;
    },
    watch: {
      chartOption(val) {
        this.myCharts.setOption(val);
      },
      entitykey1(val) {
        // 监测entityState的变化
        if(val===1){
          this.myCharts.showLoading({text:"读取数据中..."});

          this.option.series.data.splice(0,this.option.series.data.length);
          this.option.xAxis.data.splice(0,this.option.xAxis.data.length);
          this.initEcharts(this.chartOption());
          this.chastate = 0;
          this.currentId = 0;
          this.timeInterval = "";
          this.myCharts.clear();
          this.firstrequest = true;
          requestBeginTime({ entitykey: this.itemData.entitykey }).then(res=>{
            if(res !== ""){
              let time = new Date(res);
              this.startTime = time.getTime();
            }
          })
          // console.log(Store.state.datatree.entitykey);
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

  .echarts {
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
