var fs = require('fs')
var WikiQuote = require('./WikiQuote');

var MovieQuote = module.exports = function () {

  this.findQuote = function () {
    console.log("find quote");
    var movie = this.pickRandomMovie();
    movie = this.formatMovie(movie);
  };

  this.pickRandomMovie = function () {
    fs.readFile('../data/top250.list', function (err, data) {
      if (err) throw err;
      var movies = data.toString().split('\n');
      var random = this.randomNumber(0, (movies.length - 1));
      var movie = movies[random];
      return movie;
    });
  };

  this.formatMovie = function (movie) {
    return movie.replace(/\(.*\)/i, "").trim().replace(/[^\w\s]/g, "").replace(/\s+/g, "_")
  };

  this.randomNumber = function (max, min) {
    return Math.floor(Math.random() * (max - min ) + min);
  };
}