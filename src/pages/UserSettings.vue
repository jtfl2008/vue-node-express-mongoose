<template>
  <div class="user-center">
    <el-form ref="userSettingsForm" :model="userSettingsForm" :rules="userSettingsFormRules" label-width="120px">
      <el-form-item label="昵称：" prop="username">
        <el-input v-model="userSettingsForm.username"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="gender">
        <el-radio-group v-model="userSettingsForm.gender">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机：" prop="phone">
        <el-input v-model="userSettingsForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="userSettingsForm.email"></el-input>
      </el-form-item>
      <el-form-item label="注册时间：" prop="update_at">
        <p>{{userSettingsForm.update_at}}</p>
      </el-form-item>
      <el-form-item>
         <el-button type="primary" @click="userSettingsFormUpdate">保存</el-button>
       </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'UserCenter',
  data () {
    return {
      userInfo: '',
      userSettingsForm: {
        username: '',
        gender: '',
        phone: '',
        email: ''
      },
      userSettingsFormRules: {
        username: [
          { required: true, message: '请输入账户', trigger: 'change' },
          { min: 2, max: 35, message: '长度在 2 到 35 个字符', trigger: 'change' }
        ],
        gender: [
          { message: '请输选择性别', trigger: 'change' }
        ],
        phone: [
          { message: '请输入手机号码', trigger: 'change' },
          { pattern: /^1[34578]\d{9}$/, message: '请输入11位手机号码', trigger: 'change' }
        ],
        email: [
          { message: '请输入邮箱', trigger: 'change' },
          { pattern: /\w+[@]{1}\w+[.]\w+/, message: '请输入正确的邮箱格式', trigger: 'change' }
        ],
        update_at: [
        ]
      }
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      // let id = this.$store.state.userId || JSON.parse(localStorage.getItem('userInfo'))._id
      let params = {
        id: this.$store.state.userId
        // id: this.$store.state.userId
      }
      this.$ajax('/userCenter', params).then(res => {
        if (res.code === '200') {
          this.userInfo = res.data
          this.userSettingsForm.username = this.userInfo.username
          this.userSettingsForm.gender = this.userInfo.gender
          this.userSettingsForm.phone = this.userInfo.phone
          this.userSettingsForm.email = this.userInfo.email
          this.userSettingsForm.update_at = this.userInfo.update_at
        } else {
          this.$message.error(res.message)
        }
      }).catch(res => {
        this.$message.error(res)
      })
    },
    userSettingsFormUpdate () {
      // this.userSettingsForm.id = JSON.parse(localStorage.getItem('userInfo'))._id
      this.userSettingsForm.id = this.$store.state.userId
      let params = this.userSettingsForm
      this.$ajax('/updateUser', params).then(res => {
        if (res.code === '200') {
          this.$refs.userSettingsForm.validate((valid) => {
            if (valid) {
              this.$store.commit('updateUserName', this.userSettingsForm.username)
              this.$message.success(res.message)
            } else {
              this.$message.error('过验证未通')
            }
          })
        } else {
          this.$message.error(res.message)
        }
      }).catch(res => {
        this.$message.error(res)
      })
    }
  }
}
</script>
<style lang="css" scoped>
</style>