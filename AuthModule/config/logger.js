var winston = require('winston');
var fs = require('fs');
var config = require ('config');
var pjson = require('../package.json');

var cfgLog = config.get('Loggers');
var transports = [];

//var defaultLogger = true;


// check if any looging is active
if (cfgLog.logToConsole == false && cfgLog.logToFile == false && cfgLog.logToSyslogNg == false) {
  console.error("Detected that no logging option has been enabled!!! Enabling File logging and\n"+
    "setting logging level to INFO. Consider selecting a logging option.");
  // Variable set and used to define a default logger if none is set
  var defaultLogger = true;
}

var formatter = function(options) {
  return options.timestamp()+'|'+ options.level.toUpperCase()+'|'+pjson.name+':'+pjson.version+'|'+
    (undefined !== options.message ? options.message : '') +
           (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
}

var timestamp = function() {
  return new Date().toISOString().
  replace(/T/, ' '). // remove the 'T'
  replace(/\..+/, ''); // remove the . and everything after
}

if (!fs.existsSync(cfgLog.logDir)){
  fs.mkdirSync(cfgLog.logDir);
}

if (cfgLog.logToConsole) {
  transports.push(new (winston.transports.Console)({
    colorize : true,
    json: false,
    level : (cfgLog.debug) ? 'debug' : 'info',
    timestamp: timestamp,
    formatter : formatter
  }));
}

// Logging to file, when filew reaches the maxSize an new file will be creted.
// Logging filename is the Module name as specified in the package.json file.
if (defaultLogger) {
  transports.push(new (winston.transports.File)({
    name: 'info',
    filename: cfgLog.logDir+'/'+pjson.name+'.log',
    level: (cfgLog.debug) ? 'debug' : 'info',
    json: cfgLog.logFileJson,
    timestamp: timestamp,
    formatter : formatter,
    maxSize : cfgLog.maxSize,
    maxFiles : cfgLog.maxFiles,
    tailable : cfgLog.tailable,
    colorize: cfgLog.logFileColorize
  }));
}

if (cfgLog.logToSyslogNg) {
  transports.push(new (winston.transports.Http)({
    host : cfgLog.host,
    port : cfgLog.port,
    path : cfgLog.location,
  }));
}

var logger = new winston.Logger({
  transports : transports,
  exceptionHandlers: [
      new (winston.transports.File)({
        filename : cfgLog.logDir+'/'+pjson.name+'_'+pjson.version+'_exceptionHandlers.log',
        json: false
      })
  ],
  exitOnError: false
});

module.exports = logger;
