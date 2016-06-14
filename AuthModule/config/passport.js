var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
var config = require('../config/main')
var configfile = require('config')
var log = require('../config/logger')
var restCall = require('request')
var clientsDB = configfile.get('Clients.DB')

var url = clientsDB.url + ':' + clientsDB.port + '/' + clientsDB.version + '/users'
// TODO : Better logging
// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
  log.info('Passport JWT strategy')
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader()
  opts.secretOrKey = config.secret
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    log.debug('Passport-Jwt Request received from Jwt payload \n\t => ' + JSON.stringify(jwt_payload) + '\n')
    restCall.get(url + '/id/' + jwt_payload._id, function optionalCallback (error, httpResponse, user) {
      log.debug('Passport-Jwt Response from url : ' + url + '/id/' + jwt_payload._id + ' received : \n\t => ' + user + '\n')
      if (error) {
        log.error('Passport-Jwt Error received \n\t => ' + error)
        return done(error, false)
      }
      if (user && user._id) {
        log.info('Authorized for id ' + jwt_payload._id)
        log.debug('Passport Jwt strategy Authorized payload User: \n\t => ' + user + '\n')
        done(null, user)
      } else {
        log.info('Authorized failed for id ' + jwt_payload._id)
        log.debug('Passport Jwt strategy NOT Authorized payload User: \n\t => ' + user + '\n')
        done(null, false)
      }
    })
  }))
}
