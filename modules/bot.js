var Twit = require('twit');
var MovieQuote = require('./movieQuote');
var translator = require('./Translator');

var Bot = module.exports = function (config) {
  this.twit = new Twit(config);
  this.movieQuote = new MovieQuote();

  this.tweetJob = function () {
    this.movieQuote.findQuote(this.translateQuote);
  };

  this.translateQuote = function (quote) {
    translator.translate(quote, tweetQuote);
  };

  this.tweetQuote = function (tweet) {
    if (tweet.lenghth > 140) {
      console.log("too long");
    }
    this.twit.post('statuses/update', {status: tweet}, function (err, reply) {
      if (err) console.log(err);
      console.log(re)
    })
  };
};
