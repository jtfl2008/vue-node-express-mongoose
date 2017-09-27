const express = require('express')
const router = express.Router()
const Film = require('../models/films.js')

// 添加电影
router.all('/create', (req, res) => {
  // console.log(req.body)
  Film.create(req.body, (err, movie) => {
    if (err) {
      res.json(err)
    } else {
      let params = {
        'code': '200',
        'message': '添加成功',
        'data': ''
      }
      res.json(params)
    }
  })
})
// 电影列表
router.all('/lists', (req, res) => {
  let pageSize = req.body.pageSize * 1 || 10
  let currentPage = req.body.currentPage * 1 || 1
  let type = req.body.type
  let rating = req.body.rating * 1
  let typeParams = type === '全部类型' ? {} : {types: {$in: [type]}}
  let ratingParams = rating ? {rate: { $gt: rating.toString(), $lt: (rating + 1).toString() }} : {}
  let params = {
    $and: [ typeParams, ratingParams ]
  }
  // console.log(typeParams)
  // console.log(ratingParams)
  // 第一种
  Film.count(params, (err, count) => {
    if (err) {
      res.json(err.message)
    } else {
      Film.find(params)
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize)
        .sort({update_at: -1})
        .exec((err, lists) => {
          if (err) {
            res.json(err)
          } else {
            let params = {
              'code': '200',
              'message': 'success',
              'data': {
                'lists': lists,
                'total': count
              }
            }
            res.json(params)
          }
        })
    }
  })
  // 第二种
  // Film.find(params)
  //   .skip((currentPage - 1) * pageSize)
  //   .limit(pageSize)
  //   .sort({update_at: -1})
  //   .exec((err, lists) => {
  //     if (err) {
  //       res.json(err)
  //     } else {
  //       Film.find(params, (err, docs) => {
  //         if (err) {
  //           res.json(err)
  //         } else {
  //           let params = {
  //             'code': '200',
  //             'message': 'success',
  //             'data': {
  //               'lists': lists,
  //               'total': docs.length
  //             }
  //           }
  //           res.json(params)
  //         }
  //       })
  //     }
  //   })
})
// 查询单个电影
router.all('/detail', (req, res) => {
  if (!req.body.id) return
  // Movie.findOne({_id: req.body.id}, { title: 1, introduction: 1 })
  Film.findOne({id: req.body.id}, { rating: 0 })
  .then(movie => {
    let params = {
      'code': '200',
      'message': 'success',
      'data': movie
    }
    res.json(params)
  }).catch(err => {
    res.json(err)
  })
})
// 修改电影
router.all('/update', (req, res) => {
  Film.findOneAndUpdate({_id: req.body.id},
    {$set: {title: req.body.title,
      rating: req.body.rating,
      poster: req.body.poster,
      introduction: req.body.introduction
    }}, {
      new: true
    }).then(movie => {
      let params = {
        'code': '200',
        'message': '修改成功',
        'data': movie
      }
      res.json(params)
    }).catch(err => {
      res.json(err)
    })
})
// 删除电影
router.all('/remove', (req, res) => {
  Film.findOneAndRemove({
    _id: req.body.id
  }).then(movie => {
    let params = {
      'code': '200',
      'message': '删除成功',
      'data': ''
    }
    res.json(params)
  }).catch(err => {
    res.json(err)
  })
})

module.exports = router
