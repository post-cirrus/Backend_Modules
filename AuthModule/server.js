var express = require('express');
var bodyParser = require('body-parser');
var config = require ('config');
var log = require ('./config/logger');
var app = express();

var cfgAuth = config.get('Authentication');

// Logging output of express js to winston
//app.use(require('morgan')("combined", { "stream": log.stream }));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./models/routes.js')(app, log);

app.listen(cfgAuth.port, function() {
  log.info('Starting Authenticaon Module on port '+cfgAuth.port);
})
