var unirest = require('unirest');

var apiConfig = require('../config_files/apiConfig');

var translator = module.exports = {
  translate : function (string, callback) {
    var url = apiConfig.url + encodeURIComponent(string);
    unirest.get(url)
    .headers(apiConfig.auth)
    .end(callback);
  },
};