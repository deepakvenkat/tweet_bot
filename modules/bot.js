var Twit = require('twit');
var MovieQuote = require('./movieQuote');
var translator = require('./Translator');

var Bot = module.exports = function (config) {
  this.twit = new Twit(config);
  this.movieQuote = new MovieQuote();

  this.tweetJob = function () {
    this.movieQuote.findQuote(translateQuote);
  };

  this.translateQuote = function (quote) {
    translator.translate(quote, tweetQuote);
  };

  this.tweetQuote = function (tweet) {
    this.twit.tweet(tweet, function (err, reply))
  };
};
