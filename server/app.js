const express = require('express')
const config = require('./config/config.js')
const bodyParser = require('body-parser')
const index = require('./router/index.js')
const port = config.port
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api', index)
app.listen(port, () => {
  console.log('app listening in ' + port)
})
