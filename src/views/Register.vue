<template>
  <div class="form-table">
    <h1>Register</h1>
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input type="password" v-model="ruleForm.checkPassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>
<script>
  import { Message } from 'element-ui';

  export default {
    data() {
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('用户名不能为空'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkpassword !== '') {
            this.$refs.ruleForm.validateField('checkPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        labelPosition: 'right',
        ruleForm: {
          username: '',
          password: '',
          checkPassword: ''
        },
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' },
            { min: 5, max: 32, message: '长度在 5 到 32 个字符', trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' },
            { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
          ],
          checkPassword: [
            { validator: validatePass2, trigger: 'blur' },
            { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 500);

        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/register', {
              username: this.ruleForm.username,
              password: this.ruleForm.password
            })
              .then(function (response) {
                if (response.data.code == '0') {
                  that.$message({
                    type: 'success',
                    message: response.data.message
                  })
                  that.$router.push('/login')
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
          } else {
            //console.log('error submit!!');
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
