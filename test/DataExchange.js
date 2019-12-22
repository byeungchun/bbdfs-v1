const DataExchange = artifacts.require("./DataExchange.sol");
var Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

contract("DataExchange", accounts => {
  var dataExchange;
  var contractOwner;
  before(async () => {
    dataExchange = await DataExchange.deployed();
    contractOwner = await dataExchange.getOwnerAddress.call();
    console.log("contract address", dataExchange.address);
  });

  it("Check web3js connected", async () => {
    var account0;
    await web3.eth.getAccounts().then(function(res) {
      account0 = res[0];
      web3.eth.defaultAccount = account0;
    });

    const hashedVal = web3.utils.soliditySha3(
      contractOwner, //recipient address
      web3.utils.toHex(129),
      dataExchange.address //contract address
    );
    console.log("hasedval", hashedVal);
    console.log("hasedval_hex", hashedVal.toString("hex"));
    console.log("hasedval_0x_hex", "0x" + hashedVal.toString("hex"));
    console.log("web3 defaultaddr", web3.eth.defaultAccount);
    //web3.eth.personal.sign(hashedVal, web3.eth.defaultAccount, console.log);
    let sig1;
    await web3.eth.sign(hashedVal, web3.eth.defaultAccount).then(function(res) {
      sig1 = res;
    });
    console.log("sig1", sig1);
    console.log("recover", web3.eth.accounts.recover(hashedVal, sig1));
    const privateKey =
      "0xd14ba09d3ecd148962d68623d9e4c4678087d6e5e3ed391450b009ca8e8671a7";
    const sigObj = web3.eth.accounts.sign(hashedVal, privateKey);
    console.log("sigObbj", sigObj);
    console.log("recover2", web3.eth.accounts.recover(sigObj));

    assert.equal(contractOwner, account0, "Web3js connection is not working");
  });

  it("Contract ownder address should be created account", () => {
    assert.equal(contractOwner, accounts[0], "Who creates this contract?");
  });
});
