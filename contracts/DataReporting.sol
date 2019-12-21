pragma solidity ^0.5.0;

contract DataReporting {

  address owner = msg.sender;
  
  bool public downloadable; // It set true when owner set DataObjectId
  mapping(uint8 => bool) usedNonces;
  string public dataObjectId = ""; //Owner takes a data object id when he uploads a file to database
  bool public status101;
  string _sender = "";
  constructor() public {
      downloadable = false;
      status101 = false;
  }

  function setDataOjectId(string memory x) public {
    require(msg.sender == owner);
    dataObjectId = x;
    downloadable = true;
  }

  function getDataObjectId(uint8 nonce, bytes32 signature) public returns(string memory) {
      require(!usedNonces[nonce], "It is already downloaded");
      usedNonces[nonce] = true;
      
      bytes32 message = keccak256(abi.encodePacked(msg.sender, nonce, this));
      
      require(message == signature, "Message is not original");
      
      return dataObjectId;
  }

  function setNonce(uint8 nonce, bytes32 signature) public {
    bytes32 message = keccak256(abi.encodePacked(msg.sender, nonce, this));
    require(message == signature, "It is not from receiver");
    usedNonces[nonce] = true;
    dataObjectId = "taken";
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