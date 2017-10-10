<script src="../../.eslintrc.js"></script>
<template>
  <div class="detail">

    <el-card :body-style="{ padding: '0px' }">
      <div class="poster">
        <img :src="detail.cover" class="image" width="200">
      </div>
      <div class="detail-desc">
        <span class="title">{{detail.title}}</span>
        <div class="bottom clearfix">
          <time class="time">{{ detail.currentDate }}</time>
        </div>
        <div class="directors">
          {{ detail.directors }}
        </div>
        <div class="actors">
          <ul>
            <li v-for="item in detail.actors">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {

  name: 'Detail',

  data () {
    return {
      detail: ''
    }
  },
  mounted () {
    this.detailMovie()
  },
  methods: {
    // 详情
    detailMovie (index, row) {
      let params = {
        id: this.$route.params.id
      }
      this.$ajax('/api/detail', params).then(res => {
        if (res.code === '200') {
          this.detail = res.data
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    }
  }
}
</script>

<style lang="css">
  .el-card{
    padding: 20px;
  }
  .el-card__body{
    display: flex;
  }
  .title{
    font-size: 16px;
    color: #555555;
  }
  .poster{
    width: 400px;
    margin-right: 20px;
  }
  .image {
    width: 100%;
    display: block;
  }
  .actors li + li{
    margin-top: 10px;
  }
</style>
