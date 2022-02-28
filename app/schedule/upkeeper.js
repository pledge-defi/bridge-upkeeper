/**
 bridge 定时脚本：
 - 每周日晚上12:00发起一次
 */

let Web3 = require('web3');

const privateKey = 'd355ce1b91b16a0fc6953cc20ec75e19060487a1a157679819d68595bc1e7ca3';//process.env.PRIVATE_KEY;
const pledgeBridgeBSCAbi = require("../abis/pledgeBridgeBSC.json");

//const pledgeBridgeBSCAddress = "0xd6169DF58c6886D354A2eA93391D1E0F222D5080";
const pledgeBridgeBSCAddress = "0xac146f0BfecE6C48e4ac65BbcE687A6c3cC10878";
// const pledgeBridgeBSCAddress = "0x277239573Ae3E996BB43743A37610D0a71E35B85";

let web3 = new Web3(Web3.givenProvider || "https://data-seed-prebsc-1-s1.binance.org:8545");

// 添加 Bridge 账号
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

let contract = new web3.eth.Contract(pledgeBridgeBSCAbi, pledgeBridgeBSCAddress);
// 11:13
module.exports = {
    schedule: {
        type: 'all', // 指定所有的 worker 都需要执行
        interval: '3600s', // duration
        // cron: '*/1 * * * *' // 1min
        //cron: '10 * * * * *' // 第10S触发
        //cron: '0 0 * * * 7' // 周日午夜0点触发
    },
    async task(ctx) {
        console.log('enter schedule., execute upkeeper..: ', web3.eth.defaultAccount);
        contract.methods.execute_upkeep().send({
            from: web3.eth.defaultAccount,
            gas: 10000000,
        }).then(function (res) {
            console.log('res:', res);
            // insert bridge hash BSC->ETH to db
            if (res) {
                const bridgeHash = res.transactionHash;
                const data = {
                    bridgeHash: bridgeHash
                };
                ctx.model.TxHistory.update(data, {
                    where: {
                        bridgeHash: null
                    }
                });
            }
        });
    },
};
