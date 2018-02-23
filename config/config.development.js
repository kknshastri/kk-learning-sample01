var path = require('path');
var fs = require('fs');
var config = {};

config.env = 'development';
config.hostname = 'localhost';
config.port = 3000;
config.session_timeout = 3600;
config.mongo = {
  url : 'mongodb://localhost:27017/questionnaire'
}
config.redis = {
  host : '139.162.3.14',
  port : 6379
}

module.exports = config;
