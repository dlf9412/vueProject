<template>
  <div>
      这是登录页面
      <button @click="login">登录</button>
      <el-button @click="detail">layout</el-button>
  </div>
</template>
<script>
export default {
    name:"Login",
    data(){
        return {
            msg:"login",
        }
    },
    methods: {
        login:function(){
            this.$router.push({ path:"/home"})
        },
        detail:function(){
            this.$router.push({ path:"/layout"})
        }
    }
}

</script>
