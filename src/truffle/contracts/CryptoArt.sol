// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// import "./Ownable.sol"

contract CryptoArt is ERC721URIStorage {
    uint256 public tokenCounter;
    constructor () ERC721 ("CryptoArt", "CRA"){
        tokenCounter = 1;
    }
    
    function createCollectible(string memory tokenURI, uint price) public returns (uint256) {
        uint256 newItemId = tokenCounter;
        _safeMint(msg.sender, newItemId); // crea un nuevo nft pero lo hace seguro, si ya hay un token id no the deja
        //cialquiera que llame a esta funcion va a ser el duenio, por eso el 1err parameetro
        _setTokenURI(newItemId, tokenURI);
        // le seteas el uri de la imagen al token(al NFT)
        tokenCounter = tokenCounter + 1;
        //le suma uno al token counter para que la proxima que se ejecuta es otro distinto
        return newItemId;
    }

}

// contract CryptoArt is ERC721("CryptoArt", "CRA"), Ownable {
//     // constructor() ERC721("CryptoArt", "CRA") {
//     // }
//     mapping(string => uint) ipfsHashToToken;
//     mapping(uint => string) tokenToIpfsHash;
//     mapping(uint => uint) tokenToPrice;

//     function mint(string ipfs, uint price) public payable onlyOwner {
//         require(ipfsHashToToken[ipfs] == 0);

//         uint newTokenId = totalSupply().add(1);
//         _mint(address(this), newTokenId);

//         ipfsHashToToken[ipfs] = newTokenId;
//         tokenToIpfsHash[newTokenId] = ipfs;
//         tokenToPrice[newTokenId] = price;
//     }

//     function buyCard(uint _tokenId) public payable {
//         require(ownerOf(_tokenId) == address(this));
//         require(msg.value >= tokenToPrice[_tokenId]);

//         clearApproval(address(this, _tokenId));
//         removeTokenFrom(address(this, _tokenId));
//         addTokenTo(msg.sender, _tokenId);
//     }

//     function getIpfsHash(uint _tokenId) public view returns(string) {
//         return tokenToIpfsHash[_tokenId];
//     }

//     function tokensOf(address _owner) public view returns(uint []) {
//         return ownedTokens[_owner];
//     }
// }