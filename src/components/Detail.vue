<template>
  <div class="detail">
    <el-card :body-style="{ padding: '0px' }">
      <img :src="detail.cover" class="image" width="200">
      <div>
        <span>{{detail.title}}</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
        </div>
      </div>
    </el-card>
    {{ $route.params.id }}
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
.time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both;
  }
</style>
