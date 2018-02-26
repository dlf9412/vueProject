<template>
  <div>
    <el-steps :active="active" simple>
      <el-step title="选择模板" icon="el-icon-edit"/>
      <el-step title="填写设备信息" icon="el-icon-upload"/>
      <el-step title="子设备信息" icon="el-icon-mobile-phone"/>
    </el-steps>
    <router-view/>
    <div style="clear: both">
      <el-button type="primary" style="margin-top: 12px;" @click="next">下一步</el-button>
      <el-button type="primary" style="margin-top: 12px;" @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "addequipment",
    data() {
      return {
        active: 1,
        addIndex: -1,
      }
    },
    methods: {
      next() {
        ++this.active;
        console.log(this.active);
        if (this.active === 2) {
          this.$router.push('/AddEquipment/EquipmentDetail');
        } else if (this.active === 3) {
          this.$router.push('/AddEquipment/AddChildEquipment');
        }
      },
      reset () {
        this.active = 1;
        this.$router.push('/AddEquipment/OptionalModule');
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-steps {
    margin: 20px 0;
  }
</style>
