const express = require('express')
const router = express.Router()
const config = require('../config/config.js')
const crypto = require('crypto')
const Film = require('../models/films.js')
const User = require('../models/user.js')

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
        .sort({update_at: 1})
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

// 注册
router.all('/registe', (req, res) => {
  User.find({username: req.body.username})
  .sort({update_at: -1})
  .then(doc => {
    if (!doc.length) {
      User.create(req.body, (err, doc) => {
        if (err) {
          res.json(err)
        } else {
          let params = {
            'code': '200',
            'message': '注册成功',
            'data': doc.username
          }
          res.json(params)
        }
      })
    } else {
      let params = {
        'code': '205',
        'message': '该账号已被注册',
        'data': ''
      }
      res.json(params)
    }
  }).catch(err => {
    res.json(err)
  })
})
// 登录
router.all('/login', (req, res) => {
  User.find({username: req.body.username})
  .sort({update_at: -1})
  .then(doc => {
    if (doc.length) {
      User.find({username: req.body.username})
      .then(docPwd => {
        function getCrypto (val) {
          let md5 = crypto.createHash('md5')
          return md5.update(val + config.secret).digest('hex')
        }
        if (docPwd.length && doc[0].password === getCrypto(req.body.password)) {
          let params = {
            'code': '200',
            'message': '登录成功',
            'data': docPwd[0]
          }
          res.json(params)
        } else {
          let params = {
            'code': '400',
            'message': '密码错误',
            'data': ''
          }
          res.json(params)
        }
      })
    } else {
      let params = {
        'code': '400',
        'message': '用户名错误',
        'data': ''
      }
      res.json(params)
    }
  })
})
module.exports = router
