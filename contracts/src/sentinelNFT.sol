// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {SentinelCore} from "./sentinelCore.sol";

contract SentinelNFT is ERC721, Ownable {
    uint256 public tokenId;

    mapping(uint256 tokenId => string tokenURI) tokenURIs;

    SentinelCore public core;

    constructor(
        address coreAddr
    ) ERC721("SentinelNFT", "SNT") Ownable(msg.sender) {
        tokenId = 0;
        core = SentinelCore(coreAddr);
    }

    function mint(
        address to,
        string memory tokenURI,
        uint256 duration
    ) external onlyOwner {
        _safeMint(to, tokenId);
        tokenURIs[tokenId] = tokenURI;
        tokenId++;

        core.registerPolicy(tokenId - 1, to, tokenURI, duration);
    }
}
