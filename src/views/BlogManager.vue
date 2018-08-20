<template>
    <div class="blogManager">
      <div id="left">
        <el-row>
          <div v-show="isShow">
            <router-link to="/blogEditor"><el-button id="button" type="danger">发布文章</el-button></router-link>
          </div>
          <el-col :span="8" v-for="(o, index) in blogs" :key="o.value" :offset="index > 0 ? 0 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
              <span v-text="o.title" @click="findOne(o.id)" style="color: #66ccff"></span>
                <div class="bottom clearfix">
                  <div style="font-size: 5px"><span>点赞：</span><span style="color: red">{{ o.likeNumber | formatNumber }} </span></div>
                  <div style="font-size: 5px"><span>&nbsp;&nbsp;回复：</span><span style="color: red">{{ o.replyNumber | formatNumber }}</span></div>
                  <time class="time" v-text="$options.filters.formatDate(o.createTime)" style="color: red;"></time>
                  <template>
                    <el-button type="text" class="button" @click="goUpdate(o.id)">修改</el-button>
                    <el-button type="text" @click="goDelete(o.id)" class="button">删除</el-button>
                  </template>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <div id="right" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span><i class="el-icon-edit">&nbsp;&nbsp;</i>热门标签</span>
            <el-button style="float: right; padding: 3px 0" type="text">隐藏</el-button>
          </div>
          <el-tag>Spring Boot</el-tag>
          <el-tag type="success">Spring Cloud</el-tag>
          <el-tag type="info">ElasticSearch</el-tag>
          <el-tag type="warning">JPA</el-tag>
          <el-tag type="danger">Redis</el-tag>
        </el-card>
      </div>
    </div>
</template>

<script>
  import BlogDetail from "./BlogDetail";
  import {formatDate} from '../utils/date.js';

  export default {
    components: {BlogDetail},
    inject: ['reload'],
    data() {
      return {
        blogs: '',
        isShow: false
      };
    },
    methods: {
      findOne (val) {
        if (localStorage.getItem('token')) {
          this.$router.push({name: "blogDetail", params: {id: val}});
        } else {
          this.$message({
            type: 'warning',
            message: '没有访问权限'
          })
        }
      },
      goDelete(val) {
        let that = this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$http.delete('/blog/delete/' + val, {})
            .then(function (response) {
              if (response.data.code == '0') {
                that.$message({
                  type: 'info',
                  message: response.data.message
                });
                that.reload();
                //console.log(response.data);
              } else {
                that.$message({
                  type: 'error',
                  message: response.data.message
                })
              }
            }).catch(function (error) {
            //console.log(error);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      goUpdate(val) {
        this.$confirm('该操作将修改此文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$router.push({name: "blogEditor", params: {id: val}});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消该操作'
          });
        });
      }
    },
    created: function() {
      let that = this;
      this.$http.get('/blog/findAllByUserId', {
      }).then(function (response) {
        if (response.data.code == '0') {
          that.blogs = response.data.data;
          //console.log(response.data.data);
          that.$message({
            type: 'info',
            message: response.data.message
          })
          that.isShow = true;
          //console.log(response.data);
        } else {
          that.$message({
            type: 'error',
            message: response.data.message
          })
        }
      }).catch(function (error) {
        //console.log(error);
      });
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      },
      formatNumber(number) {
        if (number == null || number == undefined || number == '') {
          return 0;
        } else {
          return number;
        }
      }
    }
  }
</script>

<style scoped>

  .el-col {
    margin: 5px;
  }

  .el-popover {
    float: right;
  }

  .el-popover .button {
    padding: 7px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .clearfix:before, .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .blogManager #left #button {
    position: fixed;
    right: 10px;
  }

  .blogManager #right {
    position: fixed;
    right: 10px;
    top: 130px;
  }

</style>
