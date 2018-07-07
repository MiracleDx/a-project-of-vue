<template>
    <div>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item v-for=" i in comments" :key="i.value" :title="splitStr(i.content)" :name="i.index">
          <div>
            <span v-if="i.replyUsername">
              回复：{{ i.replyNickname ? i.replyNickname : i.replyUsername }}
            </span>
            <span>
              回复于：<span style="color: red" v-html="">{{ i.createTime | formatDate }}</span>
            </span>
          </div>
          <span>回复的文章：</span>
          <el-tooltip content="点击查看文章详情" placement="top">
            <span @click="openBlog(i.blogId)">{{ i.title }}</span>
          </el-tooltip>
          <el-button type="text" @click="deleteComment(i)" class="button">删除</el-button>
        </el-collapse-item>
      </el-collapse>
    </div>
</template>

<script>
  import {formatDate} from '../utils/date.js';
  export default {
    inject: ['reload'],
    data() {
      return {
        comments: [],
        activeNames: ['1']
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      splitStr(val) {
        if (val.indexOf("<") > -1) {
          return '我的评论：' + val.substring(val.indexOf('>') + 1, val.lastIndexOf('<'));
        } else {
          return '我的评论：' + val;
        }
      },
      openBlog(val) {
        if (localStorage.getItem('token')) {
          this.$router.push({name: "blogDetail", params: {id: val}});
        } else {
          this.$message({
            type: 'warning',
            message: '没有访问权限'
          })
        }
      },
      deleteComment(val) {
        let that = this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
      }
    },
    created: function() {
      let that = this;
      this.$http.get('/comment/findAllCommentByUserId', {
      }).then(function (response) {
        if (response.data.code == '0') {
          that.comments = response.data.data;
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
        console.log(error);
      });
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
.button {
  float: right;
}
</style>
