<template>
  <div>
    <el-row class="warp">
      <!--
      Form 组件提供了表单验证的功能，只需要通过 rule 属性传入约定的验证规则，并 Form-Item 的 prop 属性设置为需校验的字段名即可。
      -->
      <el-col :span="24" class="warp-main">
        <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="120px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="infoForm.title"></el-input>
          </el-form-item>

          <el-form-item label="描述" prop="description">
            <el-input v-model="infoForm.description"></el-input>
          </el-form-item>
          <!--使用编辑器
          -->
          <el-form-item label="详细">
            <div class="edit_container">
              <quill-editor v-model="infoForm.content"
                            ref="myQuillEditor"
                            class="editer"
                             @ready="onEditorReady($event)">
              </quill-editor>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>


    </el-row>
  </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor' //调用编辑器


  export default {
    data() {
      return {
        infoForm: {
          id: '',
          title: '',
          description: '',
          content:''
        },
        //表单验证
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入详细内容', trigger: 'blur'}
          ]
        },
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
      //初始化
    },
    methods: {
      onEditorReady(editor) {
      },
      onSubmit() {
        let that = this;
        //提交
        //this.$refs.infoForm.validate，这是表单验证
        this.$refs.infoForm.validate((valid) => {
          if(valid) {
            if (this.id !== '') {
              this.$http.post('/blog/save', {
                title: this.infoForm.title,
                description: this.infoForm.description,
                content: this.infoForm.content,
                category: ''
              }).then(function (response) {
                if (response.data.code == '0') {
                  that.infoForm.id = response.data.data.id;
                  that.infoForm.title = response.data.data.title;
                  that.infoForm.description = response.data.data.description;
                  that.infoForm.content = response.data.data.description;
                  that.$message({
                    type: 'info',
                    message: response.data.message
                  })
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
              // upload
            }
          }
        });
      }
    },
    components: {
//使用编辑器
      quillEditor
    }
  }
</script>

<style scoped>

 .warp {
   z-index: 999;
 }
</style>
