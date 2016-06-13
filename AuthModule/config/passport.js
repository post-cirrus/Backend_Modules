var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
var config = require('../config/main')
var configfile = require('config')
var log = require('../config/logger')
var restCall = require('request')
var clientsDB = configfile.get('Clients.DB')

var url = clientsDB.url + ':' + clientsDB.port + '/' + clientsDB.version + '/users'

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
  log.info('Passport JWT strategy')
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader()
  opts.secretOrKey = config.secret
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    restCall.get({url: url + '/id/', form: {id: jwt_payload.id}}, function optionalCallback (err, httpResponse, user) {
      if (err) {
        return done(err, false)
      }
      if (user) {
        done(null, JSON.parse(user))
      } else {
        done(null, false)
      }
    })
  }))
}
