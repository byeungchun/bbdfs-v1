//const MyStringStore = artifacts.require("MyStringStore");
//const DataReporting = artifacts.require("DataReporting");
const DataExchange = artifacts.require("DataExchange");

module.exports = function(deployer) {
  //deployer.deploy(MyStringStore);
  //deployer.deploy(DataReporting);
  deployer.deploy(DataExchange);
};
