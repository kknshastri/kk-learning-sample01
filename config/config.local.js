var path = require('path');
var fs = require('fs');
var config = {};

config.env = 'local';
config.hostname = 'localhost';
config.port = 3000;
config.mongo = {
  url : 'mongodb://localhost:27017/questionnaire'
}

config.session_timeout = 3600;
config.redis = {
  host : '127.0.0.1',
  port : 6379
}


module.exports = config;
