<template>
    <div class="persional">
      <div class="avatar">
        <img :src="user.avatar" style="width: 200px">
        <h6>{{ user.username }}</h6>
        <h6>{{ user.mobile }}</h6>
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
      </div>
      <div id="left">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">个人管理</span>
            </template>
            <el-menu-item-group>
              <span slot="title">个人管理</span>
              <router-link to="/infoManager">
                <el-menu-item index="1-1">补充信息</el-menu-item>
              </router-link>
              <router-link to="/updatePass">
                <el-menu-item index="1-2">修改密码</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
            <router-link to="/blogManager">
              <el-menu-item index="2">
                <i class="el-icon-document"></i>
                <span slot="title">文章管理</span>
              </el-menu-item>
            </router-link>
            <router-link to="/commentManager">
              <el-menu-item index="3">
                <i class="el-icon-setting"></i>
                <span slot="title">评论管理</span>
              </el-menu-item>
            </router-link>
        </el-menu>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: true,
        isLogin: '',
        user: {
          username: this.$store.state.user.username,
          avatar: this.$store.getters.getAvatar,
          mobile: this.$store.state.user.mobile
        }
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        //console.log(key, keyPath);
      }
    },
    computed: {
      getUsername() {
        return this.$store.state.user.username;
      },
      getAvatar() {
        return this.$store.state.user.avatar;
      },
      getMobile() {
        return this.$store.state.user.mobile;
      }
    },
    watch: {
      getUsername() {
        this.user.username = this.$store.state.user.username;
      },
      getAvatar(val) {
        this.user.avatar = this.$store.state.user.avatar;
      }
      ,
      getMobile() {
        this.user.mobile = this.$store.state.user.mobile;
      }
  }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .persional .avatar h6 {
    margin: 0px;
    padding: 0px;
  }

  .persional #left {
    margin: 0px;
  }
</style>
