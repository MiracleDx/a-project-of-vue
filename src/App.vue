<template>
  <el-container>
    <!--头部-->
    <el-header>
      <Header></Header>
    </el-header>

    <el-container>
      <el-aside>
        <Persional></Persional>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

    <!--脚部-->
    <el-footer>
      <Footer></Footer>
    </el-footer>

  </el-container>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Persional from './components/Persional.vue'

export default {
  components: { Header, Footer, Persional },
  data () {
    return {
    }
  }
}
</script>

<style>

  body {
    margin: 1px;
  }

  body > .el-container {
    margin: 0px;
  }


  .el-header {
    background-color: #66CCFF;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: #FFF;
    text-align: center;
    margin: 0px;
  }

  .el-aside {
    margin: 20px;
    text-align: left;
  }

  .el-footer {
    background-color: #66CCFF;
    text-align: center;
    line-height: 60px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix span{
    float: left;
  }

  .clearfix:before, .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    margin-bottom: 10px;
  }

  .el-footer {
    background-color: #66CCFF;
    text-align: center;
    line-height: 60px;
  }

  a {
    text-decoration: none;
  }
</style>
