<template>
  <div class="nav-header">
    <el-menu :default-active="activeIndex" mode="horizontal" router>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/login">登录</el-menu-item>
      <el-menu-item index="/registe">注册</el-menu-item>
      <el-menu-item index="" class="user-info">您好，{{ username }}</el-menu-item>

    </el-menu>
  </div>

</template>

<script>
export default {

  name: 'header',

  data () {
    return {
      username: '',
      activeIndex: '1'
    }
  },
  mounted () {
    this.isLogin()
  },
  methods: {
    isLogin () {
      console.log(localStorage.userInfo)
       /* if (localStorage.userInfo) {
        this.username = JSON.parse(localStorage.userInfo.username)
      } else {
        this.username = ''
      } */
    }
  }
}
</script>

<style lang="css" scoped>
.user-info{
  float: right;
}
</style>
