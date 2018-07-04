<template>
  <div id="info">

    <div id="app">
      <el-upload class="avatar-uploader"
                 :action="action"
                 :headers="headers"
                 :show-file-list="false"
                 :on-success="handleAvatarSuccess"
                 :before-upload="beforeAvatarUpload"
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
    data() {
      var checkMobile = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value != 11) {
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
          if (this.ruleForm.nickname !== '') {
            this.$refs.ruleForm.validateField('nickname');
          }
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
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
