const Service = require('egg').Service;
var parser = require('cron-parser');

class TimerService extends Service {
    // async lockedCountDown() {
    //     var options = {
    //         utc: true
    //     };
    //
    //     try {
    //         var interval = parser.parseExpression('0 0 0 * * 0', options); // UTC 周日24点
    //         // var interval = parser.parseExpression('*/59 * * * *', options); // 10S 间隔
    //         // var interval = parser.parseExpression('0 0 0 * * *', options); // 10S 间隔
    //
    //         const next = interval.next().toString();
    //         var nextTime = Date.parse(next);
    //         var currentDate = new Date().toUTCString();
    //         const nowutc = Date.parse(currentDate);
    //         const countdown = (nextTime - nowutc) / 1000; // seconds
    //         console.log('countdown: ', countdown);
    //
    //         const result = {
    //             countdown: countdown
    //         };
    //
    //         return result;
    //     } catch (err) {
    //         console.log('Error: ' + err.message);
    //     }
    // }
    async lockedCountDown() {
        let NowTime = parseInt(Date.now() / 1000);
        let res;
        let unlockTime;
        res = await this.ctx.model.UnlockTime.findByPk(1);
        if (res.next_time - NowTime < 0) {
            unlockTime = 0
        } else {
            unlockTime = res.next_time - NowTime
        }
        const result = {
            countdown: unlockTime
        };

        return result;
    }
}

module.exports = TimerService;
