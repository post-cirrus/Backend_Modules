var winston = require('winston');
require('winston-logstash');
/*var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Http)({
      host : '192.168.82.102',
      port : 31311
    })
  ]
});*/

var logger = new (winston.Logger)({
  transports: [
    new(winston.transports.Logstash)({
      ort: 9998,
      node_name: 'AuthModule',
      host: 'logger.cirrus.io'
    })
  ]

logger.log('info', 'Wiston Hello simple log');
logger.info('Hello log with metas',{color: 'blue', geo: {country:'France',city: "Paris"} });
