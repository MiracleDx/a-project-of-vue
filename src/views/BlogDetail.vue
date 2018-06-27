<template>
  <div class="detail">

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

    <br>
    <br>

    <div id="commentEditor">
      <span>评论:</span>
      <div class="edit_container">
        <quill-editor v-model="commentCentent"
                      ref="myQuillEditor"
                      class="editer"
                      @ready="onEditorReady($event)">
        </quill-editor>
      </div>
      <div class="bottom">
        <el-button type="danger" @click="isLike = !isLike" class="button">{{ zan }}</el-button>
        <el-button type="danger" class="button">发表评论</el-button>
      </div>
    </div>

    <br>
    <br>

    <div id="commentDetail" v-for="i in 4">
      <div id="commentLeft">
        <img src="/static/images/avatars/user.jpg" style="width: 50px">
        <div id="commentRight">
          <span>xxx</span>
          <span>{{ i }}楼</span>
          <span>2018年6月19日 22:11:46</span>
          <i class="el-icon-delete" style="color: blue"></i>
          <br/>
          <span>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
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
      data () {
        return {
          user: '',
          blog: '',
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
          show: false
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
            background: 'rgba(0, 0, 0, 0.8)'
          });

          this.$http.get('/blog/findOne/' + id, {}).then(function (response) {
            loading.close();
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
        formatDate: function(time) {
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

  .detail #commentEditor .bottom {
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
