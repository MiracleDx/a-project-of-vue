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
        <span @click="openHei"><el-tag>Spring Boot</el-tag></span>
        <span @click="openHei"><el-tag @click="openHei" type="success">Spring Cloud</el-tag></span>
        <span @click="openHei"><el-tag @click="openHei" type="info">ElasticSearch</el-tag></span>
        <span @click="openHei"><el-tag @click="openHei" type="warning">JPA</el-tag></span>
        <span @click="openHei"><el-tag @click="openHei" type="danger">Redis</el-tag></span>
      </el-card>

      <!--最热文章-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span><i class="el-icon-edit">&nbsp;&nbsp;</i>最热文章</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="open">隐藏</el-button>
        </div>
        <div v-for="o in topFives" :key="o.value" class="text item">
          <span @click="findOne(o.id)">{{ o.title }}</span>
        </div>
      </el-card>

      <!--最新发布-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span><i class="el-icon-edit">&nbsp;&nbsp;</i>最新发布</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="open">隐藏</el-button>
        </div>
        <div v-for="o in newFives" :key="o.value" class="text item">
          <span @click="findOne(o.id)">{{ o.title }}</span>
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
        count: 0,
        activeName: '1',
        blogs: [],
        topFives: [],
        newFives: []
      }
    },
    created: function () {
      let that = this;
      this.$http.get('/es/findAll', {
        }).then(function (response) {
          if (response.data.code == '0') {
            that.blogs = response.data.data.content;
            console.log(response.data.data);
          }
        }).catch(function (error) {
          console.log(error);
        });
      // find top 5
      this.$http.get('/es/findTopFive', {
      }).then(function (response) {
        if (response.data.code == '0') {
          that.topFives = response.data.data;
          console.log(response.data.data);
        }
      }).catch(function (error) {
        console.log(error);
      });
      // find new 5
      this.$http.get('/es/findNewFive', {
      }).then(function (response) {
        if (response.data.code == '0') {
          that.newFives = response.data.data;
          console.log(response.data.data);
        }
      }).catch(function (error) {
        console.log(error);
      });
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
      },
      openHei() {
        this.count ++;
        let str = '';
        if (this.count == 1) {
          str = '我没有内容哟'
        }
        if (this.count == 2) {
          str = '我也没有内容'
        }
        if (this.count == 3) {
          str = '我还是没有内容'
        }
        if (this.count == 4) {
          str = '我真的没有内容'
        }
        if (this.count == 5) {
          str = '你怎么就不信邪呢'
        }
        if (this.count >= 6) {
          str = '点，可劲儿点，反正我什么也没有'
        }
        if (str != '') {
          this.$alert('<strong style="color: red;">' + str + '</strong>', '', {
            center: true,
            dangerouslyUseHTMLString: true,
            showClose: false,
            confirmButtonText: '确定',
            /*callback: action => {
              this.$message({
                type: 'info',
                message: str
              });
            }*/
          });
        }
      }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm:ss");
      }
    },
    computed: {
      getBlogs() {
        return this.$store.state.blogs;
      }
    },
    watch:  {
      getBlogs() {
        this.blogs = this.$store.state.blogs;
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
