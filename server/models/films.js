const mongoose = require('./db.js')
const ObjectId = mongoose.Schema.Types.ObjectId
const Schema = mongoose.Schema

const filmSchema = new Schema({
  // id: { type: String, required: true },
  cover: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  star: { type: String, required: true },
  rate: { type: String, required: true },
  short_comment: { type: String, required: true },
  directors: { type: String, required: true },
  actors: { type: Array, required: true },
  duration: { type: String, required: true },
  region: { type: String, required: true },
  types: { type: Array, required: true },
  release_year: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
})
module.exports = mongoose.model('Film', filmSchema)
