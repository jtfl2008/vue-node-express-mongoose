<template>
  <div class="nav-header">
    <el-menu :default-active="activeIndex" mode="horizontal" router>
      <el-menu-item index="/movies"><img class="logo" src="https://gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg"></el-menu-item>
      <el-menu-item index="/movies">豆瓣电影</el-menu-item>
      <el-menu-item index="/books">豆瓣书籍</el-menu-item>
      <el-menu-item index="/musics">豆瓣音乐</el-menu-item>
      <template  v-if="!isLogin" >
        <el-menu-item class="text-right" index="/registe">注册</el-menu-item>
        <el-menu-item class="text-right" index="/login">登录</el-menu-item>
      </template>
      <el-submenu index="" v-else>
        <template slot="title" class="user-info">您好，欢迎 <span class="username">{{ username }}</span></template>
        <el-menu-item index="/usercenter">个人中心</el-menu-item>
        <el-menu-item index="/userSettings">设置</el-menu-item>
        <el-menu-item index="" @click="logout">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>

</template>

<script>
import {mapState} from 'Vuex'
export default {

  name: 'header',

  data () {
    return {
      // isLongin: false,
      // username: '',
      activeIndex: this.$route.path
    }
  },
  mounted () {
    // this.$store.dispatch('checkLogin')
    this.checkLogin()
  },
  computed: {
    /* username () {
      return this.$store.state.username
    },
    isLogin () {
      return this.$store.state.isLogin
    } */

    ...mapState(['username', 'isLogin'])
  },
  // computed: mapState({
    // username: state => state.username,
    // isLogin: state => state.isLogin
  // }),
  methods: {
    checkLogin () {
      this.$ajax('/checkLogin').then(res => {
        if (res.code === '200') {
          // this.username = res.data.userName
          // this.isLongin = true
          this.$store.commit('userInfo', {userId: res.data.userId, userName: res.data.userName, isLogin: true})
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => {
        this.$router.push({name: 'Movies'})
        this.$store.commit('removeInfo', {userId: '', username: '', isLogin: false})
        this.$message.error(err)
      })
    },
    logout () {
      this.$ajax('/logout').then(res => {
        if (res.code === '200') {
          this.$message.success(res.message)
          // localStorage.removeItem('vueNodeExpressMongooseLearnVuex')
          this.$router.push({name: 'Movies'})
          // this.isLongin = false
          this.$store.commit('removeInfo', {userId: '', username: '', isLogin: false})
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
