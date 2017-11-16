<template>
  <div class="form">
    <div class="form-content">
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm"  label-width="80px">
        <el-form-item prop="username" label="账号">
          <el-input :maxlength="35"  placeholder="请输入您的账号" v-model.trim="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input :maxlength="18"  type="password" placeholder="请输入您的密码" v-model.trim="loginForm.password" ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" label="确认密码">
          <el-input :maxlength="18"  type="password" placeholder="请再次输入您的密码" v-model.trim="loginForm.checkPass" @keyup.enter.native="registe"></el-input>
        </el-form-item>
        <el-form-item class="form-item-btn">
          <el-button type="primary" @click="registe" :disabled="isLogin">注 册</el-button>
        </el-form-item>
        <el-form-item class="form-tip">
          已有帐号？ <router-link to="/login">立即登录</router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import crypto from 'crypto'
import _ from 'lodash'
export default {
  name: 'register',
  data () {
    let checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.loginForm.password) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        checkPass: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入账户', trigger: 'change' },
          { min: 2, max: 35, message: '长度在 2 到 35 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'change' }
        ],
        checkPass: [
          {
            validator: checkPass, trigger: 'change'
          }
        ]
      },
      isLogin: true
    }
  },
  watch: {
    'loginForm.username': {
      handler: _.debounce(function (newVal) {
        let params = {
          username: newVal
        }
        this.$ajax('/checkUserName', params).then(res => {
          if (res.code !== '200') {
            this.$message.error(res.message)
          }
        }).catch(res => {
          this.$message.error(res)
        })
      }, 500),
      deep: true
    },
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
    getCrypto (val) {
      let md5 = crypto.createHash('md5')
      return md5.update(val + this.secret).digest('hex')
    },
    registe () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let params = {
            username: this.loginForm.username,
            password: this.getCrypto(this.loginForm.password)
          }
          this.$ajax('/registe', params).then(res => {
            if (res.code === '200') {
              this.$message.success(res.message)
              this.$router.push({name: 'Home'})
            } else if (res.code === '205') {
              this.isLogin = true
              this.$message.warning(res.message)
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
