const MyStringStore = artifacts.require("MyStringStore");
const DataReporting = artifacts.require("DataReporting");

module.exports = function(deployer) {
  //deployer.deploy(MyStringStore);
  deployer.deploy(DataReporting);
};
