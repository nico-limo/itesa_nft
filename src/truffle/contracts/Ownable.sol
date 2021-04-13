// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.3;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// /**
//  * @title Ownable
//  * @dev The Ownable contract has an owner address, and provides basic authorization control
//  * functions, this simplifies the implementation of "user permissions".
//  */
// contract Ownable {
//   address public owner;

//   event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

//   /**
//    * @dev The Ownable constructor sets the original `owner` of the contract to the sender
//    * account.
//    */
//   function ownable() public {
//     owner = msg.sender;
//   }

//   /**
//    * @dev Throws if called by any account other than the owner.
//    */
//   modifier onlyOwner() {
//     require(msg.sender == owner);
//     _;
//   }
// }
