
<template>
<div class="prop-Edit" style="display:inline-block;width:100%;height:98%;overflow-y:auto;border: 1px solid #cccccc;">
    <div v-for="(item, index) in prop_data" style="white-space:nowrap;">
        <el-input size="mini" v-if="!item.off_del" v-model="item.name" placeholder="属性名称" style="width:18%;"></el-input>
        <el-tag size="small" v-if="item.off_del" style="width:18%;color:#333333;">{{ item.name }}</el-tag>
        <el-input size="mini" v-model="item.value" placeholder="属性内容" style="width:71%;"></el-input>
        <el-button type="danger" size="mini" plain v-if="!item.off_del" icon="el-icon-circle-close-outline" @click="remove_property(index)" style="color:#ff0000;"></el-button>
    </div>
    <el-input id="prop-note" type="textarea" :rows="3" placeholder="请输入注释或说明" v-model="notes" style="margin-top:0.1em;width:99%;">
    </el-input>

    <el-button-group style="float:right;margin:0.2em;">
        <el-button round type="primary" size="mini" @click="add_property()">增加行</el-button>
        <el-button round type="primary" size="mini" @click="$emit('onSave',prop_data)">保存</el-button>
        <el-button round type="primary" size="mini" @click="$emit('onSaveAs',prop_data)">另存为...</el-button>
        <el-button round type="primary" size="mini" @click="$emit('onAdvanced',prop_data)">高级功能</el-button>
    </el-button-group>

</div>
</template>
<script>
import { Input, Button, ButtonGroup, Tag } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vue from "vue";

Vue.use(Input);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Tag);

export default {
  props: {
    prop_data: {
      type: Array,
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
    console.log(__dirname);
  },
  watch: {},
  methods: {
    remove_property(idx) {
      //删除一项属性
      this.prop_data.splice(idx, 1);
    },
    add_property() {
      //增加一项属性
      this.prop_data.push({ name: "", key: "", value: "", off_del: false });
    },
    advanced_show() {
      //显示高级特性
      //this.show_advanced = !this.show_advanced;
    },
    saveToServer() {
      //保存资料到服务器
    },
    saveAsNewToServer() {
      //另存为新设备资料
    }
  },
  data: function() {
    return {
      notes: ""
    };
  }
};
</script>
<style scoped>