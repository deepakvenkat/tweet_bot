var schedule = require('node-shedule');
var bot = require('./modules/bot')

var config = require('./config')
var bot = new Bot(config);
var job = scedule.scedule.sceduleJob('42 * * * *', function () {
  bot.tweetJob();
});