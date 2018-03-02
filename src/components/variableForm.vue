<template>
  <div>
    <el-form :model="model" ref="variableForm" label-position="right" formLabelAlign="left">
      <el-row>
        <template v-for="(item, index) in formData">
          <el-col :span="12">
            <el-form-item :label="`${item.description}：`">
              <template v-if="item.entitytype === 11 && item.name.indexOf('aii') === -1 && item.name.indexOf('dio') === -1">
                <div class="text">{{item.assertname}}</div>
              </template>
              <template v-else>
                <span class="description">{{item.description}}</span>
                <el-input v-model="model[item.name]" :disabled="disabled"/>
                <el-button @click="onClick(item, item.name)">{{buttonName}}</el-button>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import { Form, FormItem, Col, Row, Button, Notification } from 'element-ui';
  import Vue from 'vue';
  import { sendDataPoint } from '../framework/network/test';


  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Col);
  Vue.use(Row);
  Vue.use(Button);

  export default {
    name: "detail",
    data() {
      return {}
    },
    props: {
      formData: {
        type: Array,
        default () {
          return [];
        }
      },
      model: {
        type: Object,
        default () {
          return {};
        }
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      buttonName: {
        type: String,
        default: "发送",
      }
    },
    methods: {
      onClick(item, modelName) {
        console.log(this.$refs.variableForm.model[modelName]);
        if (this.$refs.variableForm.model[modelName] !== '') {
          sendDataPoint({ entitykey: item.entitykey, key: this.$refs.variableForm.model[modelName] })
            .then(res=>{
              if (res) {
                Notification({
                  title: res && res.state,
                  message: `这是一条${res.state}的提示消息`,
                  type: 'success'
                });
              }
            });
        }
      }
    }
  }
</script>

<style lang="less">
  .el-form-item {
    margin-bottom: 22px;
    text-align: start;
  }

  .el-form-item__label {
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 15%;
  }

  .description {
    color: #bfcbd9;
    width: 15%;
    float: left;
  }

  .el-form-item__content .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 30%;
  }
</style>
