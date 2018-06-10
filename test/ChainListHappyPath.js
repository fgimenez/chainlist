var ChainList = artifacts.require("./ChainList.sol");

contract('ChainList', ([creator, seller]) => {
  const articleName = "article 1";
  const articleDescription = "description for article 1";
  const articlePrice = web3.toWei(10, "ether");

  it("should be initialized with empty values", async () => {
    const instance = await ChainList.deployed();
    const data = await instance.getArticle();

    assert.equal(data[0], 0x0, "initial seller must be creator");
    assert.equal(data[1], "", "initial article name must be default");
    assert.equal(data[2], "", "article description must be default");
    assert.equal(data[3].toNumber(), 0, "article price be default");
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

  it("should trigger an event when a new article is sold", async () => {
    const instance = await ChainList.deployed();
    const receipt = await instance.sellArticle(articleName, articleDescription, articlePrice, {from: seller});

    assert.equal(receipt.logs.length, 1, "one event should have been triggered");
    assert.equal(receipt.logs[0].event, "LogSellArticle", "LogSellArticle event should have been emited");
    assert.equal(receipt.logs[0].args._seller, seller, `event seller should be ${seller}`);
    assert.equal(receipt.logs[0].args._name, articleName, `event seller should be ${articleName}`);
    assert.equal(receipt.logs[0].args._price, articlePrice, `event seller should be ${articlePrice}`);
  });
});
