// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {SentinelCore} from "./sentinelCore.sol";

contract SentinelNFT is ERC721, Ownable {
    uint256 public tokenId;

    mapping(uint256 tokenId => string tokenURI) descriptions;
    mapping(uint256 tokenId => string data) claimData;

    SentinelCore public core;

    constructor(
        address coreAddr
    ) ERC721("SentinelNFT", "SNT") Ownable(msg.sender) {
        tokenId = 0;
        core = SentinelCore(coreAddr);
    }

    function mint(
        address to,
        string memory description,
        uint256 duration
    ) external onlyOwner {
        _safeMint(to, tokenId);
        descriptions[tokenId] = description;
        tokenId++;

        core.registerPolicy(tokenId - 1, to, description, duration);
    }

    function getDescription(uint256 id) external view returns (string memory) {
        return descriptions[id];
    }

    function setClaimData(uint256 id, string memory claim) external {
        claimData[id] = claim;
    }

    function getClaimData(uint256 id) external view returns (string memory) {
        return claimData[id];
    }

    // function tokenURI(uint256 id) public view override returns (string memory) {
    //     return string(abi.encodePacked())
    // }
}
