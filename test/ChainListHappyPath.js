var ChainList = artifacts.require("./ChainList.sol");

contract('ChainList', (accounts) => {
  var chainlistInstance;
  var seller = accounts[1];
  var articleName = "article 1";
  var articleDescription = "description for article 1";
  var articlePrice = web3.toWei(10, "ether");

  it("should be initialized with empty values", async () => {
    const instance = await ChainList.deployed();
    const data = await instance.getArticle();

    assert.equal(data[0], 0x0, "seller must be empty");
    assert.equal(data[1], "", "article name must be empty");
    assert.equal(data[2], "", "article description must be empty");
    assert.equal(data[3].toNumber(), 0, "article price be zero");
  });

  it("should sell an article", async () => {
    const instance = await ChainList.deployed();
    await instance.sellArticle(articleName, articleDescription, articlePrice, {from: seller});

    const data = await instance.getArticle();

    assert.equal(data[0], seller, "seller must be " + seller);
    assert.equal(data[1], articleName, "article name must be " + articleName);
    assert.equal(data[2], articleDescription, "article description must be " + articleDescription);
    assert.equal(data[3].toNumber(), articlePrice, "article price must be " + articlePrice);
  });
});
