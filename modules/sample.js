var unirest = require('unirest');
var cheerio = require('cheerio');
var wikiQuoteUrl = "http://en.wikiquote.org/w/api.php?format=json&action=parse&page=Fight_Club_(film)"

unirest.get(wikiQuoteUrl).headers({'Accept': 'application/json'}).end(function (response) {
  var page = cheerio.load(response.body.parse.text['*']);
  var toc = page('.toctext')
  for(var i = 0; i < toc.length; i++) {
    var span = toc[i];
    console.log(page(span).text())
  }
})