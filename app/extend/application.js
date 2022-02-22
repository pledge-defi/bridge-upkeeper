// app/extend/application.js
const Web3 = require('web3');
const WEB3 = Symbol('Application#web3');
const WEB3ONETH = Symbol('Application#web3OnETH');
const PLEDGEBRIDGEBSCCONTRACT = Symbol('Application#pledgBridgeBSCContract');

const pledgeBridgeBSCAbi = require("../abis/pledgeBridgeBSC.json");
const pledgeBridgeBSCAddress = "0xd6169DF58c6886D354A2eA93391D1E0F222D5080";

// Bridge 相关
const privateKey =  "d355ce1b91b16a0fc6953cc20ec75e19060487a1a157679819d68595bc1e7ca3";//process.env.PRIVATE_KEY;

module.exports = {
  get web3() {
    if (!this[WEB3]) {
      let web3 = new Web3(Web3.givenProvider || "https://data-seed-prebsc-1-s1.binance.org:8545");

      // 添加 Bridge 账号
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      web3.eth.accounts.wallet.add(account);
      web3.eth.defaultAccount = account.address;
        
      this[WEB3] = web3;
    }
    return this[WEB3];
  },
  get web3OnETH() {
    if (!this[WEB3ONETH]) {
      let web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");

      // // 添加 Bridge 账号
      // const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      // web3.eth.accounts.wallet.add(account);
      // web3.eth.defaultAccount = account.address;
        
      this[WEB3ONETH] = web3;
    }
    return this[WEB3ONETH];
  },
  get pledgBridgeBSCContract() {
    if (!this[PLEDGEBRIDGEBSCCONTRACT]) {
      const contract = new this.web3.eth.Contract(pledgeBridgeBSCAbi, pledgeBridgeBSCAddress);
      this[PLEDGEBRIDGEBSCCONTRACT] = contract;
    }
    return this[PLEDGEBRIDGEBSCCONTRACT];
  },
};
