<template>
  <el-main>
    <div id="left">
      <!--文章列表-->
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="i in blogs" :key="i.value" :title=i.title :name=i.index>
          <div  @click="findOne(i.id)">
            <div v-show="i.description">描述：{{ i.description }}</div>
            <div>
              发表于：
              <span style="color: red">{{ i.createTime | formatDate }}</span>&nbsp;
              点赞：
              <span style="color: red">{{ i.likeNumber ? i.likeNumber : 0 }}</span>&nbsp;
              回复：
              <span style="color: red">{{ i.replyNumber ? i.replyNumber : 0 }}</span>&nbsp;
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div id="right">
      <!--标签-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span><i class="el-icon-edit">&nbsp;&nbsp;</i>热门标签</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="open">隐藏</el-button>
        </div>
        <el-tag>Spring Boot</el-tag>
        <el-tag type="success">Spring Cloud</el-tag>
        <el-tag type="info">Elasticsearch</el-tag>
        <el-tag type="warning">JPA</el-tag>
        <el-tag type="danger">Redis</el-tag>
      </el-card>

      <!--最热文章-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span><i class="el-icon-edit">&nbsp;&nbsp;</i>最热文章</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="open">隐藏</el-button>
        </div>
        <div v-for="o in cardData" :key="o.value" class="text item">

        </div>
      </el-card>

      <!--最新发布-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span><i class="el-icon-edit">&nbsp;&nbsp;</i>最新发布</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="open">隐藏</el-button>
        </div>
        <div v-for="o in cardData" :key="o.value" class="text item">
        </div>
      </el-card>
    </div>
  </el-main>
</template>

<script>

  import {formatDate} from '../utils/date.js';

  export default {
    data () {
      return {
        activeName: '1',
        blogs: [],
        cardData: []
      }
    },
    created: function () {
      let that = this;
      this.$http.get('/findAllBlog', {
        }).then(function (response) {
          if (response.data.code == '0') {
            that.blogs = response.data.data;
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
      // todo find top 5
      // todo find new 5
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
      open() {
        this.$notify({
          title: '略略略略',
          message: '我就不隐藏',
          position: 'top-left',
          showClose: false,
          duration: 5000
        });
      }
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

  .el-main #left {
    width: 60%;
    float: left;
    text-align: center;
  }

  .el-main #right {
    width: 35%;
    float: right;
  }
</style>
