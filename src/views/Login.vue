<template>
  <div class="form-table">
    <h1>Login</h1>
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">登录</el-button>
        <router-link to="/"><el-button type="primary">返回</el-button></router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        username: '',
        password: ''
      }
    }
  }
}
</script>

<style scoped>
  .form-table {
    text-align: left;
    width: 30%;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #c975e6;
    border-radius: 20px;
  }

  .form-table h1 {
    text-align: center;
  }

  .form-table input {
    width: 300px;
  }

  .form-table el-button {
    text-align: center;
  }

  .form-table .el-form-item label {
    text-align: left;
  }
</style>
