<template>
  <div class="detail" v-show="this.blog.id">

    <div id="title">
      <div id="left">
        <div>
          <img :src="user.avatar" style="width: 100px">
        </div>
        <div id="center">
          <span v-text="blog.title" style="font-size: 25px"></span>
          <br>
          <span v-text="user.nickname ? user.nickname : user.username"></span>
          <span v-show="blog.createTime">发表于:</span>
          <span v-text="$options.filters.formatDate(blog.createTime)" style="color: red"></span>
        </div>
      </div>
      <div class="bottom" v-show="show">
        <el-button type="danger" @click="goUpdate" class="button">编辑</el-button>
        <el-button type="danger" @click="goDelete" class="button">删除</el-button>
      </div>
    </div>

    <div class="split"></div>

    <div id="content">
      <p v-html="blog.content"></p>
    </div>

    <div class="split"></div>

    <div id="category">
      <span>标签:</span>
      <el-tag class="tag" v-for="o in cardData" :key="o.value" type="info">{{ o.message }}</el-tag>
    </div>

    <div class="bottom">
      <el-button type="danger" @click="isLike = !isLike" class="button">{{ zan }}</el-button>
    </div>

    <br>
    <br>


    <div v-if="commentShow">
      <span>想对作者说点什么？</span><el-button type="primary" @click="showEditor">我来说一句</el-button>
    </div>
    <div v-else>
      <div id="commentEditor">
        <span>评论:</span>
        <div class="edit_container">
          <quill-editor v-model="commentCentent"
                        ref="myQuillEditor"
                        class="editer"
                        @ready="onEditorReady($event)">
          </quill-editor>
        </div>
        <div style="text-align: center">
          <el-button type="primary" @click="onSubmit" class="button">发表评论</el-button>
        </div>
      </div>
    </div>

    <br>
    <br>

    <div id="commentDetail" v-for="(i, index) in comment">
      <div id="commentLeft">
        <img :src="i.avatar" style="width: 50px">
        <div id="commentRight">
          <span v-text="i.nickname ? i.nickname : i.username"></span>&nbsp;
          <span>{{ index + 1 }}楼</span>&nbsp;
          <span v-text="$options.filters.formatDate(i.createTime)" style="color: red"></span>&nbsp;
          <i class="el-icon-delete" style="color: blue"></i>
          <br/>
          <span v-html="i.content"></span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor' //调用编辑器
  import {formatDate} from '../utils/date.js';

    export default {
      name: "BlogDetail",
      inject: ['reload'],
      data () {
        return {
          user: '',
          blog: {},
          comment: [],
          cardData: [
            {
              message: '第一篇文章'
            },
            {
              message: '第二篇文章'
            }
          ],
          commentCentent: '',
          isLike: true,
          show: false,
          commentShow: true
        }
      },
      methods: {
        onEditorReady(editor) {
        },
        goUpdate() {
          this.$router.push({name: "blogEditor", params: {blog: this.blog}});
        },
        goDelete() {
          let that = this;
          this.$http.delete('/blog/delete/' + this.blog.id, {})
            .then(function (response) {
            if (response.data.code == '0') {
              that.$message({
                type: 'info',
                message: response.data.message
              });
              setTimeout(() => {
                that.$router.go(-1);
              }, 500);

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
        },
        showEditor () {
            return this.commentShow = false;
        },
        onSubmit() {
          let that = this;
          this.$http.post('/comment/save/', {
            blogId: this.blog.id,
            content: this.commentCentent
          }).then(function (response) {
            if (response.data.code == '0') {
              console.log(response.data.data);
              that.$message({
                type: 'info',
                message: response.data.message
              })
              that.reload();
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
        }
      },
      computed: {
        editor() {
          return this.$refs.myQuillEditor.quill
        },
        zan() {
          if (this.isLike) {
            return "点赞";
          }  else {
            return "取消点赞";
          }
        },
        showEdiort() {
          return false;
        }
      },
      mounted() {
        let that = this;
        var id = that.$route.params.id;

        if (id != '' && id != undefined) {
          const loading = this.$loading({
            lock: true,
            // text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });

          this.$http.get('/blog/findOne/' + id, {}).then(function (response) {
            setTimeout(() => {
              loading.close();
            }, 200);
            if (response.data.code == '0') {
              that.blog = response.data.data.blog;
              that.user = response.data.data.user;
              if ((that.user.nickname ? that.user.nickname : that.user.username) === localStorage.getItem('username')) {
                that.show = true;
              }
              console.log(response.data.data);
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
            loading.close();
            console.log(error);
          });

          this.$http.get('/comment/findAllByBlogId/' + id, {}).then(function (response) {
            setTimeout(() => {
              loading.close();
            }, 200);
            if (response.data.code == '0') {
              that.comment = response.data.data;
              console.log(response.data);
            } else {
              that.$message({
                type: 'error',
                message: response.data.message
              })
            }
          }).catch(function (error) {
            loading.close();
            console.log(error);
          });
        } else {
          this.$message({
            type: 'warning',
            message: '请重新选择要查看的文章'
          })
          that.$router.go(-1);
        }
      },
      components: {
        //使用编辑器
        quillEditor
      },
      filters: {
        formatDate(time) {
          var date = new Date(time);
          return formatDate(date, "yyyy-MM-dd hh:mm");
        }
      }
    }
</script>

<style scoped>

  .detail {
    width: 75%;
    margin: 0 auto;
    border: 1px solid #5daf34;
  }

  .detail #title {
    height: 135px;
  }

  .detail #title #left {
    margin: 20px;
  }

  .detail #title img {
    float: left;
    border-radius: 100%;
  }

  .detail #title #center {
    float: left;
    margin: 20px;
  }

  .detail #title .bottom {
    float: right;
    margin: 100px 20px;
  }

  .detail .bottom {
    float: right;
    margin: 0px 20px;
  }

  .detail .split {
    margin: 10px auto;
    width: 75%;
    border-bottom: 1px dashed #3a8ee6;
    border-width: thin;
  }

  .detail #category {
    text-align: left;
    margin: 5px 10px;
  }

  .detail #commentEditor {
    text-align: left;
    margin: 5px 10px;
  }

  .detail  #commentDetail {
    height: 100px;
    margin: 10px 10px;
  }

  .detail #commentDetail #commentLeft img {
    float: left;
    border-radius: 100%;

  }

  .detail #commentDetail #commentLeft #commentRight {
    text-align: left;
    margin: 2px 75px;
  }

  .edit_container {
    width: 90%;
    margin: 10px 20px;
  }

</style>
