<template>
  <div class="detail">

    <el-card :body-style="{ padding: '0px' }">

      <div class="poster">
        <img :src="detail.cover" class="image" width="200">
      </div>
      <div class="detail-desc">
        <h2 class="movie-title">{{detail.title}}</h2>
        <div class="item directors">
          <div class="item-label">
            导演：
          </div>
          <ul class="item-content">
            <li>
              {{ detail.directors }}
            </li>
          </ul>
        </div>
        <div class="item rate">
          <div class="item-label">
            评分：
          </div>
          <ul class="item-content">
            <li>
              {{ detail.rate }} 分
            </li>
          </ul>
        </div>
        <div class="item actors">
          <div class="item-label">
            主演：
          </div>
          <ul class="item-content">
            <li v-for="item in detail.actors">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="item types">
          <div class="item-label">
            类型：
          </div>
          <ul class="item-content">
            <li v-for="item in detail.types">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="item region">
          <div class="item-label">
            制片国家/地区：
          </div>
          <ul class="item-content">
            <li >
              {{ detail.region }}
            </li>
          </ul>
        </div>
        <div class="item release_year">
          <div class="item-label">
            上映日期：
          </div>
          <ul class="item-content">
            <li >
              {{ detail.release_year }}
            </li>
          </ul>
        </div>
        <div class="item duration">
          <div class="item-label">
            片长：
          </div>
          <ul class="item-content">
            <li >
              {{ detail.duration }}
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
      this.$ajax('/detail', params).then(res => {
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
  .movie-title{
    font-size: 18px;
    color: #333;
  }
  .poster{
    width: 400px;
    margin-right: 20px;
  }
  .image {
    width: 100%;
    display: block;
  }
  .item{
    display: flex;
    margin-top: 15px;
  }
  .item .item-label{
    width: 120px;
    color: #666666;
    text-align: right;
  }
  .item .item-content{
    flex:1;
    display: flex;
    flex-wrap: wrap;
    color: #111;
  }
  .item .item-content li{
    margin-bottom: 10px;
    margin-right: 15px;
  }
</style>
