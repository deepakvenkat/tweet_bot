var cheerio = require('cheerio');

var WikiQuote = module.exports = function(response) {
  this.response = response;

  this.page = "";

  this.isValidResponse = function() {
    if ( !! this.response.error) {
      return false;
    } else {
      this.page = cheerio.load(response['parse']['text']['*']);
      var disambig = this.page(':contains(disambiguation)');
      if (disambig.length > 0)
        return false;
      disambig = this.page(':contains(REDIRECT)');
    }
    return true;
  };

  this.processresponse = function() {
    var $ = cheerio.load(this.page);
    var toc = $('.toctext');
    var ids = [];
    var exclusions = ["Dialogue", "Cast", "See Also", "External links"];
    for (var i = 0; i < toc.length; i++) {
      var span = toc[i];
      var sectionHeading = $(span).text();
      if (exclusions.indexOf(sectionHeading) < 0)
        ids.push(sectionHeading.trim().replace(/\s/g, "_"));
    }
    if (ids.length === 0) return;
    var quotes = [];
    var id = ids[randomNumber(ids.length, 0)];
    var headLine = $('#' + id);
    var headParent = $(headLine).parent();
    var firstQuote = $(headParent).next();
    return $(firstQuote).text();
  };
};