// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// contract BuyContract is ERC721 {
//   address public owner = msg.sender;
//   uint public last_completed_migration;

    
//     function deposit(address tokenAddress, uint256 tokenId, uint price) public {
//         require(Token(tokenAddress).transferFrom(msg.sender, address(this), tokenId));
//         //do some stuff    
//         _buy(price, tokenId, tokenAddress);
//     }

//     function _buy(uint _price, uint256 tokenId, address tokenAddress) internal {
//       require(msg.value >= _price);
//       transferFrom(address(this), msg.sender, tokenId);
//     }


// }