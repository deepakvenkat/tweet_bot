var schedule = require('node-schedule');
var Bot = require('./modules/bot')

var config = require('./config_files/config')
var bot = new Bot(config);
var job = schedule.scheduleJob('*/10 * * * *', function () {
  //crontab for every 4 hours
  bot.tweetJob();
});