var fs = require('fs');
var unirest = require('unirest');
var WikiQuote = require('./wikiQuote');
var totalTries = 0;

findQuote = function (quoteCallback) {
  var title = pickRandomMovie();
  movieTitle = title;
  getWikiQuote(movieTitle, quoteCallback);
};

pickRandomMovie = function () {
  var movieList = fs.readFileSync('./modules/data/top250.list', 'utf8');
  var movies = movieList.toString().split('\n');
  var random = randomNumber(0, (movies.length - 1));
  var movie = movies[random];
  movieTitle =  formatMovie(movie);
  return movieTitle;
};

formatMovie = function (movie) {
  return movie.replace(/\(.*\)/i, "").trim().replace(/[^\w\s]/g, "").replace(/\s+/g, "_");
};

randomNumber = function (max, min) {
  return Math.floor(Math.random() * (max - min ) + min);
};

getWikiQuote = function (movieName, quoteCallback) {
  console.log("Movie: " + movieName + "\n");
  var wikiQuoteUrl = "http://en.wikiquote.org/w/api.php?format=json&action=parse&page=" + movieName;
  var self = this;
  totalTries++;
  unirest.get(wikiQuoteUrl)
  .headers({'Accept' : 'application/json'})
  .end(function (response) {
    self.processWikiResponse(response, quoteCallback);
  });
};

processWikiResponse = function (response, quoteCallback) {
  var wikiQuote = new WikiQuote(response.body);
  var valid = wikiQuote.isValidResponse();
  if (!valid && totalTries < 4) {
    findQuote(quoteCallback);
  } else if (!valid && totalTries > 3){
    return false;
  } else {
    var quote = wikiQuote.processResponse();
    if (!!quote)
      quoteCallback(quote);
  }
};

module.exports = function () {
  this.findQuote = findQuote;
  this.pickRandomMovie = pickRandomMovie;
  this.formatMovie = formatMovie;
  this.randomNumber = randomNumber;
  this.getWikiQuote = getWikiQuote;
  this.processWikiResponse = processWikiResponse;
};
