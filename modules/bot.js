var Twit = require('twit');
var MovieQuote = require('./movieQuote');
var translator = require('./Translator');

var Bot = module.exports = function (config) {
  this.twit = new Twit(config);
  this.movieQuote = new MovieQuote();
  this.lastMention = "";
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

  this.replyJob = function () {
    var params = {};
    var self = this;
    if (!!self.lastMention) params.since_id = self.lastMention;
    self.twit.get('statuses/mentions_timeline', params, function (err, reply) {
      var mentions = reply;
      if (!mentions || mentions.length === 0) {
        console.log("no new mentions \n =============");
        return;
      }
      var repliesLength = mentions.length > 10 ? 10 : mentions.length;

      for(var i = 0; i < repliesLength; i++) {
        var mention = mentions[i].text;
        mention = mention.replace(/(\s)*@sayityoda(\s)*/g, "");
        var params = {
          replyHandle : '@' + mentions[i].user.screen_name
        };
        translator.translate(mention, self.replyToMention, params);
      }
      self.lastMention = mentions[repliesLength - 1].id;
    });
  };

  this.replyToMention = function (response, params) {
    var self = this;
    var reply = params.replyHandle + ' ' + response.body;
    if (reply.length > 140) {
      console.log("tweet too long");
      return;
    }
    this.twit.post('statuses/update', {status: reply}, function (err, reply) {
      if (err) console.log(err);
    });
  };
};
