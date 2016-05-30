/**
 * @apiVersion 0.0.1
 */

var express = require('express')
var log = require('../config/logger')
var User = require('../models/User.js')
var router = express.Router()

/**
* @api {get} /user
*/

router.get('/user', function (request, response, next) {
  User.find(function (err, users) {
    if (err) {
      log.error('Error while calling GET /user ' + err)
      return next(err)
    }
    response.json(users)
  })
})

router.route('/user/:id')
  /**
  * @api {get} /user/:id
  */
  .get(function (request, response, next) {
    User.findById(request.params.id, function (err, users) {
      if (err) {
        log.error('Error while calling GET /user ' + err)
        return next(err)
      }
      response.json(users)
    })
  })
  /**
  * @api {delete} /user/:id
  */
  .delete(function (request, response, next) {
    User.findByIdAndRemove(request.params.id, request.body, function (err, post) {
      if (err) {
        log.error('Error while calling DELETE /user/:id ' + err)
        return next(err)
      }
      response.json(post)
    })
  })

/**
* @api {post} /user/create
*
*/
router.post('/user/create', function (request, response, next) {
  User.create(request.body, function (err, post) {
    if (err) {
      log.error('Error while calling POST /user/create ' + err)
      return next(err)
    }
    response.json(post)
  })
})

module.exports = router
