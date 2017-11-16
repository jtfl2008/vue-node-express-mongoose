<template>
  <div class="user-center">
    <el-form ref="userCenterForm" :model="userCenterForm" label-width="120px">
      <el-form-item label="昵称：">
        <!-- <el-input v-model="userCenterForm.name"></el-input> -->
        <p>{{userInfo.username}}</p>
      </el-form-item>
      <el-form-item label="性别：" v-if="userInfo.gender">
        <p>{{userInfo.gender}}</p>
      </el-form-item>
      <el-form-item label="手机：" v-if="userInfo.phone">
        <p>{{userInfo.phone}}</p>
      </el-form-item>
      <el-form-item label="邮箱：" v-if="userInfo.email">
        <p>{{userInfo.email}}</p>
      </el-form-item>
      <el-form-item label="注册时间：">
        <p>{{userInfo.created_at}}</p>
      </el-form-item>
      <el-form-item label="最近登录：">
        <p>{{userInfo.update_at}}</p>
      </el-form-item>
      <el-form-item>
        <router-link class="userSettings" to="/userSettings">设置</router-link>
      </el-form-item>
    </el-form>
    
  </div>
</template>
<script>
import Star from '../components/Star.vue'
import CustomInput from '../components/CustomInput.vue'
export default {
  name: 'UserCenter',
  data () {
    return {
      price: 111,
      userInfo: '',
      userCenterForm: {

      }
    }
  },
  mounted () {
    this.getUserInfo()
  },
  components: {
    Star,
    CustomInput
  },
  methods: {
    getUserInfo () {
      let params = {
        // id: JSON.parse(localStorage.getItem('userInfo'))._id
        id: this.$store.state.userId
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
    },
    getCurrent (value) {
      console.log(value)
    }
  }
}
</script>
<style lang="css" scoped>
</style>