<template>
  <div>
       <div class="boxItem">
                          <span class="el-icon-printer"></span>
                          <div class="box">
                              <p>{{label}}</p>
                              <div v-for="child in childrenNote">
                                  <div>{{child.label}}</div>
                                  
                              </div>
                          </div>
        </div>
  </div>
</template>
<script>
export default {
    props:{
        label:String,
        childrenNote:Array
    },
    data(){
        return{}
    },
    
  
}
</script>
<style scoped lang="less">
@fontInitColor:black;

                    .boxItem{
                        box-sizing: border-box;
                        width: 100%;
                        border: 1px solid rgb(238, 234, 234);
                        box-shadow: 0 0 5px rgb(235, 233, 233);
                        border-radius: 3px;
                        overflow: hidden;
                        padding: 10px;
                        padding-left: 30px;
                        text-align: left;
                        span{
                            float: left;
                            color: rgb(240, 240, 247);
                            margin-top: 5px;
                            margin-right: 10px;
                            padding: 5px;
                            border: 1px solid rgb(69, 176, 238);
                            border-radius: 100%;
                            background: rgb(69, 176, 238);
                        }
                        .box{
                            float: left;
                            p{
                                font-weight: bold;
                                line-height: 1.5rem;
                                font-size: 0.9rem;
                            }
                            div{
                                font-size: 0.9rem;
                                line-height: 1.4rem;
                                color: rgb(148, 147, 147)
                            }
                        }
                  }
 .boxItem:hover{
    background: rgb(188, 218, 245);
}
                
</style>

