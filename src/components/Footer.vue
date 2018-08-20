<template>
  <el-footer>
    <el-tooltip content="联系我" placement="top">
      <span @click="show">Dongx</span>
    </el-tooltip>
  </el-footer>
</template>

<script>
  export default {
    data() {
      return {

        }
      },
    methods: {
      show() {
        this.$alert('<img src="/static/images/avatars/wechat.jpg" style="width: 300px;">', '', {
          dangerouslyUseHTMLString: true,
          center: true
        });
      }
    }
  }
</script>

<style scoped>

</style>
