// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CryptoArt is ERC721("CryptoArt", "CRA"), Ownable {
    // constructor() ERC721("CryptoArt", "CRA") {
    // }
    mapping(string => uint) ipfsHashToToken;
    mapping(uint => string) tokenToIpfsHash;
    mapping(uint => uint) tokenToPrice;

    function mint(string ipfs, uint price) public payable onlyOwner {
        require(ipfsHashToToken[ipfs] == 0);

        uint newTokenId = totalSupply().add(1);
        _mint(address(this), newTokenId);

        ipfsHashToToken[ipfs] = newTokenId;
        tokenToIpfsHash[newTokenId] = ipfs;
        tokenToPrice[newTokenId] = price;
    }

    function buyCard(uint _tokenId) public payable {
        require(ownerOf(_tokenId) == address(this));
        require(msg.value >= tokenToPrice[_tokenId]);

        clearApproval(address(this, _tokenId));
        removeTokenFrom(address(this, _tokenId));
        addTokenTo(msg.sender, _tokenId);
    }

    function getIpfsHash(uint _tokenId) public view returns(string) {
        return tokenToIpfsHash[_tokenId];
    }

    function tokensOf(address _owner) public view returns(uint []) {
        return ownedTokens[_owner];
    }

}


// contract Color is ERC721 {

//   bytes3[] public colors;
//   mapping(bytes3 => bool) private _colorExists;


//   // E.G. color = "#FFFFFF"
//   function mint(bytes3 _color) public {
//     require(!_colorExists[_color], "color exists");
//     uint _id = colors.push(_color);
//     _mint(msg.sender, _id);
//     _colorExists[_color] = true;
//   }
// }