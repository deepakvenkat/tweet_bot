var schedule = require('node-shedule');
var bot = require('./modules/bot')

var config = require('./config')
var bot = new Bot(config);
var job = scedule.scedule.sceduleJob('* */4 * * *', function () {
  //crontab for every 4 hours
  bot.tweetJob();
});