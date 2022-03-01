'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    // 做分页处理
    async txsHistory() {
        const {ctx} = this;

        const {address, txType, page, pageSize} = ctx.request.body;
        console.log('tx_history request: ', ctx.request.body);

        if (!address) {
            ctx.status = 400;
            ctx.message = "bad request";
            return;
        }

        const result = await ctx.service.history.txsHistory(address, txType, page, pageSize);
        if (!result) {
            ctx.status = 400;
            ctx.message = "bad request";

            return;
        }

        ctx.status = 200;
        ctx.body = {code: 200, message: 'success', data: result};
    }

    async lockedCountDown() {
        const {ctx} = this;

        const result = await ctx.service.timer.lockedCountDown();
        if (!result) {
            ctx.status = 400;
            ctx.message = "bad request";
            return;
        }

        ctx.status = 200;
        ctx.body = {
            "time": "UTC",
            "timestamp": result.countdown,
        }
    }

    async addTx() {
        const {ctx} = this;

        const {address, txType, asset, txHash, amount, srcChain, destChain} = ctx.request.body;
        console.log('request body:', ctx.request.body);

        if (!address || !asset || !txHash || amount === "" || !srcChain || !destChain) {
            ctx.status = 400;
            ctx.message = "bad request";
            return;
        }

        await ctx.service.history.addTx(address, txType, asset.toUpperCase(), txHash, amount, srcChain, destChain);
        ctx.status = 200;

    }
}

module.exports = HomeController;
