<template>
  <div class="el-tree" role="tree">
    <el-tree
    :data="data"
    :show-checkbox="ShowCheckbox"
    :default-expand-all="DefaultExpandAll"
    :indent="indent"
    :check-strictly="CheckStrictly"
    node-key="id"
    ref="tree"
    @check-change="handleTreeClick"
    >
    	<span class="custom-tree-node" slot-scope="{ node, data }">
		    <span>{{ node.label }}</span>
		    <span v-if="ShowDelNode">
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
</template>

<script>

	/*import { Input, Button, Tree} from "element-ui";
	import Vue from "vue";
	Vue.use(Input);
	Vue.use(Tree);
	Vue.use(Button);*/

  
  let trees = {};
	let treeis=true;
	let dev_id=10000;
	export default {
  data: function() {
    return {
      
    };
  },
  props:{
		data: {
	    type: Array
		},
		treenode:{
			type: Object
		},
		indent: {
	    type: Number,
	    default: 5
	 	},
	 	onadd: {
	    type: Number
	 	},
	 	ShowCheckbox: {
      type: Boolean,
      default: false
    },
	 	DefaultExpandAll: {
      type: Boolean,
      default: false
    },
	 	CheckStrictly: {
      type: Boolean,
      default: false
   	},
   	ShowDelNode: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      console.log(this.treedata);
    },
    handleTreeClick(data, node) {
      if (node) {
        //this.$refs.tree.setCheckedNodes([]);
        this.$refs.tree.setCheckedNodes([data]);
        trees=data;
      } else {
      	//点击已经选中的节点，置空
        //this.$refs.tree.setCheckedNodes([]);
      }
    }
  },
  mounted(){
		//console.log(this.treenode)
	},
	watch: {
    onadd: function (val) {
    	
    	let tmpnode = this.$refs.tree.getCheckedNodes()[0];
     
     	for(var index in trees.children){
	        if(trees.children[index].label==this.treenode.label){
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
 			const newChild = { id: dev_id++, device_id: this.treenode.id, label: this.treenode.label, children: [] };
        if (!trees.children) {
          this.$set(trees, 'children', []);
        }
        trees.children.push(newChild);
        
        if (tmpnode == null) {
	        tmpnode = this.data[this.data.length - 1];
	        this.data[this.data.length]={
	          	id: dev_id++,
	          	device_id: this.treenode.id,
	          	label: this.treenode.label,
	          	children: []
	        }
	    	}
	      	
	    } 
	    treeis=true;
      console.log(dev_id);
      console.log(this.data);
      this.$emit('getdata', this.data);
         
    }
	}
};
  
</script>

<style type="text/css">
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
