var winston = require('winston');
var elastic = require('winston-elasticsearch');

var esTransportOpts = {
  level: 'info',
  clientOps: {
    host : 'http://192.168.82.102:9200'
  }
};
winston.add(winston.transports.Elasticsearch, esTransportOpts);

// - or -

//var logger = new winston.Logger({
//  transports: [
//    new Elasticsearch(esTransportOpts)
//  ]
//});

//logger.info('Hello Elasticsearch I am winston and I am trying to connect!!');
