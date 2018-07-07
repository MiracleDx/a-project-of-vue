<template>
    <div class="update">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="原始密码" prop="oldpass">
          <el-input type="password" v-model="ruleForm.oldpass" auto-complete="off"></el-input>
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
  export default {
    data() {
      var validateOldpass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原始密码'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPassword !== '') {
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
        ruleForm: {
          oldpass: '',
          password: '',
          checkPassword: '',
        },
        rules: {
          oldpass: [
            { validator: validateOldpass, trigger: 'blur' },
            { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' },
            { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
          ],
          checkPassword: [
            { validator: validatePass2, trigger: 'blur' },
            { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.put('/user/changePassword/', {
              oldPassword : this.ruleForm.oldpass,
              newPassword : this.ruleForm.password
            })
              .then(function (response) {
                if (response.data.code == '0') {
                  that.$message({
                    type: 'info',
                    message: response.data.message
                  });

                  that.$router.push('/login')
                  localStorage.removeItem('token');
                  localStorage.removeItem('username');
                  localStorage.removeItem('avatar');
                  localStorage.removeItem('mobile');
                  that.$store.commit('checkStatus');
                  that.$store.commit('changeLoginStatus', false);
                  that.$store.commit('clearStatus');

                  console.log(response.data);
                } else {
                  that.$message({
                    type: 'error',
                    message: response.data.message
                  })
                }
              }).catch(function (error) {
              console.log(error);
            });
          } else {
            this.$message({
              type: 'error',
              message: "更新个人信息失败"
            });
            return false;
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

  .update {
    margin-top: 50px;
    width: 500px;
  }
</style>
