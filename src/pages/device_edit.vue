<template>
  <div>
      <div id="all-container" style="">
        <div id="all-header" style="">添加编辑单设备资料：</div>
            <div id="left-container" style="">
                <div id="left-info" style="">
                    <img src="./images/dev1.jpg" class="image" style="display:inline-block;width:16em;height:12em;margin:0.8em;box-shadow: 5px 5px 2px #888888;border-radius: 5px;">
                    <div id="dev_base_info" style="display:inline-block;width:16em;text-align:left;margin-top:3em;">
                    编辑人:{{ ifowriter1 }}<br />
                    版权号:{{ copyright }}<br />
                    编&nbsp;&nbsp;&nbsp;号:{{ ifonumber }}<br />
                    时&nbsp;&nbsp;&nbsp;间:{{ ifotime }}<br />
                    联&nbsp;&nbsp;&nbsp;络:{{ ifophone }}<br />
                    </div>
                </div>
                <div id="right-info"  style="display:inline-block;width:32em;height:51em;text-align:left;float:left;">
                   <div style="display:inline-block;width:100%;height:98%;overflow-y:auto;border: 1px solid #cccccc;">
                      <div v-for="(item, index) in dev_property" style="white-space:nowrap;">
                          <el-input size="mini" v-if="!item.off_del" v-model="item.name" placeholder="属性名称" style="width:18%;"></el-input>
                          <el-tag size="small" v-if="item.off_del" style="width:18%;color:#333333;">{{ item.label }}</el-tag>
                          <el-input size="mini" v-model="item.value" placeholder="属性内容" style="width:71%;"></el-input>
                          <el-button type="danger" size="mini" plain v-if="!item.off_del" icon="el-icon-circle-close-outline" @click="remove_property(index)" style="color:#ff0000;"></el-button>
                      </div>
                      <el-input id="tree-note" type="textarea" :rows="3" placeholder="请输入注释或说明" v-model="notes" style="margin-top:0.1em;width:99%;">
                      </el-input>

                      <el-button-group style="float:right;margin:0.2em;">
                          <el-button round type="primary" size="mini" @click="add_property()">增加行</el-button>
                          <el-button round type="primary" size="mini" @click="saveToServer()">保存</el-button>
                          <el-button round type="primary" size="mini" @click="saveAsNewToServer()">另存为...</el-button>
                          <el-button round type="primary" size="mini" @click="advanced_show()">高级功能</el-button>
                      </el-button-group>

                    </div>
                </div>
                <p>&nbsp;&nbsp;</p>
            </div>
            <div id="right-container" v-if="show_advanced" style="display:inline-block;background:#cccccc;margin-left:1em;width:24em;height:50.4em;text-align:left;float:left;padding:0.3em;border: 1px solid #cccccc;box-shadow: 5px 5px 2px #888888;border-radius: 5px;">
                 <span>高级资料编辑：</span><br /><br />
                <span>控制说明：</span>
                <el-input id="tree-note" type="textarea" :rows="12" placeholder="请输入控制说明" v-model="notes_advanced">
                </el-input>
                <span>控制编码：</span>
                <el-input id="tree-note" type="textarea" :rows="12" placeholder="请输入控制码" v-model="control_advanced">
                </el-input>
            </div>
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
  Tag,
  Tabs,
  TabPane,
  Pagination
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vue from "vue";
import VueResource from "vue-resource"

Vue.use(Input);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tree);
Vue.use(Card);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Tag);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Pagination);
Vue.use(VueResource);

export default {
  data: function() {
    return {
      ifowriter1: "嗣衡科技",
      copyright: "福准字2018",
      ifonumber: "201802241402",
      ifotime: "2018-02-24 14:02",
      ifophone: "0592-400XXXXXXX",
      dev_property: [
        { name: "名称", key: "name", value: "温度计-1", off_del: true },
        { name: "型号", key: "type", value: "大型", off_del: true },
        { name: "类型", key: "model", value: "外挂式", off_del: true },
        { name: "参数1", key: "param1", value: "2018-02-24", off_del: false },
        { name: "", key: "", value: "", off_del: false },
        { name: "", key: "", value: "", off_del: false },
        { name: "", key: "", value: "", off_del: false },
        { name: "", key: "", value: "", off_del: false },
        { name: "", key: "", value: "", off_del: false }
      ],
      notes: "",
      notes_advanced: "",
      control_advanced: "",
      show_advanced: false,
      fileList: [
          {name: 'food.jpeg', url: ''},
          {name: 'food2.jpeg', url: ''}
        ]
    };
  },
  methods: {
    remove_property(idx) {
      //删除一项属性
      this.dev_property.splice(idx, 1);
    },
    add_property() {
      //增加一项属性
      this.dev_property.push({ name: "", key: "", value: "", off_del: false });
    },
    advanced_show() {
      //显示高级特性
      this.show_advanced = !this.show_advanced;
    },
    saveToServer() {
      //保存资料到服务器
    },
    saveAsNewToServer() {
      //另存为新设备资料
    },
    submitUpload() {
        //this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
  }
};
</script>
<style scoped>
#all-container {
  height: 100%;
  border: 1px solid #eeeeee;
}
#all-header {
  background: #cccccc;
  width: 100%;
  height: 3em;
  line-height: 3em;
  padding-left: 1em;
}
#left-container {
  display: inline-block;
  background: #cccccc;
  width: 53em;
  height: 51em;
  border: 1px solid #cccccc;
  float: left;
  text-align: center;
  box-shadow: 5px 5px 2px #888888;
  border-radius: 5px;
}
#left-info {
  display: inline-block;
  width: 20em;
  height: 51em;
  float: left;
  text-align: center;
}

.avatar-uploader .el-upload {
  border: 1px dashed #262424;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #1b1c1d;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>



