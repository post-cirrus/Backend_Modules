var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
var config = require('../config/main')
var log = require('../config/logger')
var User = require('../models/User')

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
  log.info('Passport JWT strategy')
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader()
  opts.secretOrKey = config.secret
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    log.debug('passport payload: ' + jwt_payload._id)
    User.findById(jwt_payload._id, function (error, user) {
      if (error) {
        log.error('Passport error: ' + error)
        return done(error, false)
      }
      if (user) {
        log.info('Passport strategy user found : ' + user)
        done(null, user)
      } else {
        log.info('Passport strategy NO user: ' + user)
        done(null, false)
      }
    })
  }))
}
