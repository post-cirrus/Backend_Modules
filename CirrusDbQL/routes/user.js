/**
 * @apiVersion 0.0.1
 */

var express = require('express')
var log = require('../config/logger')
var User = require('../models/User.js')
var router = express.Router()

/**
* @api {get} /list/users
*/
router.get('/list/users', function (request, response, next) {
  User.find(function (err, users) {
    if (err) {
      log.error('Error while calling GET /user ' + err)
      return next(err)
    }
    if (!users) {
      response.send({success: false, message: 'No Users found.'})
    }
    response.json(users)
  })
})

router.route('/user/:id')
  /**
  * @api {get} /user/:id
  */
  .get(function (request, response, next) {
    // This checks the params.id against the mongodb _id
    if (request.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      User.findById(request.params.id, function (err, user) {
        if (err) {
          log.error('Error while calling GET /user. ERROR: ' + err)
          return next(err)
        }
        if (!user) {
          response.send({susccess: false, message: 'No user found with id: ' + request.params.id})
        }
        response.json(user)
      })
    } else {
      log.error('Error while calling GET /user. ERROR: Invalid id:' + request.params.id)
      response.send({susccess: false, message: 'No valid user id: ' + request.params.id})
    }
  })
  /**
  * @api {delete} /user/:id
  */
  .delete(function (request, response, next) {
    User.findByIdAndRemove(request.params.id, request.body, function (err, post) {
      if (err) {
        log.error('Error while calling DELETE /user/:id. ERROR:' + err)
        return next(err)
      }
      response.json(post)
    })
  })

/**
* @api {post} /user/:username/password
*
*/
router.route('/user/:username/password')
  .post(function (request, response, next) {
    User.findOne({username: request.params.username}, function (err, user) {
      if (err) {
        log.error('Error while calling POST /user/create ' + err)
        return next(err)
      }
      if (!user) {
        response.send({success: false, message: 'No user found with username: ' + request.params.username})
      }
      response.json(user.password)
    })
  })

/**
* @api {post} /user/create
*
*/
router.route('/user/create')
  .post(function (request, response, next) {
    User.create(request.body, function (err, post) {
      if (err) {
        log.error('Error while calling POST /user/create ' + err)
        return next(err)
      }
      response.json(post)
    })
  })

module.exports = router
