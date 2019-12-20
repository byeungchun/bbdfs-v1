pragma solidity ^0.5.0;

contract DataExchange {

  address owner;
  mapping(uint32 => bool) usedNonces;
  bytes32 dataObjectId;

  constructor() public{
    owner = msg.sender;
  }

  function setDataObjectId(bytes32 _dataObjectId) public {
    require(msg.sender == owner, "Only contract owner can call this function");
    dataObjectId = _dataObjectId;
  }

  function getOwnerAddress() public view returns(address){
    return owner;
  }
}