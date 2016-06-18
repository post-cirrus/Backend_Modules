var express = require('express')
var bodyParser = require('body-parser')
var user = require('./routes/user')
var log = require('./config/logger')
var pj = require('./package.json')
var passport = require('passport')
require('./config/passport')(passport)

var app = express()
var port = process.env.PORT || 10080

// Log requests
app.use(require('morgan')('combined', { 'stream': log.stream }))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())

// Expose the API documentation
app.use('/v1/doc', passport.authenticate('jwt', { session: false }), express.static('doc'))
app.use('/v1/authapi', user)

/**
*
* @api {get} /versions Request API name, version and description
* @apiVersion 0.0.1
* @apiExample {curl} Example usage:
*     curl -i http://authentication.cirrus.io:10080/
*
* @apiName GetAPI
* @apiGroup Auth
*
* @apiSuccess {String} name API name.
* @apiSuccess {Stirng} version API version.
* @apiSuccess {String} description API description.
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 ok
*   {
*     "name": "AuthModule API",
*     "version": "0.0.1",
*     "description": "Module used to authenticate and authorize cirrus users."
*   }
*
**/
app.use('/version', passport.authenticate('jwt', { session: false }), function (request, response, next) {
  response.status(200).json({name: pj.name, version: pj.version, description: pj.description})
})

app.listen(port, function () {
  log.info('Starting Authentication API server on port ' + port)
})
