var cronJob = require('cron').CronJob;
var Bot = require('./modules/bot')

var config = require('./config_files/config')
var bot = new Bot(config);
var job = new cronJob('*/1 * * * *', function () {
  //crontab for every 4 hours
  bot.tweetJob();
});
job.start();