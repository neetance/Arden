// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {SentinelCore} from "./sentinelCore.sol";

contract SentinelNFT is ERC721, Ownable {
    // errors
    error Invalid_Premium_Amount();

    // state variables
    uint256 public tokenId;

    mapping(uint256 tokenId => string tokenURI) descriptions;
    mapping(uint256 tokenId => string data) claimData;

    SentinelCore public core;
    address public immutable pool;

    // constructor
    constructor(
        address coreAddr,
        address poolAddr
    ) ERC721("SentinelNFT", "SNT") Ownable(msg.sender) {
        tokenId = 0;
        core = SentinelCore(coreAddr);
        pool = poolAddr;
    }

    // functions

    /**
     * @dev Mints a new NFT and registers a policy.
     * @param to The address to mint the NFT to.
     * @param description The description of the policy.
     * @param duration The duration of the policy in seconds.
     * @param amount The amount of ETH to be paid as premium.
     * NOTE: The msg.value must be equal to the premium amount set in the core contract.
     */
    function mint(
        address to,
        string memory description,
        uint256 duration,
        uint256 amount
    ) external payable {
        if (msg.value != core.getPremium()) revert Invalid_Premium_Amount();

        _safeMint(to, tokenId);
        descriptions[tokenId] = description;
        tokenId++;

        core.registerPolicy(tokenId - 1, to, description, duration, amount);
        payable(address(pool)).transfer(msg.value);
    }

    /**
     * @dev Returns the description of the policy.
     * @param id The tokenId of the policy NFT.
     */
    function getDescription(uint256 id) external view returns (string memory) {
        return descriptions[id];
    }

    /**
     * @dev Sets the claim data of the policy.
     * @param id The tokenId of the policy NFT.
     * @param claim The claim string of the policy, containing teh evidence for the claim.
     */
    function setClaimData(uint256 id, string memory claim) external {
        claimData[id] = claim;
    }

    /**
     * @dev Returns the claim data of the policy.
     * @param id The tokenId of the policy NFT.
     */
    function getClaimData(uint256 id) external view returns (string memory) {
        return claimData[id];
    }

    // function tokenURI(uint256 id) public view override returns (string memory) {
    //     return string(abi.encodePacked())
    // }
}
