var cronJob = require('cron').CronJob;
var Bot = require('./modules/bot')

var config = require('./config_files/config')
var bot = new Bot(config);
var job = new cronJob('0 */4 * * *', function () {
  console.log("Job started " + Date.now());
  //crontab for every 4 hours
  bot.tweetJob();
});
job.start();

var job2 = new cronJob('0 */1 * * *', function () {
  console.log("Reply Job Started " + Date.now());
  bot.replyJob();
});