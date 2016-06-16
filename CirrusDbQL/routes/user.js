// TODO: Review webservice description, is not up to date

/**
*
* @apiDefine UserNotFound
* @apiError UserNotFound The id of the user was not found
*
* @apiErrorExample {json} Error-Response:
*  HTTP/1.1 404 Not Found
*    {
*      "success": false,
*      "message": "User not found with id: " + id
*    }
*/

/**
*
* @apiDefine NoValidId
* @apiError NoValidId The id is not valid
*
* @apiErrorExample {json} Error-Response:
*  HTTP/1.1 406 Not Acceptable
*    {
*      "success": false,
*      "message": "This is not a valid User id: " + id
*    }
*
*/

var express = require('express')
var log = require('../config/logger')
var User = require('../models/User')
var router = express.Router()

/**
*
* @api {get} /list Request Users list
* @apiVersion 0.0.1
* @apiExample {curl} Example usage:
*     curl -i http://clients.db.cirrus.io:10083/v1/users/list
*
* @apiName GetList
* @apiGroup Users
*
* @apiSuccess {Object[]} User Users information.
* @apiSuccess {Stirng} User._id User unique ID.
* @apiSuccess {String} User.name Users name.
* @apiSuccess {String} User.password Users password.
* @apiSuccess {String} User.username Users username.
* @apiSuccess {String} User.email Users email.
* @apiSuccess {Obejct[]} User.devices Users devices.
* @apiSuccess {Object[]} User.oauth Users OAuth providers.
* @apiSuccess {String} User.role Users access role
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 ok
*   [
*     {
*       "_id": "574f31e3f5bb2b6f7ec4798e",
*       "name": "Nadia",
*       "password": "$2a$10$6Mq0bcVCZfQ.DKNPshN8vuY67Hvg0wlIxAecdCHXZ3JC1mtZUuUkG",
*       "username": "nborgia",
*       "email": "nborgia@pt.lu",
*       "__v": 0,
*       "devices": [],
*       "oauth": [],
*       "role": "Family"
*     },
*     {
*       "_id": .....,
*       ......
*     }
*   ]
*  @apiError Empty Client.Cirrus.io DB is Empty.
*
*  @apiErrorExample Error-Response:
*   HTTP/1.1 200 Empty
*     {
*       "success": false,
*       "message": "Client.Cirrus.io DB is Empty."
*     }
*
*/
router.route('/') // list all users
  .get(function (request, response, next) {
    User.find(function (err, users) {
      if (err) {
        log.error('Error while calling GET /user ' + err)
        return next(err)
      }
      log.debug('Found ' + users.length)
      if (users.length <= 0) {
        response.status(200).json({success: false, message: 'Client.Cirrus.io DB is Empty.'})
      }
      response.status(200).json(users)
    })
  })
  /**
  * @api {post} /create Create User
  * @apiVersion 0.0.1
  * @apiExample {curl} Example usage:
  *     curl -i http://clients.db.cirrus.io:10083/v1/users/foobar
  * @apiName PostCreate
  * @apiGroup Users
  *
  * @apiParam {String} name Users name.
  * @apiParam {String} password Users password (uncrypted).
  * @apiParam {String} username Users username.
  * @apiParam {String} email Users email.
  * @apiParam {String} role Users role.
  * @apiParam {String} oauthprovider Users oauth provider.
  *
  * @apiSuccess {String} Success true: User created/false: Some Error.
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
  *       "success": true,
  *       "user": {
  *         "__v": 0,
  *         "name": "Nadia",
  *         "password": "$2a$10$oSVe3ptB9rkcPmPb.xWBbOfa0qBs8l3de5i.hTEvGsqJkXqnNu5Be",
  *         "username": "nborgia",
  *         "email": "nborgia@pt.lu",
  *         "_id": "575c11e8bb3cae7344157eff",
  *         "devices": [],
  *         "oauth": [],
  *         "role": "Family"
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
  */
  .post(function (request, response, next) {
    // TODO : Review the debug message, define a middleware
    log.debug('Create request received from: \n' + '\tRemote ip : ' + request.ip + '\n' + '\tand body Form : "' + JSON.stringify(request.body) + '"')
    User.create(request.body, function (error, user) {
      if (error) {
        log.error('Error while creating user \n\t"' + JSON.stringify(request.body) + '" in DB.\n\t ERROR: ' + error)
        return response.status(400).json({success: false, errcode: error.code, message: error.errmsg})
      }
      log.debug('User information: "' + user + '" => CREATED IN CLIENTS.DB.CIRRUS.IO')
      response.status(200).json({success: true, user: user})
    })
  })

router.route('/:id')
/**
*
* @api {get} /id/:id Request User by id
* @apiVersion 0.0.1
* @apiExample {curl} Example usage:
*     curl -i http://clients.db.cirrus.io:10083/v1/users/5755d16266176f6d3ec888ce
* @apiName GetUserById
* @apiGroup Users
*
* @apiParam {Number} id Users unique id.
*
* @apiSuccess {Object[]} User Users information.
* @apiSuccess {Stirng} User._id User unique ID.
* @apiSuccess {String} User.name Users name.
* @apiSuccess {String} User.password Users password.
* @apiSuccess {String} User.username Users username.
* @apiSuccess {String} User.email Users email.
* @apiSuccess {Obejct[]} User.devices Users devices.
* @apiSuccess {Object[]} User.oauth Users OAuth providers.
* @apiSuccess {String} User.role Users access role
*
* @apiSuccessExample {json} Success-Response:
*   HTTP/1.1 200 ok
*   [
*     {
*       "_id": "574f31e3f5bb2b6f7ec4798e",
*       "name": "Nadia",
*       "password": "$2a$10$6Mq0bcVCZfQ.DKNPshN8vuY67Hvg0wlIxAecdCHXZ3JC1mtZUuUkG",
*       "username": "nborgia",
*       "email": "nborgia@pt.lu",
*       "__v": 0,
*       "devices": [],
*       "oauth": [],
*       "role": "Family"
*     },
*     {
*       "_id": .....,
*       ......
*     }
*   ]
* @apiUse UserNotFound
* @apiUse NoValidId
*
*/
  .get(function (request, response, next) {
    // This checks the params.id against the mongodb _id
    if (request.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      User.findById(request.params.id, function (err, user) {
        if (err) {
          log.error('Error while calling GET /user. ERROR: ' + err)
          return next(err)
        }
        if (user.length <= 0) {
          response.status(404).send({success: false, message: 'User not found id: ' + request.params.id})
        }
        response.status(200).json(user)
      })
    } else {
      log.error('Error while calling GET /user. ERROR: Invalid id:' + request.params.id)
      response.status(200).send({susccess: false, message: 'This is not a valid User id: ' + request.params.id})
    }
  })

  /**
  *
  * @api {delete} /:id Delete a User
  * @apiVersion 0.0.1
  * @apiExample {curl} Example usage:
  *     curl -i -X DELETE http://clients.db.cirrus.io:10083/v1/users/5755d16266176f6d3ec888ce
  * @apiName DeleteUser
  * @apiGroup Users
  *
  * @apiParam {Number} id Users unique id.
  *
  * @apiSuccess {String} success  Success status.
  * @apiSuccess {String} message  Message of event.
  *
  * @apiSuccessExample {json} Success-Response:
  *   HTTP/1.1 200 ok
  *    {
  *      "success": true,
  *      "message": "User with id " + id + " deleted."
  *    }
  * @apiUse UserNotFound
  * @apiUse NoValidId
  *
  */
  .delete(function (request, response, next) {
    if (request.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      User.findByIdAndRemove(request.params.id, request.body, function (err, user) {
        if (err) {
          log.error('Error while calling DELETE /user/:id. ERROR:' + err)
          return response.staus(200).send(err)
        }

        log.debug('Delete Request received for id: ' + request.params.id)

        if (user !== null) {
          log.debug('Found User "' + user + '"')
          log.debug('User "' + user + '" => DELETED')
          response.status(200).json({success: true, message: 'User with id ' + request.params.id + ' deleted.'})
        } else {
          log.debug('No user found with id :' + request.params.id)
          response.status(404).json({success: true, message: 'User with id ' + request.params.id + ' not found.'})
        }
      })
    } else {
      log.error('Error while calling GET /user. ERROR: Invalid id:' + request.params.id)
      response.satus(200).send({susccess: false, message: 'This is not a valid User id: ' + request.params.id})
    }
  })
  /**
  * @api {put} /:id Update User's information
  * @apiVersion 0.0.1
  * @apiExample {curl} Example usage:
  *      curl -i -X PUT http://clients.db.cirrus.io:10083/v1/users/5755d16266176f6d3ec888ce
  *
  */
  .put(function (request, response, next) {
  })

  /**
  *
  * @api {get} /username/:username Request User by username
  * @apiVersion 0.0.1
  * @apiExample {curl} Example usage:
  *     curl -i http://clients.db.cirrus.io:10083/v1/users/foobar
  * @apiName GetUserByUsername
  * @apiGroup Users
  *
  * @apiParam {String} username Users username.
  *
  * @apiSuccess {Object[]} User Users information.
  * @apiSuccess {Stirng} User._id User unique ID.
  * @apiSuccess {String} User.name Users name.
  * @apiSuccess {String} User.password Users password.
  * @apiSuccess {String} User.username Users username.
  * @apiSuccess {String} User.email Users email.
  * @apiSuccess {Obejct[]} User.devices Users devices.
  * @apiSuccess {Object[]} User.oauth Users OAuth providers.
  * @apiSuccess {String} User.role Users access role
  *
  * @apiSuccessExample {json} Success-Response:
  *   HTTP/1.1 200 ok
  *     {
  *       "_id": "574f31e3f5bb2b6f7ec4798e",
  *       "name": "Nadia",
  *       "password": "$2a$10$6Mq0bcVCZfQ.DKNPshN8vuY67Hvg0wlIxAecdCHXZ3JC1mtZUuUkG",
  *       "username": "nborgia",
  *       "email": "nborgia@pt.lu",
  *       "__v": 0,
  *       "devices": [],
  *       "oauth": [],
  *       "role": "Family"
  *     }
  *
  *  @apiError UserNotFound The username of the user was not found
  *
  *  @apiErrorExample {json} Error-Response:
  *   HTTP/1.1 404 Not Found
  *     {
  *       "success": false,
  *       "message": "User not found with: " + username
  *     }
  *
  */
router.route('/username/:username')
  .get(function (request, response, next) {
    User.findOne({username: request.params.username}, function (err, user) {
      if (err) {
        log.error('Error while calling GET :username. ERROR: ' + err)
        return next(err)
      }
      if (!user) {
        response.send({success: false, message: 'No user found with username: ' + request.params.username})
      }
      log.info('Found user \n\t' + user)
      response.status(200).json(user)
    })
  })

module.exports = router
