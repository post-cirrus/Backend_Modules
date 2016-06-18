
var express = require('express')
var log = require('../config/logger')
var restCall = require('request')
var jwtConfig = require('../config/main')
var bcrypt = require('bcrypt')
var configfile = require('config')
var clientsDB = configfile.get('Clients.DB')
var router = express.Router()
var jwt = require('jsonwebtoken')

var url = clientsDB.url + ':' + clientsDB.port + '/' + clientsDB.version + '/users'

/**
* @api {post} /register Request Users password
* @apiVersion 0.0.1
* @apiExample {curl} Example usage:
*     curl -i http://clients.db.cirrus.io:10083/v1/authapi/register
* @apiName Register
* @apiGroup AuthAPI
*/
router.post('/authenticate', function (request, response, next) {
  log.debug('Authentication request received for Username: ' + request.body.username)
  if (!request.body.username) {
    response.status(200).json({ success: false, message: 'Empty username not allowed.' })
  } else {
    restCall.get(url + '/username/' + request.body.username, function (error, httpResponse, user) {
      if (!error && response.statusCode === 200) {
        log.debug('CirrusDB query response URL:' + url + '/username/' + request.body.username + '\n\t' + JSON.parse(user))
        bcrypt.compare(request.body.password, JSON.parse(user).password, function (error, isMatch) {
          if (isMatch && !error) {
            log.info('Authentication Success for username "' + request.body.username)
            // Create JWT Token
            var token = jwt.sign(JSON.parse(user), jwtConfig.secret, {
              expiresIn: 30 // in seconds
            })
            response.status(200).json({ success: true, token: 'JWT ' + token })
          } else {
            log.info('Authentication Failed for username "' + request.body.username)
            log.debug('Error: ' + error)
            response.status(401).json({ success: false, message: 'Authentication Failed' })
          }
        })
      }
    })
  }
})

/**
* @api {post} /register Request Users password
* @apiVersion 0.0.1
* @apiExample {curl} Example usage:
*     curl -i http://clients.db.cirrus.io:10083/v1/authapi/register
* @apiName Register
* @apiGroup AuthAPI
*
* @apiParam {String} username Users username.
* @apiParam {String} username Users username.
* @apiParam {String} name Users name.
* @apiParam {String} password Users password (uncrypted).
* @apiParam {String} email Users email.
* @apiParam {String} role Users role.
* @apiParam {String} oauthprovider Users oauth provider.
*
* @apiSuccess {String} success Success true: User created/false: Some Error.
* @apiSuccess {String} message Success message.
* @apiSuccess {Object[]} User Users information.
* @apiSuccess {Stirng} User._id User unique ID.
* @apiSuccess {String} User.name Users name.
* @apiSuccess {String} User.password Users password.
* @apiSuccess {String} User.username Users username.
* @apiSuccess {String} User.email Users email.
* @apiSuccess {Obejct[]} User.devices Users list of devices.
* @apiSuccess {Object[]} User.oauth Users list of OAuth providers.
* @apiSuccess {String} User.role Users access role
*
* @apiSuccessExample {json} Success-Response:
*   HTTP/1.1 200 ok
*     {
*       {
*         "success": true,
*         "message": "Successfully created user",
*         "user": {
*           "__v": 0,
*           "username": "alessio",
*           "password": "$2a$10$8i4LVDaFstTeM7gdaNo98O.kG2kzPwVx7gSzp/OH0nFI9SRWR7mdu",
*           "email": "alessio.azevedo@pt.lu",
*           "name": "Alessio Azevedo",
*           "_id": "575c1351bb3cae7344157f00",
*           "devices": [],
*           "oauth": [],
*           "role": "Family"
*         }
*       }
*     }
*
* @apiError BadRequest Duplicate entry
*
* @apiErrorExample {json} Error-Response:
*  HTTP/1.1 400 Bad Request
*    {
*       "success": false,
*       "errcode": 11000,
*       "message": "E11000 duplicate key error collection: Cirrus.users index: keyname_1 dup key: { : \"keyname\" }"
*    }
*
* @apiError Empty The username or password is not set
*
* @apiErrorExample {json} Error-Response:
*  HTTP/1.1 406 Not Acceptable
*    {
*      "success": false,
*      "message": "Empty username or password not allowed."
*    }
*
* @apiError BadRequest Duplicate entry
*
* @apiErrorExample {json} Error-Response:
*  HTTP/1.1 400 Bad Request
*    {
*       "success": false,
*       "message": "E11000 duplicate key error collection: Cirrus.users index: keyname_1 dup key: { : \"keyname\" }"
*    }
*
*/
// TODO : Review how you parse the request.body in the debug log
router.post('/register', function (request, response) {
  if (!request.body.email || !request.body.password) {
    response.status(406).json({ success: false, message: 'Please enter username and password.' })
  } else {
    log.info('Register request received "/register" for User "' + request.body + '"')
    var User = {
      'username': request.body.username,
      'password': request.body.password,
      'email': request.body.email,
      'name': request.body.name,
      'role': request.body.role
    }
    restCall.post({url: url + '/', form: User}, function optionalCallback (err, httpResponse, body) {
      log.debug('Register request action to CirrusDbQL at url ' + url + '/ \n\t => Form: "' + JSON.stringify(User) + '"')
      if (err) {
        log.error('Error: ' + err + ' httpResponse: ' + httpResponse + ' body: ' + body)
        return response.status(404).json(err)
      }
      log.debug('Response received from REST call to : ' + url + '/\n => "' + JSON.stringify(body) + '"')
      if (body) {
        if (JSON.parse(body).success) {
          log.info('Successfully created new user: ' + body)
          var token = jwt.sign(JSON.parse(body).user, jwtConfig.secret, {
            expiresIn: '1d' // in seconds
          })
        //  response.status(200).json({ success: true, token: 'JWT ' + token })
          response.status(200).json({success: true, message: 'Successfully created user', token: 'JWT ' + token, user: JSON.parse(body).user})
        } else {
          log.info('Not Created. UnSuccessfully : ' + JSON.stringify(body))
          response.status(400).json({success: false, message: 'Not Created. UnSuccessfully: ' + JSON.stringify(body)})
        }
      } else {
        response.status(400).json({success: false, message: 'Error: ' + body})
      }
    })
  }
})

module.exports = router
