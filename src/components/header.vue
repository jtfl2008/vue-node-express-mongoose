<template>
  <div class="nav-header">
    <el-menu :default-active="activeIndex" mode="horizontal" router>
      <el-menu-item index="/movies"><img src="https://gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg"></el-menu-item>
      <el-menu-item index="/movies">豆瓣电影</el-menu-item>
      <el-menu-item index="/books">豆瓣书籍</el-menu-item>
      <el-menu-item index="/musics">豆瓣音乐</el-menu-item>
      <template  v-if="!isLongin" >
        <el-menu-item class="text-right" index="/registe">注册</el-menu-item>
        <el-menu-item class="text-right" index="/login">登录</el-menu-item>
      </template>
      <el-submenu index="" v-else>
        <template slot="title" class="user-info">您好，欢迎 <span class="username">{{ username }}</span></template>
        <el-menu-item index="/usercenter">个人中心</el-menu-item>
        <el-menu-item index="" @click="logout">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>

</template>

<script>
export default {

  name: 'header',

  data () {
    return {
      isLongin: false,
      username: '',
      activeIndex: '/movies'
    }
  },
  mounted () {
    this.isLogin()
  },
  methods: {
    isLogin () {
      this.$ajax('/checkLogin').then(res => {
        if (res.code === '200') {
          this.username = res.data.userName
          this.isLongin = true
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    logout () {
      this.$ajax('/logout').then(res => {
        if (res.code === '200') {
          this.$message.success(res.message)
          localStorage.removeItem('userInfo')
          this.isLongin = false
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    }
  }
}
</script>

<style lang="css">
</style>
