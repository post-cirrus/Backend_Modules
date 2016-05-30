var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var config = require('config')
var user = require('./routes/user')
var log = require('./config/logger')

var app = express()
var db = config.get('Database')

mongoose.connect('mongodb://' + db.url + ':' + db.port + '/Cirrus')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var port = process.env.PORT || 8080

app.use('/', user)

app.listen(port, function () {
  log.info('Starting CirrusDbQL server on port ' + port)
})
