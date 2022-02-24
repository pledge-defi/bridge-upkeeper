let NextUnlockTime = parseInt(Date.now() / 1000) + 3600;
console.log(NextUnlockTime)
let NowTime = parseInt(Date.now() / 1000);
let IsInit = 0

// 11:13
module.exports = {
    schedule: {
        type: 'all', // 指定所有的 worker 都需要执行
        interval: '1s', // duration
    },
    async task(ctx) {
        if (IsInit == 0) {
            await ctx.model.UnlockTime.update({next_time: NextUnlockTime}, {
                where: {
                    id: 1
                }
            });
            IsInit = 1
        }
        NowTime = parseInt(Date.now() / 1000);
        if (NowTime - NextUnlockTime == 0) {
            NextUnlockTime = NowTime + 3600
            await ctx.model.UnlockTime.update({next_time: NextUnlockTime}, {
                where: {
                    id: 1
                }
            });
        }

    },
};
