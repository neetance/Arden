// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SentinelCore {
    error Policy_Not_Found(uint256 id);
    error Policy_Already_Active(uint256 id);
    error Not_Owner(uint256 id, address owner);

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

    uint256 public totalCount;

    mapping(uint256 => Policy) policies;

    struct Policy {
        uint256 id;
        address owner;
        string description;
        uint256 endTime;
        bool isActive;
    }

    constructor() {
        totalCount = 0;
    }

    function registerPolicy(
        uint256 id,
        address owner,
        string memory description,
        uint256 duration
    ) external {
        policies[id] = Policy(
            id,
            owner,
            description,
            block.timestamp + duration,
            true
        );
        totalCount++;
        emit PolicyRegistered(id, owner, block.timestamp + duration);
    }

    function renewPolicy(uint256 id, uint256 duration) external {
        Policy storage policy = policies[id];
        if (policy.id >= totalCount) revert Policy_Not_Found(id);
        if (policy.endTime > block.timestamp) revert Policy_Already_Active(id);
        if (msg.sender != policy.owner) revert Not_Owner(id, msg.sender);

        policy.endTime = block.timestamp + duration;
        policy.isActive = true;
    }
}
