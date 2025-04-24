// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {SentinelNFT} from "./sentinelNFT.sol";
import {MyServiceManager} from "./avs/MyServiceManager.sol";
import {PoolManager} from "./poolManager.sol";

contract SentinelCore {
    // errors
    error Policy_Not_Found(uint256 id);
    error Policy_Already_Active(uint256 id);
    error Not_Owner(uint256 id, address owner);
    error Policy_Already_Claimed(uint256 id);
    error Policy_Not_Active(uint256 id);
    error Policy_Not_Claimed(uint256 id);
    error Policy_Already_Processed(uint256 id);

    // events
    event PolicyRegistered(
        uint256 indexed id,
        address indexed owner,
        uint256 endTime
    );
    event PolicyRenewed(
        uint256 indexed id,
        address indexed owner,
        uint256 endTime
    );
    event PolicyClaimed(
        uint256 indexed id,
        address indexed owner,
        string proof
    );
    event PolicyProcessed(
        uint256 indexed id,
        address indexed owner,
        bool success
    );
    event PayoutMade(
        address indexed to,
        address[] indexed voters,
        uint256 amount
    );

    // state variables
    uint256 public s_totalCount;
    uint256 public MAX_PREMIUM = 0.07 ether;
    uint256 public MIN_PREMIUM = 0.03 ether;

    MyServiceManager public s_avsManager;
    SentinelNFT public s_sentinelNFT;
    PoolManager public s_poolManager;

    // mappings
    mapping(uint256 => Policy) s_policies;

    // structs
    struct Policy {
        uint256 id;
        address owner;
        string description;
        uint256 amount;
        uint256 endTime;
        bool isActive;
        bool hasClaimed;
        bool hasProcessed;
    }

    // constructor
    constructor(
        address avsManagerAddr,
        address poolManagerAddr,
        address nftAddr
    ) {
        s_totalCount = 0;
        s_avsManager = MyServiceManager(avsManagerAddr);
        s_poolManager = PoolManager(poolManagerAddr);
        s_sentinelNFT = SentinelNFT(nftAddr);
    }

    // functions

    /**
     * @dev Registers a new policy.
     * NOTE: This function is called by the SentinelNFT contract when a new policy NFT is minted.
     * @param id The tokenId of the policy NFT.
     * @param owner The address of the policy owner.
     * @param description The description of the policy.
     * @param duration The duration of the policy in seconds.
     * @param amount The amount of the policy.
     */
    function registerPolicy(
        uint256 id,
        address owner,
        string memory description,
        uint256 duration,
        uint256 amount
    ) external {
        s_policies[id] = Policy(
            id,
            owner,
            description,
            amount,
            block.timestamp + duration,
            true,
            false,
            false
        );
        s_totalCount++;
        emit PolicyRegistered(id, owner, block.timestamp + duration);
    }

    /**
     * @dev Renews an existing policy.
     * @param id The tokenId of the policy NFT.
     * @param duration The duration of the policy in seconds.
     */
    function renewPolicy(uint256 id, uint256 duration) external {
        Policy storage policy = s_policies[id];
        if (policy.id >= s_totalCount) revert Policy_Not_Found(id);
        if (policy.endTime > block.timestamp) revert Policy_Already_Active(id);
        if (msg.sender != policy.owner) revert Not_Owner(id, msg.sender);
        if (policy.hasClaimed) revert Policy_Already_Claimed(id);

        policy.endTime = block.timestamp + duration;
        policy.isActive = true;
        emit PolicyRenewed(id, msg.sender, block.timestamp + duration);
    }

    /**
     * @dev Claims a policy.
     * @param id The tokenId of the policy NFT.
     * @param proof The proof of the claim.
     */
    function claim(uint256 id, string memory proof) external {
        Policy storage policy = s_policies[id];
        if (policy.id >= s_totalCount) revert Policy_Not_Found(id);
        if (msg.sender != policy.owner) revert Not_Owner(id, msg.sender);
        if (policy.endTime < block.timestamp) {
            policy.isActive = false;
            revert Policy_Not_Active(id);
        }
        if (policy.hasClaimed) revert Policy_Already_Claimed(id);

        policy.isActive = false;
        policy.hasClaimed = true;
        s_sentinelNFT.setClaimData(id, proof);

        s_avsManager.createClaim(id);
        emit PolicyClaimed(id, msg.sender, proof);
    }

    /**
     * @dev Checks the positive and negative votes for a claim and makes a payout if the claim is successful.
     * @param id The tokenId of the policy NFT.
     * NOTE: This function can only be called by the policy owner after the voting period for the claim has ended.
     */
    function processClaim(uint256 id) external returns (bool) {
        Policy storage policy = s_policies[id];
        if (policy.id >= s_totalCount) revert Policy_Not_Found(id);
        if (msg.sender != policy.owner) revert Not_Owner(id, msg.sender);
        if (!policy.isActive) revert Policy_Not_Active(id);
        if (!policy.hasClaimed) revert Policy_Not_Claimed(id);
        if (policy.hasProcessed) revert Policy_Already_Processed(id);
        policy.hasProcessed = true;

        (
            uint256 posvotes,
            uint256 negvotes,
            address[] memory voters
        ) = s_avsManager.getResult(id);
        bool success;
        if (posvotes > negvotes) {
            executePayout(policy.owner, voters, policy.amount);
            success = true;
        }

        success = false;
        emit PolicyProcessed(id, msg.sender, success);
        return success;
    }

    /**
     * @dev Executes the payout to the policy owner and the voters.
     * @param to The address of the policy owner.
     * @param voters The addresses of the voters.
     * @param amount The amount to be paid out.
     * NOTE: Internal function, should only be called after all the checks have been made.
     */
    function executePayout(
        address to,
        address[] memory voters,
        uint256 amount
    ) internal {
        uint256 totalVotersCut = (5 * amount) / 100;
        uint256 netAmount = amount - totalVotersCut;
        uint256 cutPerVoter = totalVotersCut / voters.length;
        for (uint256 i = 0; i < voters.length; i++) {
            s_poolManager.makePayout(voters[i], cutPerVoter);
        }

        s_poolManager.makePayout(to, netAmount);
        emit PayoutMade(to, voters, netAmount);
    }

    function getPremium() public view returns (uint256) {
        uint256 base = 0.5 ether; // base currently set to 5
        uint256 totalLiquidity = s_poolManager.getTotalLiquidity();
        uint256 targetLiquidity = 100 ether;

        uint256 premium = (base * targetLiquidity) / (10 * totalLiquidity); // 0.5 * (target / totalLiquidity)
        if (premium > MAX_PREMIUM) premium = MAX_PREMIUM;
        if (premium < MIN_PREMIUM) premium = MIN_PREMIUM;

        return premium;
    }
}
