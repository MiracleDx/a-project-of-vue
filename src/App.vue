<template>
    <div :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <el-container>
          <!--头部-->
          <el-header>
            <Header></Header>
          </el-header>

          <el-container>
            <el-aside v-show="isLogin">
              <Persional></Persional>
            </el-aside>
            <el-main>
               <router-view v-if="isRouterAlive"></router-view>
            </el-main>
          </el-container>

          <!--脚部-->
         <!-- <el-footer>
            <Footer></Footer>
          </el-footer>-->

          <Footer class="myFoot"></Footer>
        </el-container>
    </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Persional from './components/Persional.vue'

export default {
  provide() {
    return {
      reload: this.reload
    }
  },
  components: {Header, Footer, Persional},
  data() {
    return {
      isLogin: this.$store.state.isLogin,
      isRouterAlive: true
    }
  },
  computed: {
    getLoginStatus() {
      return this.$store.state.isLogin;
    }
  },
  watch: {
    getLoginStatus() {
      this.isLogin = this.$store.state.isLogin;
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  }
}

console.log("我还是喜欢着你.");
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
    /*background-color: #66CCFF;*/
    text-align: right;
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


  a {
    text-decoration: none;
  }

  .tag {
    height: 30px;
    line-height: 30px;
    margin: 0 10px;
  }

  .myFoot {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .live-scrollbar {
    height: 100%;
  }
</style>
