const DataReporting = artifacts.require("./DataReporting.sol");

contract("DataReporting", accounts => {
  it("downloadable sould be true", async () => {
    const dataReporting = await DataReporting.deployed();

    await dataReporting.setDataOjectId("test", { from: accounts[0] });

    const downloadable = await dataReporting.downloadable.call();
    assert.isTrue(downloadable, "downloadable is not true");
  });
});
