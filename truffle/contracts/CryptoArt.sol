// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CryptoArt is ERC721 {
    constructor() ERC721("CryptoArt", "CRA") {
    }
}
contract Color is ERC721Full {

  bytes3[] public colors;
  mapping(bytes3 => bool) private _colorExists;


  // E.G. color = "#FFFFFF"
  function mint(bytes3 _color) public {
    require(!_colorExists[_color], "color exists");
    uint _id = colors.push(_color);
    _mint(msg.sender, _id);
    _colorExists[_color] = true;
  }
}