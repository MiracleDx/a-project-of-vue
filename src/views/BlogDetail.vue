<template>
  <div class="detail" v-show="this.blog.id">

    <div id="title">
      <div id="left">
        <div>
          <img :src="user.avatar" style="width: 100px; float: left">
        </div>
        <div id="center">
          <span v-text="blog.title" style="font-size: 25px"></span>
          <br>
          <span v-text="selectUsername(user)"></span>
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
      <el-button type="danger" @click="changeStatus" class="button">{{ showZanStatus }}</el-button>
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
          <el-button type="primary" @click="showEditor">不想说了</el-button>
        </div>
      </div>
    </div>

    <br>
    <br>

    <div id="commentDetail" v-for="i in comment">
      <div id="commentLeft">
        <img :src="i.avatar" style="width: 50px; float: left">
        <div id="commentRight">
          <span v-text="selectUsername(i)"></span>&nbsp;
          <span>{{ i.floor }}楼</span>&nbsp;
          <span v-text="$options.filters.formatDate(i.createTime)" style="color: red"></span>&nbsp;
          <i class="el-icon-delete" @click="deleteComment(i)" style="color: blue"></i>
          <br/>
          <span v-html="i.content"></span>
          <el-tooltip content="单击查看评论，中键回复" placement="top">
            <span @click.left="showMyComment(i)" @click.middle="showInput(i)" style="color: #66ccff; float: right; font-size: 5px;">我也想说一句{{ showCount(i.children) }}</span>
          </el-tooltip>
          <br><br><br><br>
          <div id="children" style="margin: 0px; padding: 0px;">
            <ul v-show="i.isDisplay" style="text-align: left; margin-left: 30%; display: block" v-for="c in i.children">
              <li>{{ selectUsername(c) }} : <span v-show="c.replyUsername">回复 {{ c.replyNickname ? c.replyNickname : c.replyUsername }} :</span>
                {{ c.content }}
                <span class="el-icon-delete" @click="deleteComment(c)" style="color: #66ccff; float: right; font-size: 5px;"></span>
              </li>
              <li style="font-size: 5px; text-align: right; color: red">{{ c.createTime | formatDate }}
                <el-tooltip content="单击就可以回复咯" placement="top">
                  <span @click="showInput(i)" style="color: #66ccff">&nbsp;回复ta</span>
                </el-tooltip>
              </li>
              <li style="color: #8cc5ff">-----</li>
            </ul>
          </div>
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
          commentShow: true,
          input: '',
          index: ''
        }
      },
      methods: {
        onEditorReady(editor) {

        },
        goUpdate() {
          this.$confirm('该操作将修改此文章, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.$router.push({name: "blogEditor", params: {blog: this.blog}});
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消该操作'
            });
          });

        },
        goDelete() {
          let that = this;

          this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
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
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        showEditor () {
            return this.commentShow = !this.commentShow;
        },
        onSubmit() {
          const loading = this.$loading({
            lock: true,
            // text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 1)'
          });
          setTimeout(() => {
            loading.close();
          }, 500);

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
        },
        selectUsername(val) {
          return val.nickname ? val.nickname : val.username;
        },
        showInput(val) {
          let that = this;

          this.$prompt('请输入要回复的内容', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            // inputErrorMessage: '邮箱格式不正确'
          }).then(({ value }) => {

            this.$http.post('/comment/save/', {
              blogId: this.blog.id,
              content: value,
              pid: val.id,
              replyUserId: val.createUser
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
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
        },
        showCount(val) {
          if (val.length > 0) {
            return '(' + val.length + ')';
          }
        },
        deleteComment(val) {
          let that = this;

          this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.$http.delete('/comment/deleteByCommentId/' + val.id, {})
              .then(function (response) {
                if (response.data.code == '0') {
                  that.$message({
                    type: 'info',
                    message: response.data.message
                  });
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
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        showMyComment(val) {
          return val.isDisplay = !val.isDisplay;
        },
        pushProp(val) {
          this.$set(val, 'isDisplay', false);
        },
        changeStatus() {
          let that = this;
          if (this.showZan) {
            this.$http.get('/total/addStatus/' + this.blog.id, {})
              .then(function (response) {
                if (response.data.code == '0') {
                  that.blog.isLike = 0;
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
            this.$http.get('/total/cancelStatus/' + this.blog.id, {})
              .then(function (response) {
                if (response.data.code == '0') {
                  that.blog.isLike = 1;
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
          }
        }
      },
      computed: {
        editor() {
          return this.$refs.myQuillEditor.quill
        },
        showZanStatus() {
         return this.blog.isLike == 0 ? "点赞" : "取消点赞";
        }
      },
      created: function() {
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
              for (let i = 0; i < that.comment.length; i ++) {
                  that.pushProp(that.comment[i]);
                }
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
      },
      watch: {
        showZanStatus(val) {
          return this.blog.isLike = val;
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
    border-radius: 100%;
  }

  .detail #title #center {
    float: left;
    margin: 20px;
  }

  .detail #title .bottom {
    /*float: right;*/
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

  .detail #commentDetail {
    /*height: 100px;*/
    margin: 10px 10px;
  }

  .detail #commentDetail #commentLeft img {
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

  ul {
    padding: 0px;
    margin: 0px;
    display: block;
  }

  ul li {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }

</style>
