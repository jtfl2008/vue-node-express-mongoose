const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const DB_URL = 'mongodb://localhost:27017/db'

mongoose.connect(DB_URL)

mongoose.connection.on('connect', function () {
  console.log('Mongoose connection open to ' + DB_URL)
})

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err)
})

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected')
})

mongoose.exports = mongoose
