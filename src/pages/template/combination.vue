<template>
  <div>
      <el-steps :active="active" simple>
        <el-step title="选择模板" icon="el-icon-edit"></el-step>
        <el-step title="填写设备信息" icon="el-icon-upload"></el-step>
        <el-step title="子设备信息" icon="el-icon-mobile-phone"></el-step>
      </el-steps>
      <component v-bind:is="currentView"></component>

      <div class="footer">
           <el-button type="primary" style="margin-top: 12px;" @click="next">下一步</el-button>
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
import mainTemplate "@/pages/template/combination";
export default {
  name:"combination",
  data(){
      return{
         currentView:"mainTemplate" 
      }
  },
  components: {
      mainTemplate
  }
}
</script>
