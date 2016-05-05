var bunyan = require('bunyan'),
    bunyantcp = require('bunyan-logstash-tcp');

var log = bunyan.createLogger({
    name: 'example',
    streams: [{
        level: 'debug',
        stream: process.stdout
    },{
        level: 'debug',
        type: "raw",
        stream: bunyantcp.createStream({
            host: '192.168.82.102',
            port: 9998
        })
    }],
    level: 'debug'
});

log.debug('test');
log.error('error test');
