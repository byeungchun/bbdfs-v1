pragma solidity ^0.5.0;

contract DataReporting {

  address owner = msg.sender;
  
  bool public downloadable; // It set true when owner set DataObjectId
  mapping(uint256 => bool) usedNonces;
  string public dataObjectId = "object id"; //Owner takes a data object id when he uploads a file to database

  constructor() public {
      downloadable = false;
  }

  function setDataOjectId(string memory x) public {
    require(msg.sender == owner);
    dataObjectId = x;
    downloadable = true;
  }

  function getDataObjectId(uint256 nonce, bytes32 signature) public returns(string memory) {
      require(!usedNonces[nonce]);
      usedNonces[nonce] = true;
      
      bytes32 message = keccak256(abi.encodePacked(msg.sender, nonce, this));
      
      require(message == signature);
      string memory resId = dataObjectId; // Remove assigned dataOjectId value once it returns
      initDataObjectId();
      return resId;
  }

  ///If receiver doesn't take data object ID within 5 minutes, owner remove ID 
  function expireDataObjectId() public {
    //Todo - implement timer to check it over 5 minutes since owner assigned the ID
    require(msg.sender == owner);
    initDataObjectId();
  }
  
  function initDataObjectId() internal{
    delete dataObjectId;
    downloadable = false;
  }

}