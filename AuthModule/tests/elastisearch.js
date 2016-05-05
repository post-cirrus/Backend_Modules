var config = require('config');
var elastic = require('elasticsearch');

var loggerConfig = config.get('Logger');

console.log(loggerConfig.host);

var client = new elastic.Client({
  host : 'http://logger.cirrus.io:9200',
  log : 'trace'
});

client.ping({
  requestTiemout: 30000,
  hello : "elastic"
}, function(error) {
  if (error) {
    console.error('elasticsearch cluser not responding at http://logger.cirrus.io:9200');
  } else {
    console.log('Ok! Elasticsearch is responding at http://logger.cirrus.io:9200');
  }
});
