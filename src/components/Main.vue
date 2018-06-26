<template>
  <el-main>
    <div id="left">
      <!--文章列表-->
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="i in blogs" :key="i.value" :title=i.title :name=i.index>
          <div  @click="findOne(i.id)">
            <div v-show="i.description">描述：{{ i.description }}</div>
            <div>发表于 <span style="color: red">{{ i.createTime }}</span></div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div id="right">
      <!--标签-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span><i class="el-icon-edit">&nbsp;&nbsp;</i>热门标签</span>
          <el-button style="float: right; padding: 3px 0" type="text">隐藏</el-button>
        </div>
        <el-tag class="tag" v-for="o in cardData" :key="o.value" type="info">{{ o.message }}</el-tag>
      </el-card>

      <!--最热文章-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span><i class="el-icon-edit"></i>最热文章</span>
          <el-button style="float: right; padding: 3px 0" type="text">隐藏</el-button>
        </div>
        <div v-for="o in cardData" :key="o.value" class="text item">
          {{'列表内容 ' + o.message }}
        </div>
      </el-card>

      <!--最新发布-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span><i class="el-icon-edit"></i>最新发布</span>
          <el-button style="float: right; padding: 3px 0" type="text">隐藏</el-button>
        </div>
        <div v-for="o in cardData" :key="o.value" class="text item">
          {{'列表内容 ' + o.message }}
        </div>
      </el-card>
    </div>
  </el-main>
</template>

<script>

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
    this.$http.get('/blog/findAll', {
    }).then(function (response) {
      if (response.data.code == '0') {
        that.blogs = response.data.data;
        console.log(response.data.data);
          this.$message({
            type: 'info',
            message: response.data.message
          })
        console.log(response.data);
      } else {
        this.$message({
          type: 'error',
          message: response.data.message
        })
      }
    }).catch(function (error) {
      console.log(error);
    });
  },
  methods: {
    findOne (val) {
      this.$router.push({name: "blogDetail", params: {id: val}});
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
