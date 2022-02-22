const Service = require('egg').Service;
var parser = require('cron-parser');

class TimerService extends Service {
    async lockedCountDown() {
        var options = {
            utc: true
        };

        try {
            // var interval = parser.parseExpression('0 0 0 * * 0', options); // UTC 周日24点
            var interval = parser.parseExpression('*/5 * * * *', options); // 10S 间隔
            //var interval = parser.parseExpression('10 * * * * *', options); // 10S 间隔

            const next = interval.next().toString();
            var nextTime = Date.parse(next);
            var currentDate = new Date().toUTCString();
            const nowutc = Date.parse(currentDate);
            const countdown = (nextTime - nowutc) / 1000; // seconds
            console.log('countdown: ', countdown); 

            const result = {
                countdown: countdown
            };

            return result;
        } catch (err) {
            console.log('Error: ' + err.message);
        }
    }
}

module.exports = TimerService;
