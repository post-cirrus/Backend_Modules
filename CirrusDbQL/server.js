var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var config = require('config')
var user = require('./routes/user')
var log = require('./config/logger')

var app = express()
var db = config.get('Database')

var port = process.env.PORT || 10083

// Log Requests
app.use(require('morgan')('combined', { 'stream': log.stream }))

mongoose.connect('mongodb://' + db.url + ':' + db.port + '/Cirrus')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Expose users REST API interface
app.use('/v1/users', user)

app.listen(port, function () {
  log.info('Starting CirrusDbQL server on port ' + port)
})
