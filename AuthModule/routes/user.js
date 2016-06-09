
var express = require('express')
var log = require('../config/logger')
var restCall = require('request')
var bcrypt = require('bcrypt')
var config = require('config')
var clientsDB = config.get('Clients.DB')
var router = express.Router()

var url = clientsDB.url + ':' + clientsDB.port + '/' + clientsDB.version + '/users'

/**
* @api {post} /authenticate
*/
/* router.post('/authenticate', function (request, response, next) {
  log.debug('Authentication request received for Username: ' + request.body.username)
  if (!request.body.email || !request.body.password) {
      response.status(200).json({ success: false, message: 'Please enter username and password.' })
  } else {

  }

  if (!req.body) {
    log.info('Authentication request received for Username: ' + req.body.username)
    restCall.post('http://clients.db.cirrus.io:8080/v1/users/' + req.body.username + '/password', function (error, response, body) {
      if (!error && response.statusCode === 200) {
        log.info(body)
        if (bcrypt.compareSync(req.body.password, body)) {
          resp.status(200).json({ success: true, message: 'Authentication Success' })
        } else {
          resp.status(401).json({ success: false, message: 'Authentication Failed' })
        }
      } else {
        log.error(error)
      }
    })
  } else {
    return resp.status(200).json({susccess: false, message: 'Empty username not allowed.'})
  }
})*/


/**
* @api {post} /register Request Users password
* @apiVersion 0.0.1
* @apiExample {curl} Example usage:
*     curl -i http://clients.db.cirrus.io:10083/v1/authapi/register
* @apiName Register
* @apiGroup AuthAPI
*
* @apiParam {String} username Users username.
* @apiParam {String} name Users name.
* @apiParam {String} password Users password (uncrypted).
* @apiParam {String} email Users email.
* @apiParam {String} role Users role.
* @apiParam {String} oauthprovider Users oauth provider.
*
* @apiSuccessExample {json} Success-Response:
*   HTTP/1.1 200 ok
*     {
*       "success": true,
*       "message": "Successfully created user",
*       "user": "{\"__v\":0,\"username\":\"jero\",\"password\":\"$2a$10$HvuJPEH8S8ovWInlCyT5DewaERRjV0JLOzzCysPybz1/zWDH4is.W\",
                \"email\":\"azevedo@pt.lu\",\"name\":\"Jeronimo Azevedo\",\"_id\":\"5759d17cc16afc95430526c0\",\"devices\":[],
                \"oauth\":[],\"role\":\"Admin\"}"
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
* @apiError Empty The username is not set
*
* @apiErrorExample {json} Error-Response:
*  HTTP/1.1 406 Not Acceptable
*    {
*      "success": false,
*      "message": "Empty username not allowed."
*    }
*
*/
router.post('/register', function (request, response) {
  if (!request.body.email || !request.body.password) {
    response.status(200).json({ success: false, message: 'Please enter username and password.' })
  } else {
    log.debug('Register request received at url "/register" for User "' + request.body + '"')
    var User = {
      'username': request.body.username,
      'password': request.body.password,
      'email': request.body.email,
      'name': request.body.name,
      'role': request.body.role
    }
    restCall.post({url: url + '/create', form: User}, function optionalCallback (err, httpResponse, body) {
      log.debug('Calling URL ' + url + '/create')
      if (err) {
        log.error('Error: ' + err + ' httpResponse: ' + httpResponse + ' body: ' + body)
        return response.status(404).json(err)
      }
      log.debug('body: ' + JSON.parse(body).success)
      if (JSON.parse(body).success) {
        log.info('Successfully created new user: ' + body)
        response.status(200).json({success: true, message: 'Successfully created user', user: JSON.parse(body).user})
      } else {
        log.info('Not Created. UnSuccessfully : ' + body)
        response.status(200).json({success: false, message: 'Not Created. UnSuccessfully: ' + JSON.parse(body).message})
      }
    })
  }
})

module.exports = router
