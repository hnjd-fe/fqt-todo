<template>
<el-container style="height: 500px; border: 1px solid #eee">
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
    <el-link :href="packInfo.homepage" target="_blank">
    <span>{{packInfo.name}}</span>
    </el-link>
    <el-link href="./index.html" target="_blank">
        <i class="el-icon-setting" style="padding: 0 20px;"></i>
    </el-link>
    </el-header>
    
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
      </el-table>
    </el-main>

  </el-container>
</el-container>
</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    props: [ "packInfo" ],
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
      };
      return {
        //tableData: Array(20).fill(item)
        tableData: []
      }
    }
  };
</script>

