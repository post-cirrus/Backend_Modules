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
var Community = require('../models/Community')
var router = express.Router()

/**
*
*
*/
router.route('/')
  .post(
    function (request, response, next) {
      log.debug('Create request received from: \n' + '\tRemote ip : ' + request.ip + '\n' + '\t and body Form : "' + JSON.stringify(request.body) + '"')
      Community.create(request.body, function (error, community) {
        if (error) {
          log.error('Error while creating Community in DB. ERROR:  ' + error)
          return response.status(400).json({success: false, errcode: error.code, message: error.errmsg})
        }
        log.debug('Comunity created: "' + community + '" => CREATED IN CLIENTS.DB.CIRRUS.IO')
        response.status(200).json({success: true, community: community})
      })
    }
  )

router.route('/:id/adduser')
/*  .get({ })
  .delete({ })*/
  .put(
    function (request, response, next) {
      log.info('Updating Community uuid "' + request.params.id + '" with params \n\t"' + JSON.stringify(request.body) + '"')
      Community.findByIdAndUpdate(request.params.id, {$push: {'users': request.body.user}}, {safe: true, upsert: true, new: true}, function (error, community) {
        if (error) {
          log.error('Error while updating Community ' + request.params.id + ' in DB with value ' + request.body.user + '. ERROR:  ' + error)
          return response.status(400).json({success: false, errcode: error.code, message: error.errmsg})
        }
        log.info('Updated Community "' + community + '"')
        response.status(200).json({success: true, community: community})
      })
    }
  )

module.exports = router
