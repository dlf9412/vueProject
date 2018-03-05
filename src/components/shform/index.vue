<template>
  <el-form ref="form" :model="sizeForm" label-width="10%">
    <template v-if="formData.length !== 0">
      <template v-for="item in formData">
        <el-form-item v-if="item.serial === 'switch'" :label="`${item.description}：`">
          <el-switch v-model="sizeForm[item.serial]" active-color="#13ce66"/>
        </el-form-item>
        <el-form-item v-else :label="`${item.description}：`">
          <el-input v-model="sizeForm[item.serial]" />
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="submitForm(sizeForm)">立即创建</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </template>
    <p v-else>暂无数据</p>
  </el-form>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        sizeForm: {},
        formData: []
      }
    },
    beforeCreate() {
      console.log('beforeCreate');
    },
    created() {
      const loading = this.$loading({
        lock: true
      });
      setTimeout(() => {
        this.formData = [
          {
            "entitykey": 10011,
            "serial": "hostName",
            "name": "Root.Device1.HostName",
            "assertname": "主机名",
            "description": "主机名",
            "address": "",
            "parentid": 1001,
            "system": 0,
            "location": 0,
            "region": 0,
            "entitytype": 11,
            "alarmupdate": false,
            "agentkey": 1,
            "deleted": false,
            "displayorder": 1,
            "inhibit": false,
            "lastoperatorid": 0,
            "lastoperatortime": "2018-01-23 1124:59:48",
            "childcount": 0
          },
          {
            "entitykey": 10012,
            "serial": "ipaddress",
            "name": "Root.Device1.ip",
            "assertname": "Ip地址",
            "description": "IpAddress",
            "address": "",
            "parentid": 1001,
            "system": 0,
            "location": 0,
            "region": 0,
            "entitytype": 11,
            "alarmupdate": false,
            "agentkey": 1,
            "deleted": false,
            "displayorder": 1,
            "inhibit": false,
            "lastoperatorid": 0,
            "lastoperatortime": "2018-01-23 1124:59:48",
            "childcount": 0
          },
          {
            "entitykey": 10013,
            "serial": "devicetype",
            "name": "Root.Device1.Type",
            "assertname": "设备类型",
            "description": "设备类型",
            "address": "",
            "parentid": 1001,
            "system": 0,
            "location": 0,
            "region": 0,
            "entitytype": 11,
            "alarmupdate": false,
            "agentkey": 1,
            "deleted": false,
            "displayorder": 1,
            "inhibit": false,
            "lastoperatorid": 0,
            "lastoperatortime": "2018-01-23 1124:59:48",
            "childcount": 0
          },
          {
            "entitykey": 10014,
            "serial": "flagRefresh",
            "name": "Root.Device1.flagRefresh",
            "assertname": "状态刷新标记",
            "description": "状态刷新标记",
            "address": "",
            "parentid": 1001,
            "system": 0,
            "location": 0,
            "region": 0,
            "entitytype": 11,
            "alarmupdate": false,
            "agentkey": 1,
            "deleted": false,
            "displayorder": 1,
            "inhibit": false,
            "lastoperatorid": 0,
            "lastoperatortime": "2018-01-23 1124:59:48",
            "childcount": 0
          },
          {
            "entitykey": 10015,
            "serial": "linkCut",
            "name": "Root.Device1.linkCut",
            "assertname": "连接",
            "description": "是否连接",
            "address": "",
            "parentid": 1001,
            "system": 0,
            "location": 0,
            "region": 0,
            "entitytype": 11,
            "alarmupdate": false,
            "agentkey": 1,
            "deleted": false,
            "displayorder": 1,
            "inhibit": false,
            "lastoperatorid": 0,
            "lastoperatortime": "2018-01-23 1124:59:48",
            "childcount": 0
          },
          {
            "entitykey": 1001001,
            "serial": "rtNode1",
            "name": "Root.Device1.RtNode1",
            "assertname": "传感器1",
            "description": "主机1传感器1",
            "address": "",
            "parentid": 1001,
            "system": 0,
            "location": 0,
            "region": 0,
            "entitytype": 12,
            "alarmupdate": false,
            "agentkey": 1,
            "deleted": false,
            "displayorder": 1,
            "inhibit": false,
            "lastoperatorid": 0,
            "lastoperatortime": "2018-01-23 1124:59:48",
            "childcount": 10,
          },
          {
            "entitykey": 1001002,
            "serial": "rtNode2",
            "name": "Root.Device1.RtNode2",
            "assertname": "传感器2",
            "description": "主机1传感器2",
            "address": "",
            "parentid": 1001,
            "system": 0,
            "location": 0,
            "region": 0,
            "entitytype": 12,
            "alarmupdate": false,
            "agentkey": 1,
            "deleted": false,
            "displayorder": 1,
            "inhibit": false,
            "lastoperatorid": 0,
            "lastoperatortime": "2018-01-24 0124:56:20",
            "childcount": 10,
          },
          {
            "entitykey": 10055,
            "serial": "switch",
            "name": "Root.Device1.switch",
            "assertname": "开关",
            "description": "开关",
            "address": "",
            "parentid": 1001,
            "system": 0,
            "location": 0,
            "region": 0,
            "entitytype": 11,
            "alarmupdate": false,
            "agentkey": 1,
            "deleted": false,
            "displayorder": 1,
            "inhibit": false,
            "lastoperatorid": 0,
            "lastoperatortime": "2018-01-23 1124:59:48",
            "childcount": 0
          },
        ];
        let newSizeForm = {};
        this.formData.forEach(item => {
          newSizeForm[item.serial] = item.assertname;
        });
        this.sizeForm = newSizeForm;
        loading.close();
      }, 0);
    },
    mounted() {
      console.log('mounted' + this.formData)
    },
    beforeUpdate() {
      console.log('beforeUpdate');
    },
    updated() {
      console.log('updated');
    },
    watch: {
      formData(val) {
        if (val) {
          console.log('watch:' + val);
          return val
        }
      },
      sizeForm(val) {
        return val;
      }
    },
    methods: {
      submitForm(sizeForm) {
        let newSizeForm = {};
        this.formData.forEach(item => {
          newSizeForm[item.serial] = `${item.description}${Math.floor(Math.random() * 10)}`;
        });
        this.sizeForm = newSizeForm;
        console.log(sizeForm);
      },
      resetForm() {
        this.sizeForm = {};
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
