<style lang="less">
  .el-collapse-item {
    text-align: left;
}
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
  .button {
    text-align: right;
    padding: 10px;
  }


.equipment_map {
  width: 560px;
  height: 260px;
}
.BMap_cpyCtrl.BMap_noprint.anchorBL,.anchorBL{ display: none;}
.el-steps{ margin: 20px 0;}
.left{ text-align: left;}


 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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
  .equipment_form{ text-align: left; width: 680px; margin:  auto;}
/*  .equipment_form .el-input{ width: 50%;}*/
  .equipment_form .el-button{ margin-left: 8px;}
  .equipment_form .attrs{ width: 110px; margin-right: 10px;}
  .additem .el-form-item:nth-child(1){ float: left; z-index: 2;}
  .attr_conts {  float: left; }
  .attr_conts .el-input{ width: 466px;}
  .attr_conts .el-button--default{ width: 80px;}
  .attr_conts .el-form-item__error{ left: 2px; top: 40px;}
  .add_attr_cont_butt{ clear: both;}

</style>

<template>

<div>

	<el-form ref="form" :model="form" label-width="120px" class="equipment_form">
	  <el-form-item label="主机名" prop="HostName" :rules="{required: true, message: '主机名不能为空', trigger: 'blur'}">
	    <el-input v-model="form.HostName"></el-input>
	  </el-form-item>
	  <el-form-item label="Ip地址" prop="ip" :rules="{required: true, message: 'Ip地址不能为空', trigger: 'blur'}">
	    <el-input v-model="form.ip"></el-input>
	  </el-form-item>
	  <el-form-item label="设备类型" prop="Type" :rules="{required: true, message: '设备类型不能为空', trigger: 'blur'}">
	    <el-input v-model="form.Type"></el-input>
	  </el-form-item>

	  <el-form-item label="设备位置">
	    <!--百度地图组件-->
  		<baidu-map class="equipment_map" :scroll-wheel-zoom="true" :center="form.center" :zoom="form.zoom" @click="clickMap">
        <bm-marker :position="{lng: form.ico_location.lng, lat: form.ico_location.lat}" :dragging="true" @dragend="clickMap"></bm-marker>
	    </baidu-map>
	  </el-form-item>

	  <el-form-item label="设备图片">
	  	<el-upload
			  action="https://jsonplaceholder.typicode.com/posts/"
			  list-type="picture-card"
			  :on-success="backs"
			  :on-remove="handleRemove">
			  <i class="el-icon-plus"></i>
			</el-upload>
			<el-dialog :visible.sync="form.dialogVisible">
			  <img width="100%" :src="form.dialogImageUrl" alt="">
			</el-dialog>
	  </el-form-item>



	  <div class="additem" v-for="(domain, index) in form.domains">
	   <el-form-item
		  class="attr_cont"
		  label-width="0px"
	    :prop="'domains.' + index + '.keys'"
	    :rules="{required: true, message: '新增'+index+'属性名不能为空', trigger: 'blur'}"
	  	>
	  		<el-input v-model="domain.keys" class="attrs"></el-input>
	 		</el-form-item>

			<el-form-item
		  class="attr_cont attr_conts"
		  label-width="0px"
	    :prop="'domains.' + index + '.value'"
	    :rules="{required: true, message: '新增'+index+'属性值不能为空', trigger: 'blur'}"
	  	>
	  		<el-input v-model="domain.value"></el-input>
	  		<el-button @click.prevent="removeDomain(domain)">删除</el-button>
  	</el-form-item>

  	</div>


	  <el-form-item class="add_attr_cont_butt">
	    <el-button type="primary" @click="addDomain">新增属性</el-button>
	  </el-form-item>

	  <!--<el-form-item>
	    <el-button type="primary" @click="onSubmit('form')">下一步</el-button>
	    <el-button>取消</el-button>
	  </el-form-item>-->


	</el-form>
</div>

</template>

<script>
  import Vue from 'vue';
  // import { Button, Col, Row, Notification, MessageBox, Collapse, CollapseItem,steps,step,upload,dialog } from 'element-ui';
  import BaiduMap from 'vue-baidu-map'

	Vue.use(BaiduMap, {
	  ak: '8c3e3a75d8742ead58b80b92fd635977'
	})
  // Vue.use(Button);
  // Vue.use(Col);
  // Vue.use(Row);
  // Vue.use(Collapse);
  // // Vue.use(CollapseItem);
  // Vue.use(steps);
  // Vue.use(step);
  // Vue.use(upload);
  // Vue.use(dialog);


  export default {

    data() {
      return {
        form: {
          HostName: '',
          ip: '',
          Type: '',
          locations: '',
          img: '',
          domains: [{
          	keys: '',
            value: ''
          }],
          ico_location: {
		        lng: 118.070002,
		        lat: 24.599196
		      },
		      center: {
		        lng: 118.070002,
		        lat: 24.599196
		      },
		      zoom: 15,
		      active: 2,
		      dialogImageUrl: '',
	        dialogVisible: false
        }

      }
    },
    methods: {
	    clickMap (e) {
	    	//点击地图更新标注位置
	      this.form.ico_location.lng = e.point.lng
	      this.form.ico_location.lat = e.point.lat

	    },
      onSubmit(formName) {
      	//验证并提交表单
      	console.log(this.form.domains)
        if (this.form.active++ > 2) this.form.active = 0;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      backs(file) {
      	console.log(file)

      },
      removeDomain(item) {
      	//删除新增的属性
        var index = this.form.domains.indexOf(item)
        if (index !== -1) {
          this.form.domains.splice(index, 1)
        }
      },
      addDomain() {
      	//新增属性
        this.form.domains.push({
          value: '',
          keys: ''
        });
      }
    },
    mounted(){



    }

  }




</script>

