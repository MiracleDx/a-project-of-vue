<template>
  <div class="form-table">
    <h1>Login</h1>
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input  type="password" v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
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
  },
  methods: {
    onSubmit() {
      const loading = this.$loading({
        lock: true,
       // text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 1)'
      });
      setTimeout(() => {
        loading.close();
      }, 3000);

      let that = this;
      this.$http.post('/authlogin', {
          username: this.formLabelAlign.username,
          password: this.formLabelAlign.password
      })
        .then(function (response) {
          if (response.data.code == '0') {
            localStorage.setItem("token",response.data.data);
            that.$http.get('/user/getUserInfo')
              .then(function (response) {
                if (response.data.code == '0') {
                  that.$store.commit('getUserInfo', response.data.data);
                  that.$store.commit('checkStatus');
                  location.reload();
                }
                console.log(response);
            })
              .catch(function (error) {
                console.log(error);
              });
            that.$router.push("/");
          } else {
            that.$message({
              type: 'error',
              message:response.data.message
            });
          }
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
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
