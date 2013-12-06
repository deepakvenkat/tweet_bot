var Twit = require('twit');
var MovieQuote = require('./movieQuote');

var Bot = module.exports = function (config) {
  this.twit = new Twit(config);

  this.tweetJob = function () {
    movieQuote.findQuote(translateQuote);
  };

  this.translateQuote = function () {

  };
}

Bot.prototype.tweetJob = function () {
  console.log("inside tweet job");
};