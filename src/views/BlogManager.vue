<template>
    <div class="blogManager">
      <el-row>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"  v-for="(o, index) in 16" :key="o.value" :offset="index > 0 ? 0 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
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
</template>

<script>
  export default {
    data() {
      return {
        currentDate: new Date(),
        visible: false,
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

</style>
