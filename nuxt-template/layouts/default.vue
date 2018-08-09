<template>
  <div>
    <el-container>
      <el-header class="font-gray">Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>  <nuxt/> </el-main>
      </el-container>
    </el-container>
    
  </div>
</template>


<script>
import url from '~/static/index'
import '~/assets/style/common.less'

export default {
  data() {
    return {
      url: url,
    }
  }
}
</script>


<style>
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 100%;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    height: 100%;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
