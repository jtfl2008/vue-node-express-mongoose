<template>
  <div class="form">
    <div class="form-content">
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm"  label-width="80px">
        <el-form-item prop="username" label="账号">
          <el-input :maxlength="35"  placeholder="请输入您的账号" v-model.trim="loginForm.username" ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input :maxlength="18"  type="password" placeholder="请输入您的密码" v-model.trim="loginForm.password" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item class="form-item-btn">
          <el-button type="primary" @click="login" :disabled="isLogin">登 录</el-button>
        </el-form-item>
        <el-form-item class="form-tip">
          还没有帐号？ <router-link to="/registe">立即注册</router-link>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {

  name: 'Login',

  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入账户', trigger: 'change' },
          { min: 2, max: 35, message: '长度在 2 到 35 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'change' }
        ]
      },
      isLogin: true

    }
  },
  watch: {
    loginForm: {
      handler: function (newVal) {
        if (newVal.username && newVal.username.length >= 2 && newVal.password && newVal.password.length >= 6) {
          this.isLogin = false
        } else {
          this.isLogin = true
        }
      },
      deep: true
    }
  },
  methods: {
    checkUser () {

    },
    login () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let params = {
            username: this.loginForm.username,
            password: this.loginForm.password
          }
          this.$ajax('/login', params).then(res => {
            if (res.code === '200') {
              let userInfo = res.data
              // localStorage.setItem('userInfo', JSON.stringify(userInfo))
              this.$message.success(res.message)
              this.$router.push({name: 'Movies'})
            } else {
              this.$message.error(res.message)
            }
          }).catch(res => {
            this.$message.error(res)
          })
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
@import '../assets/css/main.css'
</style>
