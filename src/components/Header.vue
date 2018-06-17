<template>
  <el-header>
    <div id="left">
      <el-button type="info">最新</el-button>
      <el-button type="info">最热</el-button>
      <el-input placeholder="请输入内容" v-model="inputsearch" clearable></el-input>
      <el-button icon="el-icon-search" circle></el-button>
    </div>
    <div id="right">
      <router-link to="/login"><el-button type="primary">登录</el-button></router-link>
      <router-link to="/register"><el-button type="primary">注册</el-button></router-link>
      <el-dropdown  trigger="click">
       <span class="el-dropdown-link" style="color: #ffffff">
        登录用户<i class="el-icon-arrow-down el-icon--right"></i>
       </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>补充信息</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>文章管理</el-dropdown-item>
              <el-dropdown-item>评论管理</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      <router-link to="/logout"><el-button type="primary">退出登录</el-button></router-link>
    </div>
  </el-header>
</template>

<script>

export default {
  data () {
    return {
      inputsearch: ''
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
