<template>
  <div class="user-center">
    <el-form ref="userCenterForm" :model="userCenterForm" label-width="120px">
      <el-form-item label="昵称：">
        <el-input v-model="userCenterForm.name"></el-input>
        <p>{{userInfo.username}}</p>
      </el-form-item>
      <el-form-item label="注册时间：">
        <el-input v-model="userCenterForm.name"></el-input>
        <p>{{userInfo.created_at}}</p>
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
      userCenterForm: {

      }
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      let params = {
        id: JSON.parse(localStorage.getItem('userInfo'))._id
      }
      this.$ajax('/userCenter', params).then(res => {
        if (res.code === '200') {
          this.userInfo = res.data
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
.user-center{
  margin-top: 10px;
}
.el-form{
  width: 500px;
}
</style>