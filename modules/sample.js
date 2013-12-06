var unirest = require('unirest');
var cheerio = require('cheerio');
var wikiQuoteUrl = "http://en.wikiquote.org/w/api.php?format=json&action=parse&page=Fight_Club_(film)";

randomNumber = function (max, min) {
  return Math.floor(Math.random() * (max - min ) + min);
};

unirest.get(wikiQuoteUrl).headers({'Accept': 'application/json'}).end(function (response) {
  var page = cheerio.load(response.body.parse.text['*']);
  var toc = page('.toctext');
  var ids = [];
  var exclusions = ["Dialogue", "Cast", "See Also", "External links"];
  for(var i = 0; i < toc.length; i++) {
    var span = toc[i];
    var sectionHeading = page(span).text();
    if (exclusions.indexOf(sectionHeading) < 0 )
      ids.push(sectionHeading.trim().replace(/\s/g, "_"));
  }
  console.log(ids)
  if (ids.length === 0) return;
  var quotes = [];
  var id = ids[randomNumber(ids.length, 0)];
  var headLine = page('#' + id);
  console.log(headLine);
  var headParent = page(headLine).parent();
  var firstQuote = page(headParent).next();
  console.log(page(firstQuote).text());
});

