var unirest = require('unirest');

var apiConfig = require('../config_files/apiConfig');

var translator = module.exports = {
  translate : function (string, callbackFunc, params) {
    var url = apiConfig.url + encodeURIComponent(string);
    unirest.get(url)
    .headers(apiConfig.auth)
    .end(function (response) {
      callbackFunc(response, params);
    });
  },
};