<template>
  <div id="info">

    <div id="app">
      <el-upload class="avatar-uploader"
                 :action="action"
                 :headers="headers"
                 :show-file-list="false"
                 :on-success="handleAvatarSuccess"
                 :before-upload="beforeAvatarUpload"
                 :on-error="handleAvatarError"
                 :limit="1">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span style="float: left; color: red">点击上传头像</span>
    </div>

    <div class="form-table">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="昵称" prop="nickname">
          <el-input type="nickname" v-model="ruleForm.nickname" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="mobile">
          <el-input v-model.number="ruleForm.mobile"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    data() {
      var checkMobile = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value.toString().length !== 11) {
              callback(new Error('请输入完整的手机号'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validateNickname  = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入昵称'));
        } else {
          callback();
        }
      };

      return {
        headers: {},
        action: "http://127.0.0.1:8180/user/avatarUpload",
        imageUrl: '',
        ruleForm: {
          mobile: '',
          nickname: ''
        },
        rules: {
          nickname: [
            { validator: validateNickname, trigger: 'blur' }
          ],
          mobile: [
            { validator: checkMobile, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.put('/user/update/', {
              nickname : that.ruleForm.nickname,
              mobile : that.ruleForm.mobile,
            })
              .then(function (response) {
                if (response.data.code == '0') {
                  localStorage.setItem('username', response.data.data.nickname);
                  localStorage.setItem('mobile', response.data.data.mobile);
                  that.$store.commit('refresh');
                  that.$message({
                    type: 'info',
                    message: response.data.message
                  });
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
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        if (res.code == '0') {
          localStorage.setItem('avatar', res.data);
          this.$store.commit('refresh');
          this.$message({
            type: 'info',
            message: res.message
          });
        } else {
          this.$message({
            type: 'error',
            message: res.message
          });
        }
      },
      handleAvatarError(res) {
        if (res.status === 401) {
          this.$message({
            type: 'error',
            message:'登录失效，请重新登录'
          });
        } else if (res.status === 403) {
          this.$message({
            type: 'error',
            message:'没有访问权限'
          });
        } else {
          this.$message({
            type: 'error',
            message:'系统错误，请联系管理员'
          });
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    created: function() {
      const token = localStorage.getItem('token');
      this.headers = {
        'Authorization' : 'yangxl ' + token
      }
    }
  }
</script>

<style scoped>


  #app {
    margin-left: 100px;
  }

   #app .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 178px;
    height: 178px;
  }

   #app .avatar-uploader:hover {
    border-color: #409EFF;
  }

   #app .avatar-uploader .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .form-table {
    margin-top: 30px;
    width: 500px;
  }

</style>
