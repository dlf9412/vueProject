
<!-- //////////////////////////////////////////////
//  卡片型列表组件 (hyl 2018-03-01)
//  import shCardList from "./components/shCardList.vue";
//  export default { components: { shCardList },}
//  <shCardList @onCardSelect="TestCardList($event)" ref="sh" :card_date="设备数组数据变量"></shCardList>
////////////////////////////////////////////// -->

<template>
<div class="card-list">
    <el-row style="border:1px solid #cccccc;">
        <el-col :span="8" v-for="(selcard, index) in a_card_date" :offset="index > 0 ? 2 : 0" class="card-box" style="">
            <el-card :body-style="{ padding: '0px' }" style="text-align:center;margin:0px;background: #cccccc;border:0px solid #cccccc;">
                <img :src="( imgpath + ((selcard.imgfile == '' || selcard.imgfile == undefined) ?imgdef:selcard.imgfile) )" class="image" style="display:inline-block;width:8em;height:6em;border:0px solid #888888;margin-top:0.8em;">
                <div class="card-note" style="">
                    <span>设备名称：{{ selcard.label }}</span><br />
                    <span>设备型号：{{ selcard.type }}</span><br />
                    <span>基本参数：{{ selcard.param }}</span> <br />
                    <div class="bottom clearfix">
                        <el-button-group style="float:right;bottom:0.8em;position:absolute;">
                            <el-button type="primary" size="mini" icon="el-icon-back" @click="$emit('onCardSelect',selcard)"></el-button>
                            <el-button type="primary" size="mini" icon="el-icon-edit" @click="$emit('onCardEdit',selcard)"></el-button>
                        </el-button-group>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
        <div style="margin-bottom:0.5em;vertical-align:middle;line-height:2em;">
        {{ pageNo + "/" + pageCount }}
        <el-button-group style="vertical-align:middle;line-height:2em;">
            <el-button type="primary" size="mini" alt="首页" @click="pageHome()">首页</el-button>
            <el-button type="primary" size="mini" alt="上页" @click="pageLast()">上页</el-button>
            <el-button type="primary" size="mini" alt="下页" @click="pageNext()">下页</el-button>
            <el-button type="primary" size="mini" alt="尾页" @click="pageEnd()">尾页</el-button>
        </el-button-group>
        <el-input v-model="jumeNo" size="mini" placeholder="" style="width:4em;"></el-input>
        <el-button type="primary" size="mini" alt="跳页" @click="pageJump()">跳页</el-button>
        </div>
</div>
</template>
<script>
import { Input, Form,Button, Col, Row, Card, ButtonGroup } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vue from "vue";

export default {
  props: {
    //定义可用于外部访问的变量
    /*pageSize: {
      type: Number,
      default: 6
    },
    pageCount: {
      type: Number,
      default: 0
    },
    pageNo: {
      type: Number,
      default: 1
    },*/
    card_date: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "卡片组件"
    },
    anyfunc:{
      type: Function,
      default: null
    }
  },
  computed: {
    author() {
      return this.$store.state.author;
    }
  },
  created() {
    //组件开始实例化时执行的函数
    console.log("created");
    //console.log(this.card_date);
    let itemCount = this.card_date.length;
    this.pageCount =  (itemCount - itemCount % this.pageSize) / this.pageSize + (itemCount % this.pageSize > 0 ? 1 : 0);
    this.pageNo = 1;
   //测试全局变量和函数
    console.log(this.token);
    this.getData();

    //这里可以添加数据整理代码

    //console.log(this.pageCount);
    //console.log(this.pageNo);
    this.updatePage();
  },
  watch: {},
  methods: {
    //直接更新数据
    updatePage() {
      let itemCount = this.card_date.length;
      let itemStart = (this.pageNo - 1) * this.pageSize;
      let itemEnd = this.pageNo * this.pageSize;
      this.a_card_date.splice(0, this.a_card_date.length);//清空原有数据
      for (
        let i = itemStart;
        i < itemEnd;
        i++
      ) {
        
        if (i < itemCount) {
          this.a_card_date.push(this.card_date[i]);
        }
      }
    },
    updateData(data) {
      //card_date = data.slice(0);
      console.log("changedata");
      /*console.log(this.type);
      console.log(this.pageSize);
      console.log(this.pageNo);
      console.log(this.pageCount);
      console.log(this.author);
      console.log(this.card_date);*/
    },
    //首页
    pageHome() {
      this.pageNo = 1;
      this.updatePage();
      this.jumeNo = this.pageNo;
    },
    //尾页
    pageEnd() {
      this.pageNo = this.pageCount;
      this.updatePage();
      this.jumeNo = this.pageNo;
    },
    //上页
    pageLast() {
      this.pageNo = (this.pageNo > 1? parseInt(this.pageNo) - 1 : 1);
      this.updatePage();
      this.jumeNo = this.pageNo;
    },
    //下页
    pageNext() {
      this.pageNo = (this.pageNo < this.pageCount? parseInt(this.pageNo) + 1 : this.pageCount);
      this.updatePage();      
      this.jumeNo = this.pageNo;
    },
    //跳转到某页
    pageJump() {
      this.pageNo = parseInt(this.jumeNo);
      this.pageNo = parseInt(this.pageNo < 1?1:(this.pageNo > this.pageCount?this.pageCount:this.pageNo));
      this.jumeNo = this.pageNo;
      this.updatePage();      
    },
    //取数据
    getCardData() {}
  },
  data: function() {
    return {
      pageSize: 6,
      pageCount: 0,
      pageNo: 1,
      jumeNo:1,
      //imgpath: "../src/images/", //(imgpath + (selcard.imgfile== '' ?imgdef:selcard.imgfile))
      imgpath: @"IMGPATH", //(imgpath + (selcard.imgfile== '' ?imgdef:selcard.imgfile))
      imgdef: "dev1.jpg",
      a_card_date: [
        {
          id: 1001,
          label: "温度计-1",
          type: "大型",
          param: "[-100][+100]",
          imgfile: "devtree1.jpg"
        },
        {
          id: "1002",
          label: "温度计-2",
          type: "中型",
          param: "[-100][+100]",
          imgfile: ""
        },
        {
          id: 1003,
          label: "温度计-3",
          type: "小型",
          param: "[-100][+100]",
          imgfile: ""
        },
        {
          id: 1004,
          label: "温度计-4",
          type: "微型",
          param: "[-100][+100]",
          imgfile: ""
        },
        {
          id: 1005,
          label: "温度计-5",
          type: "嵌入式",
          param: "[-100][+100]",
          imgfile: ""
        },
        {
          id: 1006,
          label: "温度计-6",
          type: "待定",
          param: "[-100][+100]",
          imgfile: ""
        }
      ]
    };
  }
};
</script>
<style scoped>
.card-box {
  position: relative;
  display: inline-block;
  text-align: left;
  border: 1px solid #aaaaaa;
  padding: 0em;
  margin: 0.6em;
  height: 13.6em;
  width: 12.6em;
  background: #cccccc;
  box-shadow: 5px 5px 2px #888888;
  border-radius: 5px;
  position: relative;
}
.card-note {
  display: inline-block;
  padding: 0px;
  text-align: left;
  border: 0px solid #888888;
  width: 14em;
  font-size: 12px;
}
</style>


