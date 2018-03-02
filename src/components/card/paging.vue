<template>
  <div>
      <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="pageSizes"
                            :page-size="1"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total=total>
       </el-pagination>
  </div>
</template>
<script>
export default {
    props:{
        pageSizes:Array,
        total:Number,
        currentPage:Number

    },
    data(){
        return{

        }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    }
  
}
</script>
