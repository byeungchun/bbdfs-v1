const DataExchange = artifacts.require("./DataExchange.sol");
var Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));


contract("DataExchange", accounts => {
  it("Contract ownder address should be created account", async () => {
    //const drizzle = new Drizzle(options);
    const dataExchange = await DataExchange.deployed();
    const contractOwner = await dataExchange.getOwnerAddress.call();
    var accounts = web3.eth.getAccounts();
    var account0;
    web3.eth.getAccounts().then(function (res) {
      account0 = res[0]
    });
    console.log(account0);
    assert.equal(contractOwner, accounts[0], "Who creates this contract?");
  });
});
