<template>
<div>
    <div id="all-container" style="">
        <div id="all-header" style="width:100%;height:3em;background:#cccccc;line-height:3em;padding-left:1em;">添加设备之编辑设备树：</div>
            <div id="left-container" style="display:inline-block;width:31.3em;height:51em;border: 1px solid #cccccc;float:left;text-align:center;">
                <div id="tree-pannel">
                    <div style="display:inline-block;width:100%;height:1.5em;border: 1px solid #888888;">{{ currentname }}</div>
                    <div id="tree-container" style="display:inline-block;width:96%;height:72%;overflow-y:auto;">
                        <el-tree
                            :data="treedata"
                            show-checkbox
                            node-key="id"
                            :props="defaultProps"
                            :highlight-current="true"
                            style="background:#cccccc;height:100%;"
                            default-expand-all
                            :expand-on-click-node="true"
                            :indent="32"
                            ref="tree"
                            check-strictly
                            @check-change="handleTreeClick"
                            ><span class="custom-tree-node" slot-scope="{ node, data }">
                                    <span>{{ node.label }}</span>
                                    <span>
                                      <el-button
                                        type="text"
                                        size="mini"
                                        @click="() => remove(node, data)">
                                        删除
                                      </el-button>
                                    </span>
                            </span>

                        </el-tree>                       
                        
                    </div>
                    <el-button-group style="float:left;margin-bottom:0.5em;display:none;">
                        <el-button type="primary" size="mini" icon="el-icon-arrow-up" alt="上移" @click="node_up()"></el-button>
                        <el-button type="primary" size="mini" icon="el-icon-arrow-down" alt="下移" @click="node_down()"></el-button>
                        <el-button type="primary" size="mini" icon="el-icon-arrow-left" alt="升级" @click="node_left()"></el-button>
                        <el-button type="primary" size="mini" icon="el-icon-arrow-right" alt="降级" @click="node_right()"></el-button>
                    </el-button-group>
                    <el-button-group style="float:right;margin-bottom:0.5em;">
                        &nbsp;&nbsp;
                        <el-button type="primary" size="mini" @click="saveAsTmpToServer()">另存为模版</el-button>
                    </el-button-group>
                    <el-button-group style="float:right;margin-bottom:0.5em;">
                        &nbsp;&nbsp;
                        <el-button type="primary" size="mini" @click="saveToServer()">保存</el-button>
                        <el-button type="primary" size="mini" @click="reloadFromServer()">还原</el-button>
                    </el-button-group>

                    <el-input id="tree-note" type="textarea" :rows="6" placeholder="请输入注释或说明" v-model="textarea">
                    </el-input>
                </div>
            </div>
            <div id="right-container" style="display:inline-block;width:30em;height:51em;border: 1px solid #cccccc;float:left;">
                <el-tabs type="border-card">
                    <el-tab-pane label="单设备列表" style="text-align:left;overflow:hidden;">
                        <el-row style="border:1px solid #cccccc;">
                            <el-col :span="8" v-for="(seldev, index) in seldevlst" :key="seldev.id" :offset="index > 0 ? 2 : 0" class="device-box" style="position:relative;border:0px solid #ff0000;">
                                <el-card :body-style="{ padding: '0px' }" style="text-align:center;margin:0px;background: #cccccc;border:0px solid #cccccc;">
                                    <img src="./images/dev1.jpg" class="image" style="display:inline-block;width:8em;height:6em;border:0px solid #888888;margin-top:0.8em;">
                                    <div style="display:inline-block;padding:0px;text-align:left;border:0px solid #888888;width:14em;font-size:12px;">
                                        <span>设备名称：{{ seldev.label }}</span><br />
                                        <span>设备型号：{{ seldev.type }}</span><br />
                                        <span>基本参数：{{ seldev.param }}</span> <br />
                                        <div class="bottom clearfix">
                                            <el-button-group style="float:right;bottom:0.8em;position:absolute;">
                                                <el-button type="primary" size="mini" icon="el-icon-back" @click="insdevtotree(seldev.id,index)"></el-button>
                                                <el-button type="primary" size="mini" icon="el-icon-edit" @click="editdev(seldev.id,index)"></el-button>
                                            </el-button-group>
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                        <div class="block">
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]"
                                    :page-size="100" layout="total, prev, pager, next, jumper" :total="400">
                                </el-pagination>
                            </div>


                    </el-tab-pane>
                    <el-tab-pane label="模版树列表" style="text-align:left;overflow:hidden;">
                            <el-row style="border:1px solid #cccccc;">
                                    <el-col :span="8" v-for="(seltmp, index) in seltmplst" :key="seltmp.id" :offset="index > 0 ? 2 : 0" class="device-box" style="position:relative;border:0px solid #ff0000;">
                                        <el-card :body-style="{ padding: '0px' }" style="text-align:center;margin:0px;background: #cccccc;border:0px solid #ffcccc;">
                                            <img src="./images/devtree1.jpg" class="image" style="display:inline-block;width:8em;height:6em;border:0px solid #888888;margin-top:0.8em;">
                                            <div style="display:inline-block;padding:0px;text-align:left;border:0px solid #888888;width:14em;font-size:12px;">
                                                <span>模版名称： {{ seltmp.label }}</span><br />
                                                <span>构建信息： {{ seltmp.type }}</span><br />
                                                <span>应用场景： {{ seltmp.param }}</span> <br />
                                                <div class="bottom clearfix" style="bottom:0.8em;position:absolute;">
                                                    <el-button-group style="float:right;">
                                                        <el-button type="primary" size="mini" icon="el-icon-back" @click="instmptotree(seltmp.id,index)"></el-button>
                                                        <el-button type="primary" size="mini" icon="el-icon-edit" @click="edittmp(seltmp.id,index)"></el-button>
                                                    </el-button-group>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-col>
                                </el-row>
                                <div class="block">
                                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]"
                                            :page-size="100" layout="total, prev, pager, next, jumper" :total="400">
                                        </el-pagination>
                                    </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
    </div>

</div>
</template>
<script>
import {
  Input,
  Button,
  Col,
  Row,
  Notification,
  MessageBox,
  Tree,
  Card,
  ButtonGroup,
  Tabs,
  TabPane,
  Pagination
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vue from "vue";

Vue.use(Input);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tree);
Vue.use(Card);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Pagination);

let trees = {};
let treeis=true;
export default {
  props: {
    device_tree: {
      type: String
    }
  },
  data: function() {
    return {
      visible: false,
      currentname: "通用菜地设备",
      seldevlst: [
        //可选的设备列表
        {
          id: 1001,
          label: "温度计-1",
          type: "大型",
          param: "[-100][+100]"
        },
        {
          id: "1002",
          label: "温度计-2",
          type: "中型",
          param: "[-100][+100]"
        },
        {
          id: 1003,
          label: "温度计-3",
          type: "小型",
          param: "[-100][+100]"
        },
        {
          id: 1004,
          label: "温度计-4",
          type: "微型",
          param: "[-100][+100]"
        },
        {
          id: 1005,
          label: "温度计-5",
          type: "嵌入式",
          param: "[-100][+100]"
        },
        {
          id: 1006,
          label: "温度计-6",
          type: "待定",
          param: "[-100][+100]"
        }
      ],
      seltmplst: [
        //可选的模版列表
        {
          id: 3001,
          label: "通用地况1",
          type: "简易型",
          param: "10平方米"
        },
        {
          id: 3002,
          label: "通用地况2",
          type: "简易型",
          param: "20平方米"
        },
        {
          id: 3003,
          label: "通用地况3",
          type: "简易型",
          param: "80平方米"
        },
        {
          id: 3004,
          label: "通用地况4",
          type: "简易型",
          param: "100平方米"
        },
        {
          id: 3005,
          label: "通用地况5",
          type: "简易型",
          param: "1000平方米"
        },
        {
          id: 3006,
          label: "通用地况6",
          type: "简易型",
          param: "不限"
        }
      ],
      treedata: [
        {
          id: 2001,
          label: "通讯设备1",
          children: [
            {
              id: 2004,
              label: "控制器",
              children: [
                {
                  id: 2009,
                  label: "空气温度"
                },
                {
                  id: 2010,
                  label: "空气湿度"
                }
              ]
            }
          ]
        },
        {
          id: 2002,
          label: "通讯设备2",
          children: [
            {
              id: 2005,
              label: "光照度"
            },
            {
              id: 2006,
              label: "空气PH值"
            }
          ]
        },
        {
          id: 2003,
          label: "通讯设备3",
          children: [
            {
              id: 2007,
              label: "土壤PH值"
            },
            {
              id: 2008,
              label: "土壤温度"
            },
            {
              id: 2010,
              label: "土壤湿度"
            }
          ]
        }
      ],
      currentPage1: 1,
      currentPage2: 2,
      currentPage3: 3,
      currentPage4: 4,
      defaultProps: {
        children: "children",
        label: "label"
      },
      textarea: ""
    };
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      console.log(this.treedata);
    },
    renderContent(h, { node, data, store }) {
      return (
        '<span class="custom-tree-node">' +
        "<span>{node.label}</span>" +
        "<span>" +
        '<el-button size="ini" type="text" on-click={() => this.append(data)}>Append</el-button>' +
        '<el-button size="mini" type="text" on-click={() => this.remove(node, data)}>Delete</el-button>' +
        "</span>" +
        "</span>"
      );
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    insdevtotree(id, idx) {
      
      	let tmpnode = this.$refs.tree.getCheckedNodes()[0];
     
     	for(var index in trees.children){  
	        //console.log(trees.children[index].label);
	        if(trees.children[index].label==this.seldevlst[idx].label){
	        	this.$message({
		          showClose: true,
		          message: '模板已添加！',
		          type: 'error'
		        });
		        treeis=false;
		        break;
	        }else{
	        	treeis=true;
	        }
	    }

 		if(treeis){
 			const newChild = { id: this.seldevlst[idx].id, label: this.seldevlst[idx].label, children: [] };
	        if (!trees.children) {
	          this.$set(trees, 'children', []);
	        }
	        trees.children.push(newChild);
	    } 
	    treeis=true;
      
       console.log(this.treedata);
      
    },
    instmptotree(id, idx) {
      console.log(`ins tmp to tree: ${id},${idx}`);
      let tmpnode = this.treedata[this.treedata.length - 1];
      this.$refs.tree.insertAfter({
          id: this.seltmplst[idx].id,
          label: this.seltmplst[idx].label
        },tmpnode);
    },
    editdev(id, idx) {
      console.log(`edit dev: ${id},${idx}`);
    },
    edittmp(id, idx) {
      console.log(`edit tmp: ${id},${idx}`);
    },
    o(key) {
      console.log(`o: ${key}`);
    },
    node_up() {
      console.log(this.$refs.tree.getCheckedNodes());
      //this.$refs.tree.insertAfter({id: 17, label: "土壤土壤"},this.$refs.tree.getCheckedNodes()[0])
      //var pid = this.getseleid();
      //console.log(pid);
      //this.setDataToTree(this.treedata,pid,{id:9,label:"12321"});
      console.log(this.treedata);
    },
    node_down() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    node_left() {
      console.log(this.$refs.tree.getCurrentNode());
    },
    node_right() {
      console.log(this.$refs.tree.getCurrentKey());
    },
    saveToServer() {
      console.log(this);
    },
    reloadFromServer() {
      console.log(this.$refs.tree);
    },
    saveAsTmpToServer() {
      console.log(this);
    },
    handleTreeClick(data, node) {
      console.log("--data--");
      console.log(data);
      console.log("--node--");
      trees=data;
      console.log(trees);
      // this.i++;
      //if (this.i % 2 == 0) {
      if (node) {
        this.$refs.tree.setCheckedNodes([]);
        this.$refs.tree.setCheckedNodes([data]);
        //交叉点击节点
      } else {
        this.$refs.tree.setCheckedNodes([]);
        //点击已经选中的节点，置空
      }
      // }
    },
    //递归遍历树数据
    setDataToTree(treeData, pId, respData) {
      for (var i = 0; i < treeData.length; i++) {
        var td = treeData[i];
        if (td.id == pId) {
          treeData.splice(i, 0, respData);
          //treeData[i].children = treeData[i].children.concat(respData);
          return;
        } else {
          this.setDataToTree(td.children, pId, respData);
        }
      }
      /*
      // 广度优先遍历
// data 就是ElementUI的Tree组件里那个data
let node = [data]
let ok = false
let result // 包含你说的那个子节点的父节点
while (!ok) {
    let item = node.shift()
    if (item.id == id) {
        result = item
        ok = true
    } else if (item.children && item.children.length > 0) {
        node = node.concat(item.children)
    }
}*/
    }
  }
};
</script>

<style scoped>
h1 a {
  color: #3399ff;
  font-size: 24px;
}

.device-box {
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

#all-container {
    height: 100%; border: 1px solid #eeeeee;
}

#tree-pannel {
  display: inline-block;
  width: 26em;
  height: 46em;
  box-shadow: 5px 5px 2px #888888;
  border-radius: 5px;
  background: #cccccc;
  padding: 0.8em;
  margin: 0.8em;
  text-align: center;
  /*overflow:scroll;*/
  position: relative;
}

#tree-note {
  display: inline-block;
  width: 26em;
  height: 12em;
  background: #fcfafa;
  border: 1px solid #888888;
  position: absolute;
  bottom: 1em;
  left: 0;
  right: 0;
  margin: auto;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>

