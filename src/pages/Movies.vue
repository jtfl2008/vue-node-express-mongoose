<template>
	<div class="movies-list">
		<div class="head">
		  <el-row>
		    <!-- <el-col :span="2">
		      <h4>类型：</h4>
		    </el-col>
		    <el-col :span="22">

		    </el-col> -->
		    <el-radio-group v-model="type">
		      <el-radio-button v-for="item in types" :label="item.value" :key="item.value"> {{item.label}} </el-radio-button>
		    </el-radio-group>
		  </el-row>

		  <el-row>
		   <!--  <el-col :span="2">
		     <h4>评分：</h4>
		   </el-col>
		   <el-col :span="22">

		   </el-col> -->
		   <el-radio-group v-model="rating">
		     <el-radio-button v-for="item in ratings" :label="item.value" :key="item.value"> {{item.label}} </el-radio-button>
		   </el-radio-group>
		   <!-- <el-button @click="addMovieDialog">添加电影</el-button> -->
		  </el-row>

		</div>
		<div class="body" >
		   <el-table
		       :data="movies"
		       stripe
		       border
		         >
		       <!-- <el-table-column
		         label="ID"
		         prop="_id"
		         >
		       </el-table-column> -->
		       <el-table-column
		         label="索引"
		         type="index"
		         width="80"
		         >
		       </el-table-column>
		       <el-table-column

		         label="电影海报"
		         width="120"
		         >
		         <template scope="scope">
		           <img :src="scope.row.cover" height="100" alt="">
		           <!-- {{ scope.row.poster }} -->
		           <!-- {{ scope.column }} -->
		           <!-- {{ scope.$index }} -->
		         </template>
		       </el-table-column>
		       <el-table-column
		         prop="title"
		         label="电影名称"
		         >
		       </el-table-column>
		       <el-table-column
		         prop="short_comment"
		         label="短评"
		         width="580"
		         >
		       </el-table-column>
		       <el-table-column
		         prop="rate"
		         label="评分"
		         width="80"
		         >
		         
		       </el-table-column>
		       <el-table-column
		         label="操作">
		         <template scope="scope">
		           <el-button type="text" size="small" ><router-link :to="{ name: 'Detail', params: { id: scope.row.id }}">查看</router-link></el-button>
		           <el-button type="text" size="small" @click="editMovieDialog(scope.$index, scope.row)">编辑</el-button>
		           <el-button type="text" size="small" @click="removeMovie(scope.$index, scope.row)">删除</el-button>
		         </template>
		       </el-table-column>
		     </el-table>

		     <div class="pagination">
		         <!-- <el-pagination
		           :page-size="5"
		           layout="prev, pager, next, jumper"
		           :total="total"
		           :current-page="currentPage"
		           @current-change="paginationCurrentChange"
		           border
		           stripe
		           >
		         </el-pagination> -->
		         <el-pagination
		           layout="prev, pager, next"
		           :total="total"
		           :page-size="5"
		           @current-change="getCurrentPage"
		           border
		           stripe
		           >
		         </el-pagination>
		     </div>

		     <!-- <el-dialog title="新增电影" v-model="dialogVisibleAddMovie"  size="tiny" >
		       <el-form ref="addMovie" :model="addMovie" :rules="addMovieRules" >

		         <el-form-item label="电影名称" prop="title">
		           <el-input v-model="addMovie.title"></el-input>
		         </el-form-item>
		         <el-form-item label="海报地址" prop="poster">
		           <el-input v-model="addMovie.poster"></el-input>
		         </el-form-item>
		         <el-form-item label="简介" prop="short_comment">
		           <el-input v-model="addMovie.short_comment"></el-input>
		         </el-form-item>
		         <el-form-item label="评分" prop="rate">
		           <el-input v-model="addMovie.rate"></el-input>
		         </el-form-item>
		       </el-form>
		       <span slot="footer" class="dialog-footer">
		         <el-button @click="cancelAddMovie">取 消</el-button>
		         <el-button type="primary" @click="addMovieData">保 存</el-button>
		       </span>
		     </el-dialog> -->
		     <el-dialog title="编辑电影" v-model="dialogVisibleUpdateMovie"  size="tiny" >
		       <el-form ref="editMovie" :model="editMovie" :rules="addMovieRules" >

		         <el-form-item label="电影名称" prop="title">
		           <el-input v-model="editMovie.title"></el-input>
		         </el-form-item>
		         <el-form-item label="海报地址" prop="poster">
		           <el-input v-model="editMovie.cover"></el-input>
		         </el-form-item>
		         <el-form-item label="简介" prop="short_comment">
		           <el-input v-model="editMovie.short_comment"></el-input>
		         </el-form-item>
		         <el-form-item label="评分" prop="rate">
		           <el-input v-model="editMovie.rate"></el-input>
		         </el-form-item>
		       </el-form>
		       <span slot="footer" class="dialog-footer">
		         <el-button @click="cancelEditMovie">取 消</el-button>
		         <el-button type="primary" @click="editMovieData">保 存</el-button>
		       </span>
		     </el-dialog>
		</div>
	</div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      types: this.types,
      type: this.types[0].value,
      ratings: this.ratings,
      rating: this.ratings[0].value,
      dialogVisibleAddMovie: false,
      dialogVisibleUpdateMovie: false,
      addMovie: {
        title: '',
        cover: '',
        short_comment: '',
        rate: ''
      },
      editMovie: {
        title: '',
        cover: '',
        short_comment: '',
        rate: ''
      },
      addMovieRules: {
        title: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 35, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        cover: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 200, message: '长度在 3 到 200 个字符', trigger: 'blur' }
        ],
        short_comment: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 500, message: '长度在 3 到 500 个字符', trigger: 'blur' }
        ],
        rate: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 0, max: 3, message: '长度在 0 到 2 个字符', trigger: 'blur' }
        ]},
      movies: [],
      detail: '',
      id: '',
      total: 0,
      currentPage: 1,
      loading: false
    }
  },
  mounted () {
    this.getLists()
  },
  watch: {
    rating: function (newVal, oldVal) {
      this.rating = newVal
      this.currentPage = 1
      this.getLists()
    },
    type: function (newVal, oldVal) {
      this.type = newVal
      this.currentPage = 1
      this.getLists()
    }
  },
  methods: {
    // 列表
    getLists () {
      this.loading = true
      let params = {
        type: this.type,
        rating: this.rating,
        pageSize: 5,
        currentPage: this.currentPage
      }
      // this.$ajax('/static/lists.json').then(res => {
      this.$ajax('/lists', params).then(res => {
        if (res.code === '200') {
          // console.log(res)
          this.movies = res.data.lists
          this.total = res.data.total
          this.loading = false
          // this.type = this.types[0].value
          // this.rating = this.ratings[0].value
        }
      }).catch(res => {
        console.log(res)
      })
    },
    // 当前分页
    getCurrentPage (currentPage) {
      this.currentPage = currentPage
      this.getLists()
    },
    addMovieDialog () {
      this.dialogVisibleAddMovie = true
    },
    cancelAddMovie () {
      this.dialogVisibleAddMovie = false
      this.addMovie = {}
    },
    // 添加
    addMovieData () {
      this.$refs.addMovie.validate((valid) => {
        if (valid) {
          let params = this.addMovie
          this.$ajax('/create', params).then(res => {
            if (res.code === '200') {
              this.$message.success(res.message)
              this.dialogVisibleAddMovie = false
              this.getLists()
            }
          }).catch(res => {
            this.$message.error(res)
          })
        }
      })
    },
    // 反显
    editMovieDialog (index, row) {
      this.id = row.id
      this.dialogVisibleUpdateMovie = true
      let params = {
        id: this.id
      }
      // this.$ajax(`/detail/${row._id}`).then(res => {
      this.$ajax('/detail', params).then(res => {
        if (res.code === '200') {
          this.detail = res.data
          this.editMovie.title = this.detail.title
          this.editMovie.cover = this.detail.cover
          this.editMovie.short_comment = this.detail.short_comment
          this.editMovie.rate = this.detail.rate
        }
      }).catch(err => {
        this.$message.error(err.message)
      })

      // this.getMoiveInfo(row)
    },
    cancelEditMovie () {
      this.dialogVisibleAddMovie = true
      this.addMovie = {}
    },
    // 修改
    editMovieData () {
      this.$refs.editMovie.validate((valid) => {
        if (valid) {
          let params = {
            id: this.id,
            title: this.editMovie.title,
            cover: this.editMovie.cover,
            short_comment: this.editMovie.short_comment,
            rate: this.editMovie.rate
          }
          this.$ajax('/update', params).then(res => {
            if (res.code === '200') {
              this.$message.success(res.message)
              this.dialogVisibleUpdateMovie = false
              this.getLists()
            }
          }).catch(res => {
            this.$message.error(res)
          })
        }
      })
    },
    // 删除
    removeMovie (index, row) {
      this.id = row._id
      let params = {
        id: this.id
      }
      this.$ajax('/remove', params).then(res => {
        if (res.code === '200') {
          this.$message.success(res.message)
          this.dialogVisibleUpdateMovie = false
          this.getLists()
        }
      }).catch(res => {
        this.$message.error(res)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.home{
  width: 1200px;
  min-width:1200px;
  margin: auto;
}
.head {
  margin-top: 10px;
  .el-row{
    margin-bottom: 10px;
    h4{
      font-weight: normal;
      line-height: 36px;
    }
    .el-radio-button__inner{
      padding: 8px 10px;
    }
  }
}
.pagination{
  text-align: right;
  margin-top: 10px;
}
</style>