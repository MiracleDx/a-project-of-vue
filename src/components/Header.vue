<template>
  <el-header>
    <div id="left">
      <router-link to="/"><el-button type="info">主页</el-button></router-link>
      <el-button type="info">最新</el-button>
      <el-button type="info">最热</el-button>
      <el-input placeholder="请输入内容" v-model="inputsearch" clearable></el-input>
      <el-button icon="el-icon-search" circle></el-button>
    </div>
    <div id="right">
      <router-link v-show="!isLogin" to="/login"><el-button type="primary">登录</el-button></router-link>
      <router-link v-show="!isLogin" to="/register"><el-button type="primary">注册</el-button></router-link>
      <el-dropdown  trigger="click">
       <span v-show="isLogin" class="el-dropdown-link" style="color: #ffffff">
        {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
       </span>
            <el-dropdown-menu slot="dropdown" v-show="username !== '游客' ">
              <el-dropdown-item>补充信息</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>文章管理</el-dropdown-item>
              <el-dropdown-item>评论管理</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      <router-link v-show="isLogin" to="/"><el-button @click="logout" type="primary">退出登录</el-button></router-link>
    </div>
  </el-header>
</template>

<script>

export default {
  data () {
    return {
      isLogin: this.$store.state.isLogin,
      username: this.$store.state.user.username,
      inputsearch: ''
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('avatar');
      localStorage.removeItem('mobile');
      this.$store.commit('checkStatus');
      this.isLogin = this.$store.state.isLogin;
      this.$store.commit('changeLoginStatus', this.isLogin);
      this.$store.commit('clearStatus');
      location.reload();
    }
  },
  computed: {
    getLoginStatus() {
      return this.$store.state.isLogin;
    }
  },
  watch: {
    getLoginStatus(val) {
      this.isLogin = val;
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
