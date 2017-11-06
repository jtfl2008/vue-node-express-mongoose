const express = require('express')
const config = require('./config/config.js')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const index = require('./router/index.js')
const port = config.port
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: config.secret,
  cookie: {maxAge: 1000 * 60},
  httpOnly: true
}))
app.use((req, res, next) => {
	if (req.cookies.userName) {
		next()
	} else {
		// 不需要登录的
		if (req.originalUrl === '/api/lists' || req.originalUrl === '/api/login' || req.originalUrl === '/api/registe' || req.originalUrl === '/api/logout' ) {
			next()
		} else {
			let params = {
	      'code': '401',
	      'message': '未登陆',
	      'data': false
	    }
	    res.json(params)
		}
  }
})
app.use('/api', index)
app.listen(port, () => {
  console.log('app listening in ' + port)
})
