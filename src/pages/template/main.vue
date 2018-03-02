<template>
  <div>
      <div class="middle">
          <div class="left">
              <div class="_button">
                  <span>模板列表</span>
                  <el-button type="primary">添加模板</el-button>
              </div>
              <div class="_list" >
                 <div class="center">
                      <div class="_listChild" v-for="(option,index) in arr" @click="changeStyle(index)" :class="addIndex==index?changeColor=true:changeColor=false"  >
                      <!-- 卡片组件 -->
                      <card :label="option.label" :children-note="option.child" ></card>
                  </div>
              </div>

              <div class="pagination">
                  <div class="block">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage4"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="1"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total=total>
                        </el-pagination>
                  </div>
                  <!-- <paging :page-sizes="[10, 20, 30]" :total=3  :current-page="currentPage4">
                  </paging> -->
                  
              </div>
           </div>


        </div>
        <div class="right">
              <h4>模板对应树结构</h4>
              <el-tree :data="data1" :props="defaultProps" default-expand-all>
              </el-tree>


        </div>
      </div>
       <div class="footer">
           <!--<el-button type="primary" style="margin-top: 12px;" @click="next">下一步</el-button>-->
           <div class="_footer">
               <h2>说明</h2>
               <div>
                   <p>填写设备信息</p>
                   <p>说明信息</p>
               </div>
           </div>
       </div>
  </div>
</template>
<script>
import Paging from "@/components/card/paging"
import Card from "@/components/card/card"

export default {
  name:"mainTemplate",
  components: {
      Paging,Card
  },
  data(){
      return{
        active: 1,
        oldColNum:0,
        colNum:0,
        visibleWidth:0,
        boxWidth:0,
        listBox:0,
        changeColor:false,
        boxItem:true,
        addIndex:-1,
        currentPage4: 5,
        total:5,
        data1:[],
        maxHeight:0,
        arr:[
            {"label":"设备",
            "child":[
                {"label":"子节点1",
                 "child":[{"label":"子节点1"},
                {"label":"子节点2"}]
                },
                {"label":"子节点2"}
            ]} ,{"label":"设备",
            "child":[
                {"label":"子节点3"},
                {"label":"子节点2"}
            ]}, {"label":"设备",
            "child":[
                {"label":"子节点4"},
                {"label":"子节点2"}
            ]}, {"label":"设备",
            "child":[
                {"label":"子节点9"},
                {"label":"子节点2"}
            ]}, {"label":"设备",
            "child":[
                {"label":"子节点1"},
                {"label":"子节点2"}
            ]},],
            defaultProps: {
                children: 'child',
                label: 'label'
            },
      }
  },
  mounted () {
      this.listBox=document.getElementsByClassName("center")[0];
      this.getInfo();
      let that=this;
      this.initWidth();
      this.initBox();
      this.initHeight();
      window.onresize=function(){
          that.getInfo();
          that.initHeight();

          if(that.colNum!=that.oldColNum){
            that.initBox();
            that.initWidth();

          }
      }
  },
  methods: {
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      next() {
          if(this.addIndex!=-1){
              if (this.active++ > 2) this.active = 3;
          }else{
              alert("请先选择模板");
          }

      },
      initHeight(){
        //   设置高度
        if (document.getElementsByClassName("_listChild").length !== 0) {
          let midHeight=document.getElementsByClassName('middle')[0];
          let listHeight=document.getElementsByClassName('_list')[0];
          listHeight.style.height=this.maxHeight+70+"px";
          midHeight.style.height=document.getElementsByClassName('left')[0].offsetHeight;
        }
      },
      getInfo(){
        //  求取列数
        if (document.getElementsByClassName("_listChild").length !== 0) {
          this.boxWidth=document.getElementsByClassName("_listChild")[0].offsetWidth;
          this.visibleWidth=document.getElementsByClassName("_list")[0].offsetWidth;
          this.colNum=parseInt(this.visibleWidth/this.boxWidth);
        }
      },
      initWidth(){
        //   重置父级盒子的宽度
          this.listBox.style.width=this.colNum*this.boxWidth+"px";
      },
      initBox(){
        //   设置盒子的top和left/瀑布流
          this.oldColNum=this.colNum;
          let arr=[];
          let allBoxEle=document.getElementsByClassName("_listChild");
          for(let i=0;i<allBoxEle.length;i++){
              if(i<this.colNum){
                arr.push(allBoxEle[i].offsetHeight);
                allBoxEle[i].style.position="absolute";
                allBoxEle[i].style.left=allBoxEle[i].offsetWidth*i+"px";
                allBoxEle[i].style.top="0px";
              }else{
                let minColHeight=Math.min.apply(null,arr);
                let minColIndex = arr.indexOf(minColHeight);
                allBoxEle[i].style.position = "absolute";
                allBoxEle[i].style.left = allBoxEle[i].offsetWidth * minColIndex + 'px';
                allBoxEle[i].style.top = minColHeight + 'px';
                 // 将当前盒子的高度加上原本最小的盒子的高度重新赋值
                arr[minColIndex] += allBoxEle[i].offsetHeight;
                this.maxHeight=Math.max.apply(null,arr);

              }

          }
      },
      changeStyle(index){
        //   根据选中状态改变盒子样式/改变右侧树结构
          let allBoxEle=document.getElementsByClassName("_listChild");
          for(let i=0;i<allBoxEle.length;i++){
              if(i==index){
                  this.data1.shift(this.arr[index]);
                  this.addIndex=index;
                  this.data1.push(this.arr[index]);

              }
          }
      },



    },


}
</script>
<style lang="less" scoped>
  @import "../../assets/css/template/main.less";
</style>






