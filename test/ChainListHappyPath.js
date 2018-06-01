var ChainList = artifacts.require("./ChainList.sol");

contract('ChainList', ([creator, seller]) => {
  var chainlistInstance;
  var seller = seller;
  var articleName = "article 1";
  var articleDescription = "description for article 1";
  var articlePrice = web3.toWei(10, "ether");

  it("should be initialized with empty values", async () => {
    const instance = await ChainList.deployed();
    const data = await instance.getArticle();

    assert.equal(data[0], creator, "initial seller must be creator");
    assert.equal(data[1], "Default article", "initial article name must be default");
    assert.equal(data[2], "Default description", "article description must be default");
    assert.equal(data[3].toNumber(), 10000000000000000000, "article price be default");
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
