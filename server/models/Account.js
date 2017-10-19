const mongoose = require('./db.js')
const Schema = mongoose.Schema

const createAccountSchema = new Schema({
  username: String,
  pass: String,
  phone: String,
  email: String,
  brithday: String,
  gender: String,
  name: String,
  create_user: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  update_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('account', createAccountSchema)
