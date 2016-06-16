var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var config = require('config')
var user = require('./routes/user')
var community = require('./routes/community')
var subscriptionPlan = require('./routes/subscriptionplans')
var log = require('./config/logger')
var passport = require('passport')
require('./config/passport')(passport)

var app = express()
var db = config.get('Database')

var port = process.env.PORT || 10083

// Log Requests
app.use(require('morgan')('combined', { 'stream': log.stream }))

mongoose.connect('mongodb://' + db.url + ':' + db.port + '/Cirrus')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())

// Expose the API documentation
app.use('/v1/doc', passport.authenticate('jwt', { session: false }), express.static('doc'))

// Expose users REST API interface
app.use('/v1/users', user)
app.use('/v1/community', community)
app.use('/v1/subscription', subscriptionPlan)

/**
*
* @api {get} / Request API name, version and description
* @apiVersion 0.0.1
* @apiExample {curl} Example usage:
*     curl -i http://clients.db.cirrus.io:10083/
*
* @apiName GetAPI
* @apiGroup Users
*
* @apiSuccess {String} name API name.
* @apiSuccess {Stirng} version API version.
* @apiSuccess {String} description API description.
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 ok
*   {
*     "name": "CirrusDbQL API",
*     "version": "0.0.1",
*     "description": "REST API Query interface for Client.Cirrus.io DB"
*   }
*
**/
app.use('/version', passport.authenticate('jwt', { session: false }), function (request, response, next) {
  response.status(200).json({name: 'CirrusDbQL API', version: '0.0.1', description: 'REST API Query interface for Client.Cirrus.io DB'})
})

app.listen(port, function () {
  log.info('Starting CirrusDbQL server on port ' + port)
})
