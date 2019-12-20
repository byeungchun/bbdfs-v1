const DataExchange = artifacts.require("./DataExchange.sol");

contract("DataExchange", accounts => {
  it("Contract ownder address should be created account", async () => {
    const dataExchange = await DataExchange.deployed();
    const contractOwner = await dataExchange.getOwnerAddress.call();

    assert.equal(contractOwner, accounts[1], "Who creates this contract?");
  });
});
