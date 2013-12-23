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
    var self = this;
    translator.translate(quote, function (response) {
      var tweet = response.body;
      if (tweet.length > 140) {
        console.log("tweet too long");
      } else {
        var twit = new Twit(config);
        twit.post('statuses/update', {status: tweet}, function (err, reply) {
          if (err) console.log(err);
        });
      }
      console.log("\n=========================\n");
    });
  };
};
