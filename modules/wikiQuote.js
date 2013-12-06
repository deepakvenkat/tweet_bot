var cheerio = require('cheerio');

var WikiQuote = module.exports = function (response) {
  this.response = response;

  this.page = "";

  this.isValidResponse = function () {
    if (!!this.response.error) {
      return false;
    } else {
      this.page = cheerio.load(response['parse']['text']['*']);
      var disambig = this.page(':contains(disambiguation)');
      if (disambig.length > 0)
        return false;
      disambig = this.page(':contains(REDIRECT)')
    }
    return true;
  };

  this.processresponse = function (callback) {

    return callback("random quote");
  };
};