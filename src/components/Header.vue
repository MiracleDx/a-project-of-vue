<template>
  <el-header>
    <div id="left">
      <el-button type="info" @click="goBack">后退</el-button>
      <router-link to="/"><el-button type="info">主页</el-button></router-link>
      <el-button type="info" @click="goForward">前进</el-button>
      <el-input placeholder="请输入需要检索的内容" v-model="keyword" clearable></el-input>
      <el-button icon="el-icon-search" circle  @click="findBykeyword"></el-button>
    </div>
    <div id="right">
      <div v-if="!isLogin" >
        <router-link to="/login"><el-button type="primary">登录</el-button></router-link>
        <router-link to="/register"><el-button type="primary">注册</el-button></router-link>
      </div>
      <div v-else-if="isLogin">
        <el-dropdown trigger="click">
         <span class="el-dropdown-link" style="color: #ffffff">
            {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
         </span>
            <el-dropdown-menu slot="dropdown" v-show="username !== '游客' ">
              <router-link to="/infoManager"><el-dropdown-item>补充信息</el-dropdown-item></router-link>
              <router-link to="/updatePass"><el-dropdown-item>修改密码</el-dropdown-item></router-link>
              <router-link to="/blogManager"><el-dropdown-item>文章管理</el-dropdown-item></router-link>
              <router-link to="/commentManager"><el-dropdown-item>评论管理</el-dropdown-item></router-link>
            </el-dropdown-menu>
        </el-dropdown>
        <router-link to="/"><el-button @click="logout" type="primary">退出登录</el-button></router-link>
      </div>
    </div>
  </el-header>
</template>

<script>

export default {
  inject: ['reload'],
  data () {
    return {
      isLogin: this.$store.state.isLogin,
      username: this.$store.state.user.username,
      keyword: ''
    }
  },
  methods: {
    logout() {
      let that = this;
      this.$http.get('/authlogout', {
      })
        .then(function (response) {
          if (response.data.code == '0') {
            that.$message({
              type: 'success',
              message: response.data.message
            })
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('avatar');
            localStorage.removeItem('mobile');
            that.$store.commit('checkStatus');
            that.isLogin = that.$store.state.isLogin;
            that.$store.commit('changeLoginStatus', this.isLogin);
            that.$store.commit('clearStatus');
            that.reload();
            that.$router.push("/");
            //console.log(response);
          } else {
            that.$message({
              type: 'error',
              message: response.data.message
            })
          }
        })
        .catch(function (error) {
          //console.log(error);
        });
    },
    goBack() {
      this.$router.go(-1);
    },
    goForward() {
      this.$router.go(1);
    },
    findBykeyword() {
      if (this.$route.path !== '/') {
        this.$message({
          type: 'error',
          message: '当前页面不可以进行检索'
        })
      } else {
        let that = this;
        this.$http.get('/es/findByKeyword', {
          keyword : this.keyword
        })
        .then(function (response) {
          if (response.data.code == '0') {
            that.$message({
              type: 'success',
              message: response.data.message
            })
            that.$store.state.blogs = response.data.data;
            //console.log(response);
          } else {
            that.$message({
              type: 'error',
              message: response.data.message
            })
          }
        })
        .catch(function (error) {
          //console.log(error);
        });
      }
    },
    showMe() {
      this.showMyWechat = !this.showMyWechat;
    }
  },
  computed: {
    getLoginStatus() {
      return this.$store.state.isLogin;
    },
    getUsername() {
      return this.$store.state.user.username;
    }
  },
  watch: {
    getLoginStatus() {
      this.isLogin = this.$store.state.isLogin;
    },
    getUsername() {
      this.username = this.$store.state.user.username;
    }
  }
}
</script>

<style scoped>

  .el-header #left {
    float: left;
  }

  .el-header #left .el-input {
    width:200px;
    margin-left: 10px;
  }

  .el-header #right {
    float: right;
  }
</style>
