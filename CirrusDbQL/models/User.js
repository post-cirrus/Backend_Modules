var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  name: String,
  username: String,
  password: String,
  email: String
})

module.exports = mongoose.model('User', UserSchema)
