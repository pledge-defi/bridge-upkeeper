const Service = require('egg').Service;
var parser = require('cron-parser');

const BSC = "BSC";
const ETH = "ETH";
const PLGR = "PLGR";
const MPLGR = "MPLGR";

class TimerService extends Service {
    // txType: default 0 -> deposit / 1 -> withdraw
    async txsHistory(address, txType = 0, start = 1, step = 5) {
        const curPage = start - 1;
        const pageSize = step;
        const offset = curPage * pageSize;

        const Op = this.app.Sequelize.Op;
        const txs = await this.ctx.model.TxHistory.findAndCountAll({
            attributes: ['id', 'address', 'txType', 'depositHash', 'bridgeHash', 'srcChain', 'destChain', 'asset', 'amount', 'fee', 'timestamp'],
            where: {
                txType: txType,
                address: address
            },
            offset: offset,
            limit: pageSize,
            order: [['id', 'DESC']],
        });

        // get all tx status 
        // TODO:

        return txs;
    }

    async onBSC(address, txType, txHash, amount, srcChain, destChain) {
        const fee = await this.onFee(0, txHash);
        if (fee == 0) return;

        const timestamp = await this.onTxTime(0, txHash);
        if (timestamp == 0) return;

        // store
        await this.store(address, txType, txHash, srcChain, destChain, PLGR, amount, fee, timestamp);
    }

    async onETH(address, txType, txHash, amount, srcChain, destChain) {
        const fee = await this.onFee(1, txHash);
        if (fee == 0) return;

        const timestamp = await this.onTxTime(1, txHash);
        if (timestamp == 0) return;

        // store
        await this.store(address, txType, txHash, srcChain, destChain, MPLGR, amount, fee, timestamp);
    }

    async store(address, txType, txHash, srcChain, destChain, asset, amount, fee, timestamp) {
        console.log('timestamp: ', timestamp);
        // write to db
        const txHistory = await this.ctx.model.TxHistory.create({
            address: address,
            txType: txType,
            depositHash: txHash,
            srcChain: srcChain,
            destChain: destChain,
            asset: asset,
            amount: amount.toString(),
            fee: fee.toString(),
            timestamp: timestamp.toString(),
        });
        console.log("txHistory: ", txHistory);
    }

    async onFee(chainID, txHash) {
        // default bsc web3
        let web3 = this.app.web3;
        if (chainID == 0) {
            web3 = this.app.web3;
        } else if (chainID == 1) {
            web3 = this.app.web3OnETH;
        } else {
            return 0; //error
        }

        const gasPrice = await web3.eth.getTransaction(txHash).then(function (res) {
            if (res) {
                return res.gasPrice;
            }
        });

        const gasUsed = await web3.eth.getTransactionReceipt(txHash).then(function (res) {
            if (res) {
                return res.gasUsed;
            }
        });

        const fee = gasUsed * gasPrice / 10 ** 18;
        console.log('fee:', fee);
        return fee;
    }

    async onTxTime(chainID, txHash) {
        console.log('chianID:', chainID);
        console.log('txHash:', txHash);

        // default bsc web3
        let web3 = this.app.web3;
        if (chainID === 0) {
            web3 = this.app.web3;
        } else if (chainID === 1) {
            web3 = this.app.web3OnETH;
        } else {
            return 0; //error
        }

        const blockNum = await web3.eth.getTransaction(txHash).then(function (res) {
            return res.blockNumber;
        });
        const timestamp = await web3.eth.getBlock(blockNum).then(function (res) {
            return res.timestamp;
        });
        return timestamp;
    }

    async addTx(address, txType, asset, txHash, amount, srcChain, destChain) {
        if (asset === "PLGR") {
            // calc tx info on BSC
            await this.onBSC(address, txType, txHash, amount);
        } else if (asset === "MPLGR") {
            // calc tx info on ETH
            await this.onETH(address, txType, txHash, amount);
        }
    }
}

module.exports = TimerService;
