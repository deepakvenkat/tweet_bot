var fs = require('fs')
var unirest = require('unirest');
var WikiQuote = require('./wikiQuote');
var totalTries = 0;

findQuote = function () {
  var movieTitile = pickRandomMovie();
  getWikiQuote(movieTitile);
};

pickRandomMovie = function () {
  var movieList = fs.readFileSync('../data/top250.list', 'utf8');
  var movies = movieList.toString().split('\n');
  var random = randomNumber(0, (movies.length - 1));
  var movie = movies[random];
  movieTitle =  formatMovie(movie);
  console.log(movieTitle);
  return movieTitle;
};

formatMovie = function (movie) {
  return movie.replace(/\(.*\)/i, "").trim().replace(/[^\w\s]/g, "").replace(/\s+/g, "_")
};

randomNumber = function (max, min) {
  return Math.floor(Math.random() * (max - min ) + min);
};

getWikiQuote = function (movieName) {
  var wikiQuoteUrl = "http://en.wikiquote.org/w/api.php?format=json&action=parse&page=" + movieName;
  totalTries++;
  unirest.get(wikiQuoteUrl)
  .headers({'Accept' : 'application/json'})
  .end(processWikiResponse);
};

processWikiResponse = function (response) {
  console.log(response)
  var wikiQuote = new WikiQuote(response.body);
  var valid = wikiQuote.isValidResponse();
  if (!valid && totalTries < 4) {
    findQuote();
  } else if (!valid && totalTries > 3){
    return false;
  } else {
    wikiQuote.processResponse(function (quote) {
      console.log(quote);
    });
    return true;
  }
};

module.exports = {
  findQuote : findQuote,
  pickRandomMovie : pickRandomMovie,
  formatMovie : formatMovie,
  randomNumber : randomNumber,
  getWikiQuote : getWikiQuote,
  processWikiResponse : processWikiResponse
};