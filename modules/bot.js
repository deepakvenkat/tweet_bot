var Bot = module.exports = function (config) {
  this.twit = new Twit(config);
}

Bot.prototype.tweetJob = function () {
  console.log("inside tweet job");
};