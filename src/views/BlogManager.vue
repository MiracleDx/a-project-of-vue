<template>
    <div class="blogManager">
      <div id="left">
        <el-row>
          <div>
            <router-link to="/blogEditor"><el-button id="button" type="danger">发布文章</el-button></router-link>
          </div>
          <el-col :span="8" v-for="(o, index) in 16" :key="o.value" :offset="index > 0 ? 0 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                <router-link to="/blogDetail"><span>好吃的汉堡</span></router-link>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <template>
                    <el-button type="text" class="button">修改</el-button>
                    <el-button type="text" @click="open" class="button">删除</el-button>
                  </template>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <div id="right">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span><i class="el-icon-edit">&nbsp;&nbsp;</i>热门标签</span>
            <el-button style="float: right; padding: 3px 0" type="text">隐藏</el-button>
          </div>
          <el-tag class="tag" v-for="o in cardData" :key="o.value" type="info">{{ o.message }}</el-tag>
        </el-card>
      </div>
    </div>
</template>

<script>
  import BlogDetail from "./BlogDetail";
  export default {
    components: {BlogDetail},
    data() {
      return {
        currentDate: new Date(),
        cardData: [
          {
            message: '第一篇文章'
          },
          {
            message: '第二篇文章'
          }
        ]
      };
    },
    methods: {
      open() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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
