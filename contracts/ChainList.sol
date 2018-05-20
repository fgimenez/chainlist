pragma solidity ^0.4.18;

contract ChainList {
  // state variables
  address seller;
  string name;
  string description;
  uint256 price;

  constructor() public {
    sellArticle("Default article", "Default description", 10);
  }

  function sellArticle(string _name, string _description, uint256 _price) public {
    seller = msg.sender;
    name = _name;
    description = _description;
    price = _price;
  }

  function getArticle() public view returns (
     address _seller,
     string _name,
     string _description,
     uint256 _price) {
    return(seller, name, description, price);
  }
}
